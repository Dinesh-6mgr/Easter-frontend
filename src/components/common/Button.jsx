import { motion } from 'framer-motion';

const variants = {
  primary:   'bg-gradient-to-r from-easter-purple to-easter-pink text-white hover:shadow-lg focus:ring-easter-purple',
  secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500',
  outline:   'border-2 border-easter-purple text-easter-purple dark:text-easter-pink hover:bg-easter-purple hover:text-white focus:ring-easter-purple',
  ghost:     'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500'
};

const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, type = 'button', className = '', ...props }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.03 } : {}}
    whileTap={!disabled ? { scale: 0.97 } : {}}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;
