import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Egg = ({ egg, onClick }) => {
  const eggRef = useRef();

  const getEggEmoji = (type) => {
    switch(type) {
      case 'golden':
        return '🥚✨';
      case 'bomb':
        return '💣';
      default:
        return '🥚';
    }
  };

  const getEggColor = (type) => {
    switch(type) {
      case 'golden':
        return 'text-yellow-400';
      case 'bomb':
        return 'text-red-500';
      default:
        return 'text-blue-300';
    }
  };

  return (
    <motion.div
      ref={eggRef}
      initial={{ 
        opacity: 0,
        scale: 0,
        x: egg.x,
        y: -50
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        y: egg.y,
        transition: {
          type: 'spring',
          damping: 10,
          stiffness: 100
        }
      }}
      exit={{ 
        opacity: 0,
        scale: 0,
        transition: { duration: 0.2 }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 
                   text-4xl ${getEggColor(egg.type)} egg-hover`}
      style={{ left: egg.x, top: egg.y }}
    >
      {getEggEmoji(egg.type)}
      
      {/* Glow effect for golden eggs */}
      {egg.type === 'golden' && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="absolute inset-0 rounded-full bg-yellow-400 filter blur-xl -z-10"
        />
      )}
    </motion.div>
  );
};

export default Egg;