import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import VerseCard from '../components/common/VerseCard';

const dayColors = [
  'from-green-400 to-emerald-500',
  'from-blue-400 to-cyan-500',
  'from-indigo-400 to-blue-500',
  'from-gray-400 to-slate-500',
  'from-amber-400 to-orange-500',
  'from-red-500 to-rose-600',
  'from-slate-500 to-gray-700',
  'from-yellow-400 to-amber-500',
];

const Timeline = () => {
  const { t } = useLanguage();
  const events = t('timeline.events');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-5xl mb-4"
        >
          ✝️
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {t('timeline.title')}{' '}
          <span className="gradient-text">{t('timeline.titleHighlight')}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          {t('timeline.subtitle')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-red-500 to-yellow-400 opacity-30" />

        <div className="space-y-8">
          {Array.isArray(events) && events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative flex gap-5 sm:gap-7"
            >
              {/* Circle on line */}
              <div className="relative shrink-0 flex flex-col items-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${dayColors[i] ?? 'from-purple-400 to-pink-500'} flex items-center justify-center shadow-lg text-xl sm:text-2xl z-10`}>
                  {event.day.match(/^\p{Emoji}/u)?.[0] ?? '📅'}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 pb-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow">
                  {/* Day label + date badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg leading-tight">
                      {event.day}
                    </h3>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${dayColors[i] ?? 'from-purple-400 to-pink-500'}`}>
                      {event.date}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {event.description}
                  </p>

                  {/* Verse */}
                  <p className="text-xs italic text-amber-600 dark:text-amber-400 border-l-2 border-amber-400 pl-3">
                    {event.verse}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risen banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-14 text-center"
      >
        <div className="inline-block px-8 py-5 rounded-3xl bg-gradient-to-r from-yellow-400 to-amber-500 shadow-xl">
          <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            {t('timeline.risen')}
          </p>
          <p className="text-white/90 text-sm italic">{t('timeline.verse')}</p>
        </div>
      </motion.div>

      <div className="mt-10">
        <VerseCard />
      </div>
    </motion.div>
  );
};

export default Timeline;
