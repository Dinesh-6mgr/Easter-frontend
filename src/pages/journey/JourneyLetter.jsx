import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaTelegramPlane, FaTwitter, FaLink, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const LS_KEY = 'easterJourneyNames';

const resolveNames = (searchParams) => {
  const urlFrom = searchParams.get('from');
  const urlTo   = searchParams.get('to');
  if (urlFrom && urlTo) {
    localStorage.setItem(LS_KEY, JSON.stringify({ from: urlFrom, to: urlTo }));
    return { from: urlFrom, to: urlTo };
  }
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    if (saved.from && saved.to) return saved;
  } catch (_) {}
  return null; // will use lang-based defaults
};

const content = {
  en: {
    defaultFrom: 'Heavenly Father',
    defaultTo: 'You',
    label: 'Easter Letter',
    buildText: (from, to) =>
      `Dear ${to},\n\nThis Easter letter comes to you with love from ${from}.\n\nThis journey is about love, sacrifice, and hope.\n\nWalk with us through the story that changed the world forever.\n\nWith love,\n${from} ❤️`,
    continueBtn: 'Open the Journey 📖',
    sharePrompt: 'Want to share with a friend?',
    shareBtn: '💌 Share this Letter',
    shareTitle: 'Share with a Friend',
    shareSubtitle: 'Personalise then pick a platform',
    fromPlaceholder: '✍️ Your name (From)',
    toPlaceholder: '💌 Friend\'s name (To)',
    fillBoth: 'Fill both names to enable sharing',
    copyBtn: 'Copy Link',
    copied: '✅ Copied!',
    shareMsg: (from, url) => `${from} sent you an Easter letter 💌\n\n${url}`,
    shareMsgShort: (from) => `${from} sent you an Easter letter 💌`,
  },
  ne: {
    defaultFrom: 'हजुरको साथी',
    defaultTo: 'तपाईं',
    label: 'ईस्टर पत्र',
    buildText: (from, to) =>
      `प्रिय ${to},\n\nयो ईस्टर पत्र ${from} तर्फबाट तपाईंलाई माया सहित आएको छ।\n\nयो यात्रा माया, बलिदान र आशाको बारेमा हो।\n\nहामीसँग त्यो कथामा हिँड्नुहोस् जसले संसारलाई सदाको लागि बदल्यो।\n\nमायासहित,\n${from} ❤️`,
    continueBtn: 'यात्रा खोल्नुहोस् 📖',
    sharePrompt: 'साथीसँग साझा गर्न चाहनुहुन्छ?',
    shareBtn: '💌 यो पत्र साझा गर्नुहोस्',
    shareTitle: 'साथीसँग साझा गर्नुहोस्',
    shareSubtitle: 'नाम भर्नुहोस् र प्लेटफर्म छान्नुहोस्',
    fromPlaceholder: '✍️ तपाईंको नाम (पठाउने)',
    toPlaceholder: '💌 साथीको नाम (पाउने)',
    fillBoth: 'साझा गर्न दुवै नाम भर्नुहोस्',
    copyBtn: 'लिंक कपी गर्नुहोस्',
    copied: '✅ कपी भयो!',
    shareMsg: (from, url) => `${from} ले तपाईंलाई ईस्टर पत्र पठाउनुभयो 💌\n\n${url}`,
    shareMsgShort: (from) => `${from} ले तपाईंलाई ईस्टर पत्र पठाउनुभयो 💌`,
  },
};

const platforms = [
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp className="w-4 h-4" />,
    color: 'bg-green-500 hover:bg-green-600',
    build: (url, from, c) => `https://wa.me/?text=${encodeURIComponent(c.shareMsg(from, url))}`,
  },
  {
    name: 'Facebook',
    icon: <FaFacebook className="w-4 h-4" />,
    color: 'bg-blue-600 hover:bg-blue-700',
    build: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Telegram',
    icon: <FaTelegramPlane className="w-4 h-4" />,
    color: 'bg-sky-500 hover:bg-sky-600',
    build: (url, from, c) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(c.shareMsgShort(from))}`,
  },
  {
    name: 'Twitter / X',
    icon: <FaTwitter className="w-4 h-4" />,
    color: 'bg-gray-900 hover:bg-black',
    build: (url, from, c) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(c.shareMsgShort(from))}&url=${encodeURIComponent(url)}`,
  },
];

