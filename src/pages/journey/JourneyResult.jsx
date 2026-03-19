import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaWhatsapp, FaFacebook, FaTelegramPlane, FaTwitter, FaLink, FaTimes, FaGamepad, FaHome, FaRedo } from 'react-icons/fa';
import { getRandomVerse, parseVerse } from '../../utils/verses';
import { useLanguage } from '../../context/LanguageContext';

const resultUi = {
  en: {
    risen: 'He is Risen!',
    msg1: 'Death could not hold Him.',
    msg2: 'The tomb is empty. The stone is rolled away. The grave clothes lie folded.',
    msg3: 'He is alive — and because He lives, so do you.',
    verseLabel: '🌅 Easter Verse',
    restart: 'Restart',
    home: 'Home',
    playGame: 'Play Game',
    share: 'Share',
    shareTitle: 'Share the Journey',
    shareSubtitle: 'Personalise then pick a platform',
    fromPlaceholder: '✍️ Your name (From)',
    toPlaceholder: '💌 Friend\'s name (To)',
    fillBoth: 'Fill both names to enable sharing',
    copyBtn: 'Copy Link',
    copied: '✅ Copied!',
    shareMsg: (from, url) => `${from} wants you to walk the Easter Journey 💌\n\n${url}`,
    shareMsgShort: (from) => `${from} wants you to walk the Easter Journey 💌`,
  },
  ne: {
    risen: 'उहाँ जीवित हुनुहुन्छ!',
    msg1: 'मृत्युले उहाँलाई रोक्न सकेन।',
    msg2: 'चिहान खाली छ। ढुङ्गा गुडाइएको छ। कफन मोडिएको छ।',
    msg3: 'उहाँ जीवित हुनुहुन्छ — र उहाँ जीवित हुनुहुन्छ भने, तपाईं पनि।',
    verseLabel: '🌅 ईस्टर वचन',
    restart: 'फेरि सुरु',
    home: 'गृहपृष्ठ',
    playGame: 'खेल खेल्नुहोस्',
    share: 'साझा गर्नुहोस्',
    shareTitle: 'यात्रा साझा गर्नुहोस्',
    shareSubtitle: 'नाम भर्नुहोस् र प्लेटफर्म छान्नुहोस्',
    fromPlaceholder: '✍️ तपाईंको नाम (पठाउने)',
    toPlaceholder: '💌 साथीको नाम (पाउने)',
    fillBoth: 'साझा गर्न दुवै नाम भर्नुहोस्',
    copyBtn: 'लिंक कपी गर्नुहोस्',
    copied: '✅ कपी भयो!',
    shareMsg: (from, url) => `${from} ले तपाईंलाई ईस्टर यात्रामा हिँड्न आमन्त्रण गर्नुहुन्छ 💌\n\n${url}`,
    shareMsgShort: (from) => `${from} ले तपाईंलाई ईस्टर यात्रामा हिँड्न आमन्त्रण गर्नुहुन्छ 💌`,
  },
};

const floaters = ['✝️', '🌅', '🕊️', '❤️', '✨', '🌸', '💛', '🙏'];

const platforms = [
  { name: 'WhatsApp',    icon: <FaWhatsapp className="w-4 h-4" />,      color: 'bg-green-500 hover:bg-green-600',
    build: (u, from, rt) => `https://wa.me/?text=${encodeURIComponent(rt.shareMsg(from, u))}` },
  { name: 'Facebook',    icon: <FaFacebook className="w-4 h-4" />,      color: 'bg-blue-600 hover:bg-blue-700',
    build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: 'Telegram',    icon: <FaTelegramPlane className="w-4 h-4" />, color: 'bg-sky-500 hover:bg-sky-600',
    build: (u, from, rt) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(rt.shareMsgShort(from))}` },
  { name: 'Twitter / X', icon: <FaTwitter className="w-4 h-4" />,       color: 'bg-gray-900 hover:bg-black',
    build: (u, from, rt) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(rt.shareMsgShort(from))}&url=${encodeURIComponent(u)}` },
];

