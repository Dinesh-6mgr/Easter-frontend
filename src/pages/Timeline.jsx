import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import VerseCard from '../components/common/VerseCard';

const eventIcons = ['🌿', '🍞', '✝️', '🪨', '🌅'];
const eventVerseCategory = ['palmSunday', 'general', 'goodFriday', 'general', 'easter'];

const Timeline = () => {
  const { t } = useLanguage();
  const events = t('timeline.events');

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          {t('timeline.title')} <span className="gradient-text">{t('timeline.titleHighlight')}</span>
        </h1>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('timeline.subtitle')}
        </p>
      </motion.div>

      {/* Mobile: stacked cards. Desktop: alternating timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center line — hidden on mobile */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-easter-purple via-easter-pink to-easter-yellow rounded-full" />

        {Array.isArray(events) && events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`relative flex items-center mb-8 sm:mb-16
              sm:${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            {/* Dot — desktop only */}
            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-easter-purple to-easter-pink z-10 shadow-lg" />

            {/* Card */}
            <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? 'sm:pr-10' : 'sm:pl-10'}`}>
              <motion.div whileHover={{ scale: 1.02 }} className="card">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl">{eventIcons[index]}</span>
                  <h3 className="text-lg sm:text-xl font-bold">{event.day}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-2">{event.date}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{event.description}</p>
                <p className="text-xs italic text-easter-purple dark:text-easter-pink mb-3">{event.verse}</p>
                <VerseCard category={eventVerseCategory[index]} className="mt-2" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Easter Sunday banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-10 sm:mt-16 max-w-3xl mx-auto"
      >
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="text-5xl sm:text-6xl mb-3 sm:mb-4"
          >
            🌅
          </motion.div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('timeline.risen')}</h2>
          <p className="text-sm sm:text-lg opacity-90 max-w-xl mx-auto">{t('timeline.verse')}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;
