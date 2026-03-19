import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Egg from './Egg';

const GameArea = ({ eggs, onEggClick, isPlaying }) => {
  return (
    <div className="relative bg-gradient-to-b from-blue-200 to-green-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 min-h-[500px] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🌿</div>
        <div className="absolute bottom-10 right-10 text-6xl">🌸</div>
        <div className="absolute top-20 right-20 text-6xl">🐰</div>
      </div>

      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10 rounded-3xl"
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Play?</h3>
            <p className="text-xl">Click Start Game to begin the egg hunt!</p>
          </div>
        </motion.div>
      )}

      {/* Eggs container */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {eggs.map((egg) => (
            <Egg
              key={egg.id}
              egg={egg}
              onClick={() => onEggClick(egg.id, egg.type)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Grass effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-500 to-transparent opacity-30" />
    </div>
  );
};

export default GameArea;