const ShareModal = ({ onClose, rt }) => {
  const [sFrom, setSFrom] = useState('');
  const [sTo,   setSTo]   = useState('');
  const [copied, setCopied] = useState(false);
  const isValid = sFrom.trim() && sTo.trim();

  const buildUrl = () => {
    const p = new URLSearchParams({ from: sFrom.trim(), to: sTo.trim() });
    return `${window.location.origin}/journey/letter?${p.toString()}`;
  };

  const handleCopy = () => {
    if (!isValid) return;
    navigator.clipboard.writeText(buildUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-sm bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border-t border-yellow-200 dark:border-yellow-800/40 sm:border px-6 pt-6 pb-8"
      >
        <div className="sm:hidden w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-5" />
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Close">
          <FaTimes className="w-3.5 h-3.5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🌅</span>
          </div>
          <h2 className="text-base font-extrabold text-gray-800 dark:text-white">{rt.shareTitle}</h2>
          <p className="text-xs text-orange-500 mt-0.5">{rt.shareSubtitle}</p>
        </div>

        {/* Name fields */}
        <div className="space-y-3 mb-4">
          <input
            type="text" value={sFrom} onChange={(e) => setSFrom(e.target.value)}
            placeholder={rt.fromPlaceholder} maxLength={40}
            className="w-full px-4 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
          <input
            type="text" value={sTo} onChange={(e) => setSTo(e.target.value)}
            placeholder={rt.toPlaceholder} maxLength={40}
            className="w-full px-4 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          {platforms.map((p) => (
            <button
              key={p.name}
              onClick={() => isValid && window.open(p.build(buildUrl(), sFrom.trim(), rt), '_blank', 'noopener')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all ${p.color} ${!isValid ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all mt-1 ${
            isValid
              ? 'border-orange-400 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20'
              : 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed opacity-40'
          }`}
        >
          <FaLink className="w-3.5 h-3.5" />
          {copied ? rt.copied : rt.copyBtn}
        </button>

        {!isValid && (
          <p className="text-center text-xs text-gray-400 mt-3">{rt.fillBoth}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

const JourneyResult = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const rt = resultUi[lang] ?? resultUi.en;
  const verse = getRandomVerse('easter', lang);
  const { text, reference } = parseVerse(verse);
  const fired = useRef(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const colors = ['#8B5CF6', '#EC4899', '#FBBF24', '#10B981', '#F97316'];
    const shoot = (opts) => confetti({ spread: 90, ticks: 80, colors, ...opts });
    shoot({ particleCount: 140, origin: { y: 0.5 } });
    setTimeout(() => shoot({ particleCount: 80, origin: { x: 0.15, y: 0.6 } }), 350);
    setTimeout(() => shoot({ particleCount: 80, origin: { x: 0.85, y: 0.6 } }), 650);
    setTimeout(() => shoot({ particleCount: 60, origin: { y: 0.3 } }), 1000);
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 blur-3xl"
          />
        </div>

        <div className="relative w-full max-w-lg z-10 text-center">
          {/* He is Risen */}
          <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.1 }} className="mb-3"
          >
            <motion.h1
              animate={{ textShadow: ['0 0 16px #FBBF24, 0 0 48px #F97316','0 0 28px #EC4899, 0 0 64px #8B5CF6','0 0 16px #FBBF24, 0 0 48px #F97316'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent leading-tight"
            >
              {rt.risen}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-3xl mt-2">
              🌅
            </motion.p>
          </motion.div>

          {/* Floating emojis */}
          <div className="flex justify-center flex-wrap gap-2 my-6">
            {floaters.map((e, i) => (
              <motion.span key={i} animate={{ y: [0, -14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }} className="text-xl sm:text-2xl">
                {e}
              </motion.span>
            ))}
          </div>

          {/* Message */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-yellow-200/60 dark:border-yellow-700/30 px-6 sm:px-8 py-6 mb-4 shadow-xl text-left"
          >
            <p className="text-gray-800 dark:text-white text-base sm:text-lg font-bold mb-2">{rt.msg1}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{rt.msg2}</p>
            <p className="font-semibold text-orange-500 text-sm sm:text-base mt-2">{rt.msg3}</p>
          </motion.div>

          {/* Verse */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200/60 dark:border-amber-700/40 px-6 sm:px-8 py-5 mb-8 text-left shadow-lg"
          >
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">{rt.verseLabel}</p>
            <p className="italic text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-3">&ldquo;{text}&rdquo;</p>
            {reference && <p className="text-right text-xs sm:text-sm font-bold text-easter-purple dark:text-easter-pink">— {reference}</p>}
          </motion.div>

          {/* 2×2 action grid */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/journey/letter')}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-easter-purple to-easter-pink text-white font-bold text-sm shadow-lg"
            >
              <FaRedo className="w-3.5 h-3.5" /> {rt.restart}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FaHome className="w-3.5 h-3.5" /> {rt.home}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/game')}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg"
            >
              <FaGamepad className="w-3.5 h-3.5" /> {rt.playGame}
            </motion.button>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setShowShare(true)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold text-sm shadow-lg"
            >
              💌 {rt.share}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showShare && <ShareModal onClose={() => setShowShare(false)} rt={rt} />}
      </AnimatePresence>
    </>
  );
};

export default JourneyResult;
