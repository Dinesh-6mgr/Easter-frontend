import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'react-confetti';
import config from '../config';
import { useSound } from './useSound';

const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(config.GAME_DURATION);
  const [eggs, setEggs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStats, setGameStats] = useState({
    normalEggs: 0,
    goldenEggs: 0,
    bombs: 0
  });

  const gameLoopRef = useRef();
  const spawnRateRef = useRef(config.DIFFICULTY_LEVELS[0].spawnRate);
  const { playSound } = useSound();

  const getCurrentDifficulty = useCallback(() => {
    const difficulty = config.DIFFICULTY_LEVELS.find(
      level => score >= level.threshold
    ) || config.DIFFICULTY_LEVELS[config.DIFFICULTY_LEVELS.length - 1];
    
    setLevel(config.DIFFICULTY_LEVELS.indexOf(difficulty) + 1);
    return difficulty;
  }, [score]);

  const spawnEgg = useCallback(() => {
    if (!isPlaying) return;

    const random = Math.random();
    let type = 'normal';
    
    if (random < config.SPAWN_RATES.bomb) {
      type = 'bomb';
    } else if (random < config.SPAWN_RATES.golden + config.SPAWN_RATES.bomb) {
      type = 'golden';
    }

    const newEgg = {
      id: Date.now() + Math.random(),
      type,
      x: Math.random() * 80 + 10, // % position (10% to 90%)
      y: Math.random() * 70 + 15, // % position
      createdAt: Date.now()
    };

    setEggs(prev => [...prev, newEgg]);
  }, [isPlaying]);

  const handleEggClick = useCallback((eggId, type) => {
    if (!isPlaying) return;

    setEggs(prev => prev.filter(egg => egg.id !== eggId));

    let points = 0;
    switch(type) {
      case 'golden':
        points = config.EGG_VALUES.golden;
        playSound('golden');
        setGameStats(prev => ({ ...prev, goldenEggs: prev.goldenEggs + 1 }));
        break;
      case 'bomb':
        points = config.EGG_VALUES.bomb;
        playSound('bomb');
        setGameStats(prev => ({ ...prev, bombs: prev.bombs + 1 }));
        break;
      default:
        points = config.EGG_VALUES.normal;
        playSound('collect');
        setGameStats(prev => ({ ...prev, normalEggs: prev.normalEggs + 1 }));
    }

    setScore(prev => Math.max(0, prev + points));

    // Trigger confetti for high scores
    if (score > 50 && type === 'golden') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPlaying, playSound, score]);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(config.GAME_DURATION);
    setEggs([]);
    setGameStats({ normalEggs: 0, goldenEggs: 0, bombs: 0 });
    playSound('start');
  }, [playSound]);

  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(config.GAME_DURATION);
    setEggs([]);
    setGameStats({ normalEggs: 0, goldenEggs: 0, bombs: 0 });
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      if (timeLeft === 0) {
        setIsPlaying(false);
        playSound('gameOver');
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, playSound]);

  // Game loop effect
  useEffect(() => {
    if (!isPlaying) return;

    const difficulty = getCurrentDifficulty();
    spawnRateRef.current = difficulty.spawnRate;

    gameLoopRef.current = setInterval(() => {
      spawnEgg();
    }, spawnRateRef.current);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, getCurrentDifficulty, spawnEgg]);

  // Clean up eggs that are too old (prevent accumulation)
  useEffect(() => {
    if (!isPlaying) return;

    const cleanup = setInterval(() => {
      const now = Date.now();
      setEggs(prev => prev.filter(egg => now - egg.createdAt < 5000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, [isPlaying]);

  return {
    score,
    level,
    timeLeft,
    eggs,
    isPlaying,
    gameStats,
    startGame,
    handleEggClick,
    resetGame
  };
};

export default useGameLogic;