const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  MIN_SCORE_TO_SUBMIT: 30,
  GAME_DURATION: 30,
  EGG_VALUES: { normal: 1, golden: 5, bomb: -5, rainbow: 10, freeze: 0 },
  SPAWN_RATES: { bomb: 0.33, golden: 0.12, rainbow: 0.04, freeze: 0.03 },
  // normal fills the rest
  DIFFICULTY_LEVELS: [
    { threshold: 0,  spawnRate: 850  },
    { threshold: 10, spawnRate: 650  },
    { threshold: 25, spawnRate: 480  },
    { threshold: 45, spawnRate: 320  },
    { threshold: 65, spawnRate: 200  },
    { threshold: 90, spawnRate: 130  },
  ]
};

export default config;
