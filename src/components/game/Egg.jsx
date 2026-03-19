import { motion } from 'framer-motion';

const STYLES = {
  golden:  { emoji: '🥚', label: 'Golden Egg', size: '2.2rem'  },
  bomb:    { emoji: '💣', label: 'Bomb',        size: '2rem'   },
  normal:  { emoji: '🥚', label: 'Egg',         size: '1.8rem' },
  rainbow: { emoji: '🌈', label: 'Rainbow Egg', size: '2.4rem' },
  freeze:  { emoji: '❄️', label: 'Freeze',      size: '2.2rem' },
};

const lifespanAt = (level) => Math.max(2500, 4000 - (level - 1) * 350);

const Egg = ({ egg, onClick }) => {
  const { emoji, label, size } = STYLES[egg.type] || STYLES.normal;
  const lifespan = lifespanAt(egg.level ?? 1);
  const progress = Math.min((Date.now() - egg.createdAt) / lifespan, 1);

  const animStyle =
    egg.type === 'bomb'    ? 'eggShake 0.35s ease-in-out infinite alternate' :
    egg.type === 'golden'  ? 'eggPulse 1s ease-in-out infinite alternate' :
    egg.type === 'rainbow' ? 'eggBob 0.7s ease-in-out infinite alternate' :
    egg.type === 'freeze'  ? 'eggBob 1.2s ease-in-out infinite alternate' :
                             'eggBob 1.6s ease-in-out infinite alternate';

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 16, duration: 0.18 }}
      whileHover={{ scale: 1.35 }}
      whileTap={{ scale: 0.65 }}
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'absolute',
        left: `${egg.x}%`,
        top: `${egg.y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: size,
        cursor: 'pointer',
        userSelect: 'none',
        background: 'none',
        border: 'none',
        padding: 0,
        lineHeight: 1,
        animation: animStyle,
        filter: egg.type === 'freeze' ? 'drop-shadow(0 0 8px #60a5fa)' : undefined,
      }}
    >
      {emoji}

      {/* Golden glow */}
      {egg.type === 'golden' && (
        <motion.span
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.6, 0.9] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            position: 'absolute', inset: '-10px', borderRadius: '50%',
            background: 'radial-gradient(circle, #FDE68Aaa 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: -1,
          }}
        />
      )}

      {/* Rainbow spinning ring */}
      {egg.type === 'rainbow' && (
        <motion.span
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.8, repeat: Infinity } }}
          style={{
            position: 'absolute', inset: '-10px', borderRadius: '50%',
            background: 'conic-gradient(#f00, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff, #f00)',
            opacity: 0.55,
            pointerEvents: 'none', zIndex: -1,
          }}
        />
      )}

      {/* Freeze pulse */}
      {egg.type === 'freeze' && (
        <motion.span
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.5, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          style={{
            position: 'absolute', inset: '-8px', borderRadius: '50%',
            background: 'radial-gradient(circle, #93c5fdaa 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: -1,
          }}
        />
      )}

      {/* Bomb urgency ring — pulses faster as it ages */}
      {egg.type === 'bomb' && (
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
          transition={{ duration: Math.max(0.2, 0.7 - progress * 0.5), repeat: Infinity }}
          style={{
            position: 'absolute', inset: '-6px', borderRadius: '50%',
            background: 'radial-gradient(circle, #EF444466 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: -1,
          }}
        />
      )}
    </motion.button>
  );
};

export default Egg;
