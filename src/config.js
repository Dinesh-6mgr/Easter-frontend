const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  MIN_SCORE_TO_SUBMIT: 20,
  GAME_DURATION: 30,
  MAX_EGGS_MOBILE: 5,
  MAX_EGGS_DESKTOP: 8,
  EGG_VALUES: { normal: 1, golden: 5, bomb: -5, rainbow: 10, freeze: 0, timer: 0 },
  SPAWN_RATES: { bomb: 0.33, golden: 0.12, rainbow: 0.04, freeze: 0.03, timer: 0.04 },
  // normal fills the rest
  DIFFICULTY_LEVELS: [
    { threshold: 0,  spawnRate: 1400 },
    { threshold: 10, spawnRate: 1000 },
    { threshold: 25, spawnRate: 700  },
    { threshold: 45, spawnRate: 480  },
    { threshold: 65, spawnRate: 300  },
    { threshold: 90, spawnRate: 180  },
  ]
};

export default config;
