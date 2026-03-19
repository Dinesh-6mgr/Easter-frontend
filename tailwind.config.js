module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        easter: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          yellow: '#FBBF24',
          blue: '#3B82F6',
          green: '#10B981'
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    }
  },
  plugins: []
};
