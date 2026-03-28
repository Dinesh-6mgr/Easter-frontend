import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useJourneyAudio } from '../../context/JourneyAudioContext';
import { FaMusic, FaPause, FaPlay } from 'react-icons/fa';

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="fixed top-20 right-4 z-50"
        >
          <motion.button
            onClick={audio.toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label={audio.playing ? 'Pause music' : 'Play music'}
            className="flex items-center gap-2 bg-black/65 backdrop-blur-md text-white pl-3 pr-4 py-2 rounded-full shadow-xl border border-white/10"
          >
            {/* Pulsing note when playing */}
            <motion.span
              animate={audio.playing ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <FaMusic className="w-3 h-3 text-amber-400" />
            </motion.span>

            <span className="text-xs font-semibold text-gray-200 hidden sm:block max-w-[100px] truncate">
              Maya
            </span>

            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/15">
              {audio.playing
                ? <FaPause className="w-2.5 h-2.5" />
                : <FaPlay  className="w-2.5 h-2.5 ml-0.5" />}
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JourneyMusicBar;
