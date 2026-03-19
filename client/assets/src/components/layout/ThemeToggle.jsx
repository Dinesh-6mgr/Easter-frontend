import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-yellow-300'
      }`}
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <FaMoon className="w-4 h-4 text-gray-800" />
        ) : (
          <FaSun className="w-4 h-4 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;