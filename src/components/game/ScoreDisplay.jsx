import { motion } from 'framer-motion';

const ScoreDisplay = ({ score, level, stats }) => (
  <div className="card flex items-center justify-between py-3 px-4">
    <div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Score</p>
      <motion.p
        key={score}
        initial={{ scale: 1.3, color: '#8B5CF6' }}
        animate={{ scale: 1, color: '#1f2937' }}
        className="text-2xl sm:text-3xl font-bold dark:text-white"
      >
        {score}
      </motion.p>
      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
        🥚 {stats.normalEggs} &nbsp;🌟 {stats.goldenEggs} &nbsp;💣 {stats.bombs}
      </p>
    </div>
    <div className="text-right">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Level</p>
      <p className="text-2xl sm:text-3xl font-bold text-easter-purple">{level}</p>
    </div>
  </div>
);

export default ScoreDisplay;
