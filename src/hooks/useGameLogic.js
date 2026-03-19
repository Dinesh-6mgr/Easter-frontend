import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import config from '../config';
import { useSound } from './useSound';

const REFILL_COUNT = 5;
const BOUNDS = { minX: 5, maxX: 92, minY: 5, maxY: 88 };
const SPEED_BY_LEVEL = [0.26, 0.38, 0.52, 0.68, 0.86, 1.08];
const BASE_SPEED = 0.26;
const COMBO_WINDOW = 1200; // ms between clicks to keep combo alive

const randBetween = (a, b) => a + Math.random() * (b - a);

// ── Spawn patterns ────────────────────────────────────────────────────────────
// 1. random: anywhere in bounds (original)
// 2. fromEdge: spawns on a random edge, moves inward
// 3. dropTop: spawns at top, falls downward
// 4. burst: spawns near center, flies outward
// 5. zigzag: spawns on left/right edge with steep angle

const PATTERNS = ['random', 'fromEdge', 'dropTop', 'burst', 'zigzag'];

const makeEggWithPattern = (level = 1, pattern = 'random') => {
  const rand = Math.random();
  const { bomb, golden, rainbow, freeze } = config.SPAWN_RATES;
  let type = 'normal';
  if      (rand < bomb)                             type = 'bomb';
  else if (rand < bomb + golden)                    type = 'golden';
  else if (rand < bomb + golden + rainbow)          type = 'rainbow';
  else if (rand < bomb + golden + rainbow + freeze) type = 'freeze';

  const speed = SPEED_BY_LEVEL[Math.min(level - 1, SPEED_BY_LEVEL.length - 1)] || BASE_SPEED;

  let x, y, vx, vy;

  switch (pattern) {
    case 'fromEdge': {
      const edge = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
      if (edge === 0)      { x = randBetween(10, 90); y = BOUNDS.minY; vx = randBetween(-speed, speed); vy = speed; }
      else if (edge === 1) { x = BOUNDS.maxX; y = randBetween(10, 85); vx = -speed; vy = randBetween(-speed, speed); }
      else if (edge === 2) { x = randBetween(10, 90); y = BOUNDS.maxY; vx = randBetween(-speed, speed); vy = -speed; }
      else                 { x = BOUNDS.minX; y = randBetween(10, 85); vx = speed; vy = randBetween(-speed, speed); }
      break;
    }
    case 'dropTop': {
      x = randBetween(BOUNDS.minX, BOUNDS.maxX);
      y = BOUNDS.minY;
      vx = randBetween(-speed * 0.4, speed * 0.4);
      vy = speed * 1.2;
      break;
    }
    case 'burst': {
      x = randBetween(35, 65);
      y = randBetween(35, 65);
      const angle = Math.random() * Math.PI * 2;
      vx = Math.cos(angle) * speed * 1.3;
      vy = Math.sin(angle) * speed * 1.3;
      break;
    }
    case 'zigzag': {
      const fromLeft = Math.random() < 0.5;
      x = fromLeft ? BOUNDS.minX : BOUNDS.maxX;
      y = randBetween(BOUNDS.minY, BOUNDS.maxY);
      vx = fromLeft ? speed : -speed;
      vy = (Math.random() < 0.5 ? 1 : -1) * speed * 0.8;
      break;
    }
    default: {
      const angle = Math.random() * Math.PI * 2;
      x = randBetween(BOUNDS.minX, BOUNDS.maxX);
      y = randBetween(BOUNDS.minY, BOUNDS.maxY);
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed;
    }
  }

  return {
    id: Date.now() + Math.random(),
    type, level, x, y, vx, vy,
    createdAt: Date.now(),
  };
};

const makeEgg = (level = 1) => {
  const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
  return makeEggWithPattern(level, pattern);
};

const makeBatch = (count, level) => Array.from({ length: count }, () => makeEgg(level));

