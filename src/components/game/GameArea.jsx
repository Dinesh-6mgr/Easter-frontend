import { AnimatePresence, motion } from 'framer-motion';
import Egg from './Egg';

// Floating score pop that flies upward and fades
const ScorePop = ({ pop }) => {
  const isString = typeof pop.value === 'string';
  const isPositive = isString || pop.value > 0;
  const color = isString ? '#3b82f6' : isPositive ? '#10b981' : '#ef4444';
  const label = isString ? pop.value : isPositive ? `+${pop.value}` : `${pop.value}`;
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -60, scale: 1.3 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: `${pop.x}%`,
        top: `${pop.y}%`,
        transform: 'translate(-50%, -50%)',
        color,
        fontWeight: 900,
        fontSize: isString ? '1.3rem' : Math.abs(pop.value) >= 5 ? '1.5rem' : '1.1rem',
        pointerEvents: 'none',
        zIndex: 20,
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
        userSelect: 'none',
      }}
    >
      {label}
    </motion.div>
  );
};

const GameArea = ({ eggs, onEggClick, isPlaying, frozen, flashType, scorePops = [], combo, countdown }) => (
  <div className="relative bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl min-h-[260px] sm:min-h-[420px] md:min-h-[480px] overflow-hidden select-none shadow-2xl">

    {/* Screen flash overlay */}
    <AnimatePresence>
      {flashType && (
        <motion.div
          key={flashType + Date.now()}
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
          style={{ background: flashType === 'good' ? '#10b981' : '#ef4444' }}
        />
      )}
    </AnimatePresence>

    {/* Freeze overlay */}
    <AnimatePresence>
      {frozen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 pointer-events-none rounded-3xl flex items-center justify-center"
          style={{ background: 'rgba(147,197,253,0.18)', backdropFilter: 'blur(1px)' }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="text-5xl select-none"
          >
            ❄️
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Animated clouds */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div animate={{ x: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 left-8 text-4xl opacity-30 dark:opacity-10">☁️</motion.div>
      <motion.div animate={{ x: [0, -25, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-8 right-16 text-3xl opacity-25 dark:opacity-10">☁️</motion.div>
      <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-2 left-1/2 text-2xl opacity-20 dark:opacity-10">☁️</motion.div>
    </div>

    {/* Decorative background items */}
    <div className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-5 text-5xl">
      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        className="absolute top-6 left-8">🌿</motion.span>
      <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-10 right-8">🌸</motion.span>
      <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-16 right-16">🐰</motion.span>
      <motion.span animate={{ y: [0, -7, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-16 left-16">🌷</motion.span>
      <motion.span animate={{ y: [0, -6, 0], x: [0, 4, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
        className="absolute top-1/2 left-4">🦋</motion.span>
    </div>

    {/* Grass */}
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-green-500 to-transparent opacity-30 dark:opacity-20 pointer-events-none" />

    {/* Combo badge */}
    <AnimatePresence>
      {combo >= 3 && (
        <motion.div
          key={combo}
          initial={{ scale: 0.5, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full font-black text-white text-sm shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', boxShadow: '0 0 20px rgba(245,158,11,0.6)' }}
        >
          🔥 {combo}x COMBO!
        </motion.div>
      )}
    </AnimatePresence>

    {/* Overlay when not playing */}
    {!isPlaying && countdown === null && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 rounded-3xl"
      >
        <div className="text-center text-white px-4">
          <motion.p animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl sm:text-6xl mb-3 sm:mb-4">🥚</motion.p>
          <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Ready to Hunt?</h3>
          <p className="text-sm sm:text-lg opacity-80">Click Start Game to begin!</p>
          <div className="flex justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs sm:text-sm opacity-70">
            <span>🌈 Rainbow = +10</span>
            <span>❄️ Freeze = Stop time!</span>
          </div>
        </div>
      </motion.div>
    )}

    {/* Countdown overlay */}
    <AnimatePresence>
      {countdown !== null && (
        <motion.div
          key="countdown-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-30 rounded-3xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={countdown}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="text-white font-black text-8xl sm:text-9xl select-none"
              style={{ textShadow: '0 0 40px rgba(139,92,246,0.8)' }}
            >
              {countdown}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Score pops */}
    <AnimatePresence>
      {scorePops.map((pop) => (
        <ScorePop key={pop.id} pop={pop} />
      ))}
    </AnimatePresence>

    {/* Eggs */}
    <AnimatePresence>
      {eggs.map((egg) => (
        <Egg key={egg.id} egg={egg} onClick={() => onEggClick(egg.id, egg.type, egg.x, egg.y)} />
      ))}
    </AnimatePresence>
  </div>
);

export default GameArea;