const ShareModal = ({ onClose, c }) => {
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
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-sm bg-[#fffdf5] dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border-t border-amber-200 dark:border-amber-800 sm:border px-6 pt-6 pb-8"
      >
        <div className="sm:hidden w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-5" />
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Close">
          <FaTimes className="w-3.5 h-3.5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💌</span>
          </div>
          <h2 className="text-base font-extrabold text-gray-800 dark:text-white">{c.shareTitle}</h2>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">{c.shareSubtitle}</p>
        </div>

        <div className="space-y-3 mb-5">
          <input
            type="text" value={sFrom} onChange={(e) => setSFrom(e.target.value)}
            placeholder={c.fromPlaceholder} maxLength={40}
            className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />
          <input
            type="text" value={sTo} onChange={(e) => setSTo(e.target.value)}
            placeholder={c.toPlaceholder} maxLength={40}
            className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          {platforms.map((p) => (
            <button
              key={p.name}
              onClick={() => isValid && window.open(p.build(buildUrl(), sFrom.trim(), c), '_blank', 'noopener')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all ${p.color} ${!isValid ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all mt-1 ${
            isValid ? 'border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed opacity-40'
          }`}
        >
          <FaLink className="w-3.5 h-3.5" />
          {copied ? c.copied : c.copyBtn}
        </button>

        {!isValid && (
          <p className="text-center text-xs text-gray-400 mt-3">{c.fillBoth}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

const JourneyLetter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang } = useLanguage();

  const c = content[lang] ?? content.en;
  const saved = resolveNames(searchParams);
  const from = saved?.from ?? c.defaultFrom;
  const to   = saved?.to   ?? c.defaultTo;
  const FULL_TEXT = c.buildText(from, to);

  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Re-run typewriter whenever lang or names change
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) { clearInterval(interval); setDone(true); }
    }, 26);
    return () => clearInterval(interval);
  }, [FULL_TEXT]);

  const handleContinue = () => {
    const params = new URLSearchParams({ from, to });
    navigate(`/journey/story?${params.toString()}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-4 py-16"
      >
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-200/20 dark:bg-amber-900/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-200/20 dark:bg-orange-900/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg"
        >
          {/* Stacked paper effect */}
          <div className="absolute inset-0 translate-y-3 translate-x-3 bg-amber-100 dark:bg-amber-900/30 rounded-3xl opacity-50" />
          <div className="absolute inset-0 translate-y-1.5 translate-x-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-3xl opacity-70" />

          {/* Letter card */}
          <div className="relative bg-[#fffdf5] dark:bg-[#1e1a10] rounded-3xl shadow-2xl border border-amber-200/80 dark:border-amber-800/60 overflow-hidden">

            {/* Top ribbon */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />

            <div className="px-8 sm:px-10 py-10">
              {/* Cross header */}
              <div className="flex flex-col items-center mb-7">
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  className="text-4xl mb-3"
                >
                  ✝️
                </motion.span>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                  {c.label}
                </p>
              </div>

              <hr className="border-amber-200/60 dark:border-amber-800/40 mb-6" />

              {/* From / To tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  ✍️ From: <span className="font-bold">{from}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 text-xs font-semibold">
                  💌 To: <span className="font-bold">{to}</span>
                </span>
              </div>

              {/* Typewriter body */}
              <div className="min-h-[200px] bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl px-5 py-5 border border-amber-100 dark:border-amber-800/30">
                <p className="text-[15px] leading-[1.85] font-serif text-gray-700 dark:text-gray-200 whitespace-pre-line">
                  {displayed}
                  {!done && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.55 }}
                      className="inline-block w-0.5 h-[1.1em] bg-amber-500 ml-0.5 align-text-bottom"
                    />
                  )}
                </p>
              </div>

              {/* Post-typewriter actions */}
              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-8 space-y-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleContinue}
                      className="w-full py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-200 dark:shadow-amber-900/40 hover:shadow-xl transition-shadow"
                    >
                      {c.continueBtn}
                    </motion.button>

                    <div className="flex items-center gap-3">
                      <hr className="flex-1 border-amber-200/60 dark:border-amber-800/40" />
                      <span className="text-[11px] text-amber-500 dark:text-amber-400 font-semibold whitespace-nowrap">
                        {c.sharePrompt}
                      </span>
                      <hr className="flex-1 border-amber-200/60 dark:border-amber-800/40" />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowShare(true)}
                      className="w-full py-3 rounded-2xl border-2 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 font-bold text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors flex items-center justify-center gap-2"
                    >
                      {c.shareBtn}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wax seal */}
            <div className="flex justify-center pb-6 -mt-2">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg flex items-center justify-center text-white text-lg select-none ring-4 ring-[#fffdf5] dark:ring-[#1e1a10]">
                ✝
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showShare && <ShareModal onClose={() => setShowShare(false)} c={c} />}
      </AnimatePresence>
    </>
  );
};

export default JourneyLetter;
