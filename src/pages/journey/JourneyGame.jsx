import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const noMessages = {
  en: [
    "Still thinking? That's okay 😄",
    "He waited three days in a tomb — He can wait for you 😅",
    "The button keeps running... just like doubts do 🏃",
    "He's patient. Infinitely patient. 🙏",
    "Even Peter denied Him three times. He still came back ❤️",
    "You can't outrun His love 💛",
  ],
  ne: [
    "अझै सोच्दै हुनुहुन्छ? ठीक छ 😄",
    "उहाँ तीन दिन चिहानमा पर्खनुभयो — उहाँ तपाईंको लागि पर्खन सक्नुहुन्छ 😅",
    "बटन भाग्दैछ... शंकाझैं 🏃",
    "उहाँ धैर्यशील हुनुहुन्छ। अनन्त धैर्यशील। 🙏",
    "पत्रुसले पनि तीन पटक अस्वीकार गरे। उहाँ फेरि फर्कनुभयो ❤️",
    "उहाँको मायाबाट भाग्न सकिँदैन 💛",
  ],
};

const gameUi = {
  en: {
    heading: 'Do you believe in hope?',
    subText: 'After everything He went through — the betrayal, the cross, the tomb —',
    subBold: ' He rose again.',
    subItalic: 'That is hope. Do you believe it?',
    yesBtn: 'Yes 🙏',
    noBtn: 'Not Yet 😅',
    attempts: (n) => `${n} attempts 😂 — the Yes button is right there!`,
  },
  ne: {
    heading: 'के तपाईं आशामा विश्वास गर्नुहुन्छ?',
    subText: 'उहाँले सबै सहनुभयो — विश्वासघात, क्रूस, चिहान —',
    subBold: ' उहाँ फेरि जीवित हुनुभयो।',
    subItalic: 'त्यही आशा हो। के तपाईं विश्वास गर्नुहुन्छ?',
    yesBtn: 'गर्छु 🙏',
    noBtn: 'गर्दिन 😅',
    attempts: (n) => `${n} पटक प्रयास 😂 — "हो" बटन त्यहीँ छ!`,
  },
};

// Radius shrinks each click so No spirals inward toward Yes
const getOrbitRadius = (attempts) => Math.max(130 - attempts * 12, 0);

// No shrinks each click, min 0.4
const getNoScale = (attempts) => Math.max(1 - attempts * 0.1, 0.4);

// Yes grows each click, max 1.65
const getYesScale = (attempts) => Math.min(1 + attempts * 0.08, 1.65);

// Pick a random angle that is at least 100° away from the last one
const nextAngle = (last) => {
  const MIN_DIFF = (100 / 180) * Math.PI;
  let a;
  do {
    a = Math.random() * 2 * Math.PI;
  } while (Math.min(Math.abs(a - last), 2 * Math.PI - Math.abs(a - last)) < MIN_DIFF);
  return a;
};

const JourneyGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang } = useLanguage();
  const t = gameUi[lang] ?? gameUi.en;
  const msgs = noMessages[lang] ?? noMessages.en;
  const [attempts, setAttempts] = useState(0);
  const [angle, setAngle] = useState(0); // start on the right

  const handleNo = useCallback(() => {
    setAttempts((a) => a + 1);
    setAngle((prev) => nextAngle(prev));
  }, []);

  const handleYes = () => {
    const params = searchParams.toString();
    navigate(`/journey/result${params ? `?${params}` : ''}`);
  };

  const msgIndex = Math.min(attempts - 1, msgs.length - 1);
  const message = attempts > 0 ? msgs[msgIndex] : null;

  const radius = getOrbitRadius(attempts);
  const noScale = getNoScale(attempts);
  const yesScale = getYesScale(attempts);
  const noX = Math.cos(angle) * radius;
  const noY = Math.sin(angle) * radius * 0.65; // slight ellipse

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-300/10 dark:bg-purple-900/10 blur-3xl" />
      </div>

      <div className="relative text-center w-full max-w-md z-10">

        {/* Cross */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-6xl sm:text-7xl mb-8 select-none"
        >
          ✝️
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight"
        >
          {t.heading}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-100 dark:border-purple-900/40 px-6 py-5 mb-8 text-left shadow-sm"
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {t.subText}
            <span className="font-semibold text-gray-800 dark:text-white">{t.subBold}</span>
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 italic">{t.subItalic}</p>
        </motion.div>

        {/* Floating message */}
        <div className="h-8 mb-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                key={attempts}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm text-amber-500 dark:text-amber-400 italic"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons arena */}
        <div className="relative flex items-center justify-center" style={{ height: 220 }}>

          {/* YES — centered, grows bigger, always on top */}
          <motion.button
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            whileHover={{ boxShadow: '0 0 40px rgba(139,92,246,0.6)' }}
            whileTap={{ scale: yesScale * 0.93 }}
            onClick={handleYes}
            style={{ position: 'relative', zIndex: 20 }}
            className="px-9 py-4 bg-gradient-to-r from-easter-purple to-easter-pink text-white font-extrabold rounded-full shadow-xl text-base sm:text-lg"
          >
            {t.yesBtn}
          </motion.button>

          {/* NO — random spot on shrinking circle, always behind Yes */}
          <motion.button
            animate={{ x: noX, y: noY, scale: noScale }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            onClick={handleNo}
            onTouchStart={handleNo}
            style={{ position: 'absolute', zIndex: 5 }}
            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold rounded-full shadow text-sm cursor-pointer select-none border border-gray-200 dark:border-gray-600 whitespace-nowrap"
          >
            {t.noBtn}
          </motion.button>
        </div>

        {/* Attempt counter */}
        <AnimatePresence>
          {attempts >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"
            >
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {t.attempts(attempts)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default JourneyGame;
