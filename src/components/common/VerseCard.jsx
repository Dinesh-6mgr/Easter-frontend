import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaSyncAlt } from 'react-icons/fa';
import { getRandomVerse, parseVerse } from '../../utils/verses';
import { useLanguage } from '../../context/LanguageContext';

const categoryLabels = {
  en: {
    easter:         { label: 'Easter',       emoji: '🌅' },
    goodFriday:     { label: 'Good Friday',  emoji: '✝️' },
    palmSunday:     { label: 'Palm Sunday',  emoji: '🌿' },
    general:        { label: 'Scripture',    emoji: '📖' },
    gameMotivation: { label: 'Motivation',   emoji: '⚡' },
  },
  ne: {
    easter:         { label: 'ईस्टर',         emoji: '🌅' },
    goodFriday:     { label: 'गुड फ्राइडे',   emoji: '✝️' },
    palmSunday:     { label: 'पाम संडे',       emoji: '🌿' },
    general:        { label: 'पवित्र वचन',     emoji: '📖' },
    gameMotivation: { label: 'प्रेरणा',        emoji: '⚡' },
  },
};

/**
 * VerseCard — displays a Bible verse with fade-in animation.
 * Automatically switches language when the app language changes.
 *
 * Props:
 *   verse       {string}  — fixed verse string (skips random pick)
 *   category    {string}  — verse category key
 *   showRefresh {bool}    — show "new verse" button
 *   className   {string}  — extra Tailwind classes
 */
const VerseCard = ({ verse: fixedVerse, category = 'general', showRefresh = false, className = '' }) => {
  const { lang } = useLanguage();
  const [verse, setVerse] = useState(() => fixedVerse ?? getRandomVerse(category, lang));
  const [animKey, setAnimKey] = useState(0);

  // Re-pick a verse whenever the language changes (unless a fixed verse was passed)
  useEffect(() => {
    if (fixedVerse) return;
    setVerse(getRandomVerse(category, lang));
    setAnimKey((k) => k + 1);
  }, [lang, category, fixedVerse]);

  const refresh = useCallback(() => {
    setVerse(getRandomVerse(category, lang));
    setAnimKey((k) => k + 1);
  }, [category, lang]);

  const { text, reference } = parseVerse(verse);
  const labels = categoryLabels[lang] ?? categoryLabels.en;
  const meta   = labels[category] ?? labels.general;

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="card border border-easter-purple/20 dark:border-easter-pink/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-easter-purple dark:text-easter-pink uppercase tracking-wide">
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
            </span>
            <FaQuoteLeft className="text-easter-purple/30 dark:text-easter-pink/30 w-5 h-5" />
          </div>

          {/* Verse text */}
          <p className="italic text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-3">
            &ldquo;{text}&rdquo;
          </p>

          {/* Reference */}
          {reference && (
            <p className="text-right text-sm font-semibold text-easter-purple dark:text-easter-pink">
              — {reference}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Refresh button */}
      {showRefresh && (
        <div className="flex justify-end mt-2">
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-easter-purple dark:hover:text-easter-pink transition-colors"
            aria-label="Show another verse"
          >
            <FaSyncAlt className="w-3 h-3" />
            {lang === 'ne' ? 'नयाँ वचन' : 'New verse'}
          </button>
        </div>
      )}
    </div>
  );
};

export default VerseCard;
