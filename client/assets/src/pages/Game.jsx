import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GameArea from '../components/game/GameArea';
import ScoreDisplay from '../components/game/ScoreDisplay';
import TimerBar from '../components/game/TimerBar';
import GameOverModal from '../components/game/GameOverModal';
import useGameLogic from '../hooks/useGameLogic';
import Button from '../components/common/Button';

const Game = () => {
  const [showGameOver, setShowGameOver] = useState(false);
  const {
    score,
    level,
    timeLeft,
    eggs,
    isPlaying,
    gameStats,
    startGame,
    handleEggClick,
    resetGame
  } = useGameLogic();

  const handleGameOver = () => {
    setShowGameOver(true);
  };

  const handlePlayAgain = () => {
    setShowGameOver(false);
    resetGame();
    startGame();
  };

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Easter <span className="gradient-text">Egg Hunt</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Collect eggs, avoid bombs, and set a new record!
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ScoreDisplay 
            score={score} 
            level={level}
            stats={gameStats}
          />
          
          <div className="card flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Left</p>
              <p className="text-3xl font-bold text-easter-blue">{timeLeft}s</p>
            </div>
            <TimerBar timeLeft={timeLeft} totalTime={30} />
          </div>

          <div className="card flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Multiplier</p>
              <p className="text-3xl font-bold text-easter-purple">x{level}</p>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </div>

        {/* Game Area */}
        <GameArea
          eggs={eggs}
          onEggClick={handleEggClick}
          isPlaying={isPlaying}
        />

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          {!isPlaying ? (
            <Button size="lg" onClick={startGame}>
              Start Game 🎮
            </Button>
          ) : (
            <Button variant="outline" size="lg" onClick={resetGame}>
              Reset Game 🔄
            </Button>
          )}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
            <span className="text-2xl mb-2 block">🥚</span>
            <p className="font-semibold">Normal Egg: +1</p>
          </div>
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <span className="text-2xl mb-2 block">🥚✨</span>
            <p className="font-semibold">Golden Egg: +5</p>
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            <span className="text-2xl mb-2 block">💣</span>
            <p className="font-semibold">Bomb: -3</p>
          </div>
        </motion.div>
      </div>

      {/* Game Over Modal */}
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