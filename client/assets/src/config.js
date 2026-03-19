const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  MIN_SCORE_TO_SUBMIT: 50,
  GAME_DURATION: 30, // seconds
  EGG_VALUES: {
    normal: 1,
    golden: 5,
    bomb: -3
  },
  SPAWN_RATES: {
    normal: 0.6,
    golden: 0.2,
    bomb: 0.2
  },
  DIFFICULTY_LEVELS: [
    { threshold: 0, spawnRate: 1000, speed: 1 }, // level 1: 1 second
    { threshold: 20, spawnRate: 800, speed: 1.2 }, // level 2: 0.8 seconds
    { threshold: 40, spawnRate: 600, speed: 1.5 }, // level 3: 0.6 seconds
    { threshold: 60, spawnRate: 400, speed: 2 }, // level 4: 0.4 seconds
    { threshold: 80, spawnRate: 300, speed: 2.5 }, // level 5: 0.3 seconds
  ]
};

export default config;