import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useJourneyAudio } from '../../context/JourneyAudioContext';
import { FaMusic, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const JOURNEY_ROUTES = ['/journey/letter', '/journey/story', '/journey/game', '/journey/result'];

const JourneyMusicBar = () => {
  const location = useLocation();
  const audio = useJourneyAudio();
  const visible = JOURNEY_ROUTES.some(r => location.pathname.startsWith(r));

  if (!audio) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-black/70 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl border border-white/10"
        >
          {/* Animated music note */}
          <motion.div
            animate={audio.playing && !audio.muted ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FaMusic className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>

          <span className="text-xs font-semibold text-gray-200 max-w-[120px] truncate hidden sm:block">
            Maya — Good Friday
          </span>

          {/* Play/Pause */}
          <button
            onClick={audio.toggle}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label={audio.playing ? 'Pause' : 'Play'}
          >
            {audio.playing ? <FaPause className="w-3 h-3" /> : <FaMusic className="w-3 h-3" />}
          </button>

          {/* Mute */}
          <button
            onClick={() => audio.setMuted(m => !m)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label={audio.muted ? 'Unmute' : 'Mute'}
          >
            {audio.muted ? <FaVolumeMute className="w-3 h-3 text-red-400" /> : <FaVolumeUp className="w-3 h-3" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JourneyMusicBar;