const useGameLogic = () => {
  const [score, setScore]         = useState(0);
  const [level, setLevel]         = useState(1);
  const [timeLeft, setTimeLeft]   = useState(config.GAME_DURATION);
  const [eggs, setEggs]           = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver]   = useState(false);
  const [gameStats, setGameStats] = useState({ normalEggs: 0, goldenEggs: 0, bombs: 0, rainbows: 0 });
  const [combo, setCombo]         = useState(0);
  const [frozen, setFrozen]       = useState(false);
  const [flashType, setFlashType] = useState(null); // 'good' | 'bad'
  const [scorePops, setScorePops] = useState([]); // [{id, x, y, value}]

  const scoreRef     = useRef(0);
  const levelRef     = useRef(1);
  const isPlayingRef = useRef(false);
  const frozenRef    = useRef(false);
  const rafRef       = useRef(null);
  const spawnRef     = useRef(null);
  const comboRef     = useRef(0);
  const lastClickRef = useRef(0);
  const { playSound } = useSound();

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { levelRef.current = level; }, [level]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { frozenRef.current = frozen; }, [frozen]);
  useEffect(() => { comboRef.current = combo; }, [combo]);

  const getCurrentLevel = useCallback((s) => {
    const levels = config.DIFFICULTY_LEVELS;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (s >= levels[i].threshold) return i + 1;
    }
    return 1;
  }, []);

  const getSpawnRate = useCallback((s) => {
    const levels = config.DIFFICULTY_LEVELS;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (s >= levels[i].threshold) return levels[i].spawnRate;
    }
    return levels[0].spawnRate;
  }, []);

  const addScorePop = useCallback((x, y, value) => {
    const id = Date.now() + Math.random();
    setScorePops((prev) => [...prev, { id, x, y, value }]);
    setTimeout(() => setScorePops((prev) => prev.filter((p) => p.id !== id)), 900);
  }, []);

  const triggerFlash = useCallback((type) => {
    setFlashType(type);
    setTimeout(() => setFlashType(null), 350);
  }, []);

  // ── rAF movement loop ──────────────────────────────────────────────────────
  const startMovementLoop = useCallback(() => {
    const tick = () => {
      if (!isPlayingRef.current) return;
      if (!frozenRef.current) {
        setEggs((prev) => {
          if (prev.length === 0) return prev;
          return prev.map((egg) => {
            let { x, y, vx, vy } = egg;
            x += vx; y += vy;
            if (x <= BOUNDS.minX) { x = BOUNDS.minX; vx = Math.abs(vx); }
            if (x >= BOUNDS.maxX) { x = BOUNDS.maxX; vx = -Math.abs(vx); }
            if (y <= BOUNDS.minY) { y = BOUNDS.minY; vy = Math.abs(vy); }
            if (y >= BOUNDS.maxY) { y = BOUNDS.maxY; vy = -Math.abs(vy); }
            return { ...egg, x, y, vx, vy };
          });
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopMovementLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Spawn helpers ──────────────────────────────────────────────────────────
  const spawnOne = useCallback(() => {
    setEggs((prev) => [...prev, makeEgg(levelRef.current)]);
  }, []);

  const spawnBatch = useCallback((count = REFILL_COUNT) => {
    setEggs((prev) => [...prev, ...makeBatch(count, levelRef.current)]);
  }, []);

  const startSpawnLoop = useCallback((rate) => {
    if (spawnRef.current) clearInterval(spawnRef.current);
    spawnRef.current = setInterval(spawnOne, rate);
  }, [spawnOne]);

  // ── Click handler ──────────────────────────────────────────────────────────
  const handleEggClick = useCallback((eggId, type, eggX, eggY) => {
    setEggs((prev) => {
      const next = prev.filter((e) => e.id !== eggId);
      if (next.length === 0 && isPlayingRef.current) {
        setTimeout(() => spawnBatch(REFILL_COUNT), 80);
      }
      return next;
    });

    const now = Date.now();
    let points = config.EGG_VALUES[type] ?? 1;

    // Combo logic (only for positive eggs)
    if (type !== 'bomb' && type !== 'freeze') {
      const timeSinceLast = now - lastClickRef.current;
      if (timeSinceLast < COMBO_WINDOW) {
        const newCombo = comboRef.current + 1;
        setCombo(newCombo);
        if (newCombo >= 3) {
          const bonus = Math.floor(newCombo / 3);
          points += bonus;
        }
      } else {
        setCombo(1);
      }
      lastClickRef.current = now;
    } else if (type === 'bomb') {
      setCombo(0); // reset combo on bomb
      lastClickRef.current = 0;
    }

    if (type === 'golden') {
      playSound('golden');
      triggerFlash('good');
      setGameStats((s) => ({ ...s, goldenEggs: s.goldenEggs + 1 }));
      if (scoreRef.current >= 30) confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } else if (type === 'rainbow') {
      playSound('golden');
      triggerFlash('good');
      setGameStats((s) => ({ ...s, rainbows: (s.rainbows || 0) + 1 }));
      confetti({ particleCount: 120, spread: 80, colors: ['#f00','#ff7700','#ffff00','#00ff00','#0000ff','#8b00ff'], origin: { y: 0.6 } });
    } else if (type === 'freeze') {
      playSound('collect');
      setFrozen(true);
      setTimeout(() => setFrozen(false), 2200);
    } else if (type === 'bomb') {
      playSound('bomb');
      triggerFlash('bad');
      setGameStats((s) => ({ ...s, bombs: s.bombs + 1 }));
    } else {
      playSound('collect');
      setGameStats((s) => ({ ...s, normalEggs: s.normalEggs + 1 }));
    }

    if (type !== 'freeze') {
      addScorePop(eggX, eggY, points);
      setScore((prev) => {
        const next = Math.max(0, prev + points);
        setLevel(getCurrentLevel(next));
        return next;
      });
    }
  }, [playSound, getCurrentLevel, spawnBatch, addScorePop, triggerFlash]);

  // ── Game controls ──────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    if (spawnRef.current) clearInterval(spawnRef.current);
    stopMovementLoop();
    setScore(0); setLevel(1); setTimeLeft(config.GAME_DURATION);
    setGameStats({ normalEggs: 0, goldenEggs: 0, bombs: 0, rainbows: 0 });
    setGameOver(false); setIsPlaying(true); setCombo(0); setFrozen(false);
    setScorePops([]);
    playSound('start');
    setEggs(makeBatch(REFILL_COUNT + 2, 1));
    startMovementLoop();
    startSpawnLoop(config.DIFFICULTY_LEVELS[0].spawnRate);
  }, [playSound, startMovementLoop, stopMovementLoop, startSpawnLoop]);

  const resetGame = useCallback(() => {
    if (spawnRef.current) clearInterval(spawnRef.current);
    stopMovementLoop();
    setIsPlaying(false); setGameOver(false); setScore(0); setLevel(1);
    setTimeLeft(config.GAME_DURATION); setEggs([]);
    setGameStats({ normalEggs: 0, goldenEggs: 0, bombs: 0, rainbows: 0 });
    setCombo(0); setFrozen(false); setScorePops([]);
  }, [stopMovementLoop]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false); setGameOver(true);
      stopMovementLoop();
      if (spawnRef.current) clearInterval(spawnRef.current);
      playSound('gameOver');
      if (scoreRef.current >= 50) confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, playSound, stopMovementLoop]);

  // ── Restart spawn loop on difficulty change ────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    startSpawnLoop(getSpawnRate(score));
    return () => { if (spawnRef.current) clearInterval(spawnRef.current); };
  }, [isPlaying, score, getSpawnRate, startSpawnLoop]);

  // ── Stale egg cleanup ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    const cleanup = setInterval(() => {
      const now = Date.now();
      setEggs((prev) => {
        const lifespan = Math.max(2500, 4000 - (levelRef.current - 1) * 350);
        const next = prev.filter((e) => now - e.createdAt < lifespan);
        if (next.length === 0 && isPlayingRef.current) {
          setTimeout(() => spawnBatch(REFILL_COUNT), 80);
        }
        return next;
      });
    }, 800);
    return () => clearInterval(cleanup);
  }, [isPlaying, spawnBatch]);

  // ── Combo timeout reset ────────────────────────────────────────────────────
  useEffect(() => {
    if (combo === 0) return;
    const t = setTimeout(() => setCombo(0), COMBO_WINDOW + 200);
    return () => clearTimeout(t);
  }, [combo]);

  useEffect(() => () => {
    stopMovementLoop();
    if (spawnRef.current) clearInterval(spawnRef.current);
  }, [stopMovementLoop]);

  return {
    score, level, timeLeft, eggs, isPlaying, gameOver, gameStats,
    combo, frozen, flashType, scorePops,
    startGame, handleEggClick, resetGame,
  };
};

export default useGameLogic;
