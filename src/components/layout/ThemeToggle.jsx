import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-yellow-300'
      }`}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? <FaMoon className="w-3 h-3 text-gray-700" /> : <FaSun className="w-3 h-3 text-yellow-500" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
