import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameArea from '../components/game/GameArea';
import ScoreDisplay from '../components/game/ScoreDisplay';
import TimerBar from '../components/game/TimerBar';
import GameOverModal from '../components/game/GameOverModal';
import GameDashboard from '../components/game/GameDashboard';
import useGameLogic from '../hooks/useGameLogic';
import Button from '../components/common/Button';
import config from '../config';
import { useLanguage } from '../context/LanguageContext';

const Game = () => {
  const [showGameOver, setShowGameOver] = useState(false);
  const {
    score, level, timeLeft, eggs, isPlaying, gameOver, gameStats,
    combo, frozen, flashType, scorePops, countdown,
    startGame, handleEggClick, resetGame,
  } = useGameLogic();
  const { t } = useLanguage();

  useEffect(() => {
    if (gameOver) setShowGameOver(true);
  }, [gameOver]);

  const handlePlayAgain = () => {
    setShowGameOver(false);
    startGame();
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-0">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">
          {t('game.title')} <span className="gradient-text">{t('game.titleHighlight')}</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          {t('game.subtitle', { min: config.MIN_SCORE_TO_SUBMIT })}
        </p>
      </motion.div>

      {/* Main layout: game on left, dashboard on right */}
      <div className="max-w-6xl mx-auto flex flex-col xl:flex-row gap-4 xl:gap-6 items-start">

        {/* ── Left: game column ── */}
        <div className="flex-1 min-w-0 w-full">
          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-6">
            <div className="col-span-2 sm:col-span-1">
              <ScoreDisplay score={score} level={level} stats={gameStats} />
            </div>

            <div className="card flex flex-col justify-between py-3 px-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('game.timeLeft')}</p>
                <p className={`text-2xl sm:text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-easter-blue'}`}>
                  {timeLeft}s
                </p>
              </div>
              <TimerBar timeLeft={timeLeft} totalTime={config.GAME_DURATION} />
            </div>

            <div className="card flex items-center justify-between py-3 px-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('game.multiplier')}</p>
                <p className="text-2xl sm:text-3xl font-bold text-easter-purple">x{level}</p>
              </div>
              <AnimatePresence mode="wait">
                {combo >= 3 ? (
                  <motion.div
                    key="combo"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-xl sm:text-2xl">🔥</span>
                    <span className="text-xs font-black text-orange-500">{combo}x</span>
                  </motion.div>
                ) : (
                  <motion.span key="bolt" className="text-3xl sm:text-4xl">⚡</motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Freeze banner */}
          <AnimatePresence>
            {frozen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="mb-3 text-center py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-bold text-xs sm:text-sm"
              >
                ❄️ FROZEN! Eggs paused for 2 seconds!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game area */}
          <GameArea
            eggs={eggs}
            onEggClick={handleEggClick}
            isPlaying={isPlaying}
            frozen={frozen}
            flashType={flashType}
            scorePops={scorePops}
            combo={combo}
            countdown={countdown}
          />

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-4 sm:mt-6">
            {!isPlaying && countdown === null ? (
              <Button size="lg" onClick={startGame}>{t('game.startGame')}</Button>
            ) : isPlaying ? (
              <Button variant="outline" size="lg" onClick={resetGame}>{t('game.reset')}</Button>
            ) : null}
          </div>

          {/* Meaning */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-5 sm:mt-8 flex gap-3 items-start bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl px-4 sm:px-5 py-3 sm:py-4"
          >
            <span className="text-xl sm:text-2xl shrink-0 mt-0.5">🥚</span>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{t('game.meaning')}</p>
          </motion.div>

          {/* Legend */}
          <div className="mt-4 sm:mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 text-center">
            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <span className="text-xl sm:text-2xl block mb-1">🥚</span>
              <p className="font-semibold text-[10px] sm:text-xs">{t('game.normalEgg')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <span className="text-xl sm:text-2xl block mb-1">🌟</span>
              <p className="font-semibold text-[10px] sm:text-xs">{t('game.goldenEgg')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <span className="text-xl sm:text-2xl block mb-1">💣</span>
              <p className="font-semibold text-[10px] sm:text-xs">{t('game.bomb')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <span className="text-xl sm:text-2xl block mb-1">🌈</span>
              <p className="font-semibold text-[10px] sm:text-xs">{t('game.rainbowEgg')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <span className="text-xl sm:text-2xl block mb-1">❄️</span>
              <p className="font-semibold text-[10px] sm:text-xs">{t('game.freeze')}</p>
            </div>
            <div className="p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <span className="text-xl sm:text-2xl block mb-1">⏰</span>
              <p className="font-semibold text-[10px] sm:text-xs">+5s Timer</p>
            </div>
          </div>
        </div>

        {/* ── Right: dashboard panel — collapsible on mobile ── */}
        <div className="w-full xl:w-64 shrink-0">
          <GameDashboard
            score={score}
            level={level}
            combo={combo}
            gameStats={gameStats}
            isPlaying={isPlaying}
            timeLeft={timeLeft}
          />
        </div>
      </div>

      <GameOverModal
        isOpen={showGameOver}
        onClose={() => setShowGameOver(false)}
        score={score}
        onPlayAgain={handlePlayAgain}
        gameStats={gameStats}
      />
    </div>
  );
};

export default Game;
