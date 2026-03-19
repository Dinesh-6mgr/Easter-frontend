import { motion } from 'framer-motion';

const TimerBar = ({ timeLeft, totalTime }) => {
  const pct = (timeLeft / totalTime) * 100;
  const color = pct > 50 ? 'bg-green-500' : pct > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color} transition-colors duration-500`}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default TimerBar;
