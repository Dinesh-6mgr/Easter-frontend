import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LanguagePicker = () => {
  const { hasChosen, setLang } = useLanguage();

  return (
    <AnimatePresence>
      {!hasChosen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-easter-purple/90 to-easter-pink/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl text-center max-w-sm w-full mx-4"
          >
            <div className="text-5xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Choose Your Language
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              भाषा छान्नुहोस् / Select a language
            </p>

            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLang('en')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-easter-purple to-easter-pink text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                🇬🇧 English
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLang('ne')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                🇳🇵 नेपाली
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguagePicker;
