import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-easter-purple text-easter-purple dark:text-easter-pink dark:border-easter-pink text-sm font-bold hover:bg-easter-purple hover:text-white dark:hover:bg-easter-pink dark:hover:text-white transition-colors"
      title="Toggle language"
    >
      <span>{lang === 'en' ? '🇬🇧' : '🇳🇵'}</span>
      <span>{lang === 'en' ? 'EN' : 'NE'}</span>
    </motion.button>
  );
};

export default LanguageToggle;
