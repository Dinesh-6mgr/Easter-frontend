import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaTelegramPlane, FaTwitter, FaLink, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { getPlayer } from '../../components/game/PlayerSetupModal';

const LS_KEY = 'easterJourneyNames';

// ── Date-based letter body ──────────────────────────────────────────────────
const DATE_GREETINGS = {
  en: {
    easterSunday: {
      occasion: 'Easter Sunday 🌅',
      emoji: '🌅',
      greeting: 'He is Risen! Alleluia!',
      body: `Today we rejoice in the victory of the resurrection — the tomb is empty, death is defeated, and hope is alive forever.

Jesus rose from the dead, just as He promised. This is not only a story from long ago, but a living hope for today and for all eternity.

May this Easter Sunday fill your heart with peace, joy, and renewed faith in the One who gives life.`,
      closing: 'With Easter joy',
    },

    goodFriday: {
      occasion: 'Good Friday ✝️',
      emoji: '✝️',
      greeting: 'On this sacred day, we remember,',
      body: `Today we reflect on the cross — where the love of Christ was revealed in its fullest measure.

Jesus, the Son of God, gave Himself for the life of the world. When He said, "It is finished," the work of redemption was completed and the way of grace was opened.

This day calls us not only to sorrow, but also to gratitude, reverence, and quiet hope.`,
      closing: 'With sincere gratitude',
    },

    palmSunday: {
      occasion: 'Palm Sunday 🌿',
      emoji: '🌿',
      greeting: 'Hosanna! Blessed is He who comes in the name of the Lord!',
      body: `Today we remember Jesus entering Jerusalem in humility and peace.

The crowds welcomed Him with joy, not fully understanding all that this week would hold. Yet Jesus came willingly, knowing the path before Him.

As Holy Week begins, may our hearts also welcome the King with faith, praise, and expectation.`,
      closing: 'With hope and praise',
    },

    maundyThursday: {
      occasion: 'Maundy Thursday 🍞',
      emoji: '🍞',
      greeting: 'On this meaningful evening, we remember,',
      body: `On this night, Jesus gathered with His disciples at the Last Supper. He broke the bread, shared the cup, and washed their feet.

In doing so, He showed that true greatness is found in humility, service, and love. His words still call us to love one another as He has loved us.

May this day lead us to deeper love, faithful service, and grateful remembrance.`,
      closing: 'With humble love',
    },

    holySaturday: {
      occasion: 'Holy Saturday 🕯️',
      emoji: '🕯️',
      greeting: 'In the silence, we wait with hope.',
      body: `Today we remember the quietness of the tomb and the sorrow of those who waited without yet seeing what God would do next.

Though everything seemed still, God was still at work. Even in silence, He had not abandoned His promise.

For every season of waiting, Holy Saturday reminds us that hope is never lost in God’s hands.`,
      closing: 'With quiet hope',
    },

    default: {
      occasion: 'Easter Season 🐣',
      emoji: '🥚',
      greeting: 'Grace and peace to you in this Easter season.',
      body: `Easter is more than a celebration — it is the message of Christ’s love, sacrifice, death, and resurrection.

From Palm Sunday to the empty tomb, every step reveals the heart of God and the gift of salvation made known through Jesus Christ.

Welcome to the Passion of the Week 2082. May this journey deepen your faith and fill your heart with peace and hope.`,
      closing: 'Wishing you peace and joy',
    },
  },

  ne: {
    easterSunday: {
      occasion: 'ईस्टर आइतबार 🌅',
      emoji: '🌅',
      greeting: 'उहाँ जीवित हुनुभएको छ! हल्लेलूयाह!',
      body: `आज हामी पुनरुत्थानको विजयमा आनन्दित हुन्छौँ — चिहान खाली छ, मृत्यु पराजित भएको छ, र आशा सदाको लागि जीवित छ।

येशू ठीक उहाँले वाचा गर्नुभएझैँ मृत्युमाथि विजय पाएर जीवित हुनुभयो। यो केवल विगतको घटना मात्र होइन, तर आज र सदासर्वदाको लागि जीवित आशा हो।

यो ईस्टर आइतबारले तपाईंको हृदयलाई शान्ति, आनन्द, र जीवन दिनुहुने प्रभुप्रतिको नयाँ विश्वासले भरिदिओस्।`,
      closing: 'ईस्टरको आनन्दसहित',
    },

    goodFriday: {
      occasion: 'गुड फ्राइडे ✝️',
      emoji: '✝️',
      greeting: 'यस पवित्र दिनमा हामी सम्झन्छौँ,',
      body: `आज हामी क्रूसलाई मनन गर्छौँ — जहाँ ख्रीष्टको प्रेम पूर्ण रूपमा प्रकट भयो।

परमेश्वरका पुत्र येशूले संसारको निम्ति आफूलाई अर्पण गर्नुभयो। जब उहाँले भन्नुभयो, "पूरा भयो," उद्धारको काम पूरा भयो र अनुग्रहको बाटो खुल्यो।

यो दिनले हामीलाई केवल शोकमा होइन, तर कृतज्ञता, श्रद्धा, र मौन आशामा पनि डोर्‍याउँछ।`,
      closing: 'हार्दिक कृतज्ञतासहित',
    },

    palmSunday: {
      occasion: 'पाम आइतबार 🌿',
      emoji: '🌿',
      greeting: 'होसन्ना! धन्य हुनुहुन्छ उहाँ, जो प्रभुको नाममा आउनुहुन्छ!',
      body: `आज हामी येशूको यरूशलेम प्रवेशलाई सम्झन्छौँ — उहाँ नम्रता र शान्तिसहित राजा भएर आउनुभयो।

भीडले उहाँलाई आनन्दसाथ स्वागत गर्‍यो, तर यस साताले के ल्याउनेछ भन्ने कुरा सबैले पूर्ण रूपमा बुझेका थिएनन्। तर येशूले बाटो जान्नुहुन्थ्यो, र तैपनि उहाँ इच्छापूर्वक आउनुभयो।

पवित्र साताको सुरुवातमा, हाम्रो हृदयले पनि विश्वास, स्तुति, र आशासहित उहाँलाई स्वागत गरोस्।`,
      closing: 'आशा र स्तुतिसहित',
    },

    maundyThursday: {
      occasion: 'मौन्डी बिहीबार 🍞',
      emoji: '🍞',
      greeting: 'यस अर्थपूर्ण साँझमा हामी सम्झन्छौँ,',
      body: `यस रात येशू आफ्ना चेलाहरूसँग अन्तिम भोजमा बस्नुभयो। उहाँले रोटी तोड्नुभयो, कचौरा बाँड्नुभयो, र उनीहरूका खुट्टा धुनुभयो।

यसरी उहाँले देखाउनुभयो कि साँचो महानता नम्रता, सेवा, र प्रेममा पाइन्छ। उहाँका वचनहरूले आज पनि हामीलाई एकअर्कालाई प्रेम गर्न बोलाइरहेका छन्।

यो दिनले हाम्रो जीवनलाई गहिरो प्रेम, निष्ठावान सेवा, र कृतज्ञ सम्झनातर्फ डोर्‍याओस्।`,
      closing: 'विनम्र प्रेमसहित',
    },

    holySaturday: {
      occasion: 'पवित्र शनिबार 🕯️',
      emoji: '🕯️',
      greeting: 'मौनतामा, हामी आशासहित प्रतीक्षा गर्छौँ।',
      body: `आज हामी चिहानको शान्तता र ती मानिसहरूको शोकलाई सम्झन्छौँ, जसले अझै परमेश्वरले के गर्नुहुन्छ भनेर देखेका थिएनन्।

सबै कुरा स्थिर देखिए पनि, परमेश्वर काम गरिरहनुभएको थियो। मौनतामा पनि उहाँले आफ्नो प्रतिज्ञा त्याग्नुभएको थिएन।

प्रतीक्षाको हरेक समयमा, पवित्र शनिबारले हामीलाई सम्झाउँछ कि परमेश्वरका हातमा आशा कहिल्यै हराउँदैन।`,
      closing: 'शान्त आशासहित',
    },

    default: {
      occasion: 'ईस्टर मौसम 🐣',
      emoji: '🥚',
      greeting: 'यो ईस्टर मौसममा तपाईंलाई अनुग्रह र शान्ति होस्।',
      body: `ईस्टर केवल उत्सव मात्र होइन — यो ख्रीष्टको प्रेम, बलिदान, मृत्यु, र पुनरुत्थानको सन्देश हो।

पाम आइतबारदेखि खाली चिहानसम्म, यस यात्राको हरेक कदमले परमेश्वरको हृदय र येशू ख्रीष्टद्वारा प्रकट भएको उद्धारको वरदानलाई देखाउँछ।

Passion of the Week 2082 मा तपाईंलाई स्वागत छ। यो यात्राले तपाईंको विश्वासलाई गहिरो बनाओस् र तपाईंको हृदयलाई शान्ति र आशाले भरिदिओस्।`,
      closing: 'शान्ति र आनन्दको कामनासहित',
    },
  },
};


const getDateGreeting = (lang = 'en') => {
  const today = new Date();
  // Use local date parts to avoid timezone issues
  const month = today.getMonth(); // 0-indexed: 0=Jan, 2=Mar, 3=Apr
  const day   = today.getDate();
  const msgs  = DATE_GREETINGS[lang] ?? DATE_GREETINGS.en;

  // Easter 2026 dates (month is 0-indexed)
  const dates = {
    palmSunday:     { m: 2, d: 29 }, // March 29
    maundyThursday: { m: 3, d: 2  }, // April 2
    goodFriday:     { m: 3, d: 3  }, // April 3
    holySaturday:   { m: 3, d: 4  }, // April 4
    easterSunday:   { m: 3, d: 5  }, // April 5
  };

  const match = (e) => month === e.m && day === e.d;

  if (match(dates.palmSunday))     return msgs.palmSunday;
  if (match(dates.maundyThursday)) return msgs.maundyThursday;
  if (match(dates.goodFriday))     return msgs.goodFriday;
  if (match(dates.holySaturday))   return msgs.holySaturday;
  if (match(dates.easterSunday))   return msgs.easterSunday;

  // Holy Week range fallback: March 29 – April 5 show Palm Sunday greeting
  const isHolyWeek = (month === 2 && day >= 29) || (month === 3 && day <= 5);
  if (isHolyWeek) return msgs.palmSunday;

  return msgs.default;
};

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
  return null;
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
    sharePrompt: 'अरूलाइ Share चाहनुहुन्छ?',
    shareBtn: '💌 यो पत्र Share गर्नुहोस्',
    shareTitle: 'साथीसँग Share गर्नुहोस्',
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
  // Fall back to saved player name from game setup
  const playerName = getPlayer()?.name;
  const from = saved?.from ?? playerName ?? c.defaultFrom;
  const to   = saved?.to   ?? c.defaultTo;

  const dateInfo = getDateGreeting(lang);
  const dearWord = lang === 'ne' ? 'प्रिय' : 'Dear';
  const FULL_TEXT = `${dearWord} ${to},\n\n${dateInfo.greeting}\n\n${dateInfo.body}\n\n${dateInfo.closing},\n${from} ❤️`;

  const [opened, setOpened]       = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Start typewriter when envelope is opened
  useEffect(() => {
    if (!opened) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) { clearInterval(interval); setDone(true); }
    }, 26);
    return () => clearInterval(interval);
  }, [opened, FULL_TEXT]);

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

        <AnimatePresence mode="wait">
          {!opened ? (
            /* ── Envelope view ── */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 50, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -30, rotateX: 15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 w-full max-w-sm px-4"
            >
              {/* Title */}
              <div className="text-center space-y-1">
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 dark:text-amber-400"
                >
                  You have a letter
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-extrabold text-gray-800 dark:text-white"
                >
                  {dateInfo.occasion}
                </motion.h1>
              </div>

              {/* Envelope */}
              <motion.button
                onClick={() => setOpened(true)}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="relative w-full cursor-pointer focus:outline-none group"
                style={{ perspective: '800px' }}
                aria-label="Open letter"
              >
                {/* Drop shadow layer */}
                <div className="absolute inset-x-4 bottom-0 h-6 bg-amber-900/20 dark:bg-black/40 blur-xl rounded-full translate-y-3" />

                {/* Main envelope */}
                <div className="relative rounded-2xl overflow-visible shadow-2xl">

                  {/* ── Flap (top triangle, lifts on hover) ── */}
                  <motion.div
                    className="absolute inset-x-0 top-0 z-20 origin-top"
                    style={{ height: '48%' }}
                    initial={false}
                    whileHover={{ rotateX: -35 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  >
                    <svg viewBox="0 0 400 160" className="w-full h-full drop-shadow-sm" preserveAspectRatio="none">
                      {/* Flap fill */}
                      <polygon points="0,0 400,0 200,160" fill="url(#flapGrad)" />
                      {/* Subtle crease lines */}
                      <line x1="0" y1="0" x2="200" y2="160" stroke="#d97706" strokeWidth="1" opacity="0.25" />
                      <line x1="400" y1="0" x2="200" y2="160" stroke="#d97706" strokeWidth="1" opacity="0.25" />
                      <defs>
                        <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* ── Envelope body ── */}
                  <div className="relative bg-[#fffdf5] dark:bg-[#2c2410] border-2 border-amber-300 dark:border-amber-700 rounded-2xl overflow-hidden">

                    {/* Decorative border stripe */}
                    <div className="h-1 w-full bg-gradient-to-r from-red-400 via-amber-400 to-red-400" />

                    {/* Body content */}
                    <div className="px-6 pt-14 pb-6">

                      {/* Stamp (top-right) */}
                      <div className="absolute top-5 right-5 w-14 h-16 border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-sm flex flex-col items-center justify-center bg-amber-50 dark:bg-amber-900/30 shadow-inner">
                        <span className="text-2xl leading-none">{dateInfo.emoji}</span>
                        <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">Easter</span>
                      </div>

                      {/* Postmark circle */}
                      <div className="absolute top-4 right-20 w-10 h-10 rounded-full border border-red-300 dark:border-red-700 opacity-40 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border border-red-300 dark:border-red-700" />
                      </div>

                      {/* Address block */}
                      <div className="space-y-3">
                        {/* To */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400 mb-0.5">To</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">💌</span>
                            <p className="text-xl font-extrabold text-gray-800 dark:text-white leading-tight">{to}</p>
                          </div>
                          {/* Address lines decoration */}
                          <div className="mt-2 space-y-1.5 pl-8">
                            <div className="h-px w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                            <div className="h-px w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-dashed border-amber-200 dark:border-amber-800" />

                        {/* From */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-0.5">From</p>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                              <span>✍️</span> {from}
                            </p>
                          </div>
                          {/* Wax seal */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-800 shadow-lg flex items-center justify-center text-white text-base select-none ring-[3px] ring-[#fffdf5] dark:ring-[#2c2410] ring-offset-0 shrink-0">
                            ✝
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom V-fold */}
                    <div className="overflow-hidden" style={{ height: '36px' }}>
                      <svg viewBox="0 0 400 36" className="w-full h-full" preserveAspectRatio="none">
                        <polygon points="0,36 200,0 400,36" fill="#fef3c7" className="dark:fill-amber-900/40" />
                        <line x1="0" y1="36" x2="200" y2="0" stroke="#d97706" strokeWidth="1" opacity="0.2" />
                        <line x1="400" y1="36" x2="200" y2="0" stroke="#d97706" strokeWidth="1" opacity="0.2" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Tap hint */}
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6], y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-5 flex items-center justify-center gap-2"
                >
                  <span className="text-base">👆</span>
                  <span className="text-sm font-semibold text-amber-500 dark:text-amber-400 tracking-wide">
                    Tap to open
                  </span>
                </motion.div>
              </motion.button>
            </motion.div>
          ) : (
            /* ── Letter view ── */
            <motion.div
              key="letter"
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
                  {/* Occasion header */}
                  <div className="flex flex-col items-center mb-7">
                    <motion.span
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                      className="text-4xl mb-3"
                    >
                      {dateInfo.emoji}
                    </motion.span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-[0.15em]">
                      {dateInfo.occasion}
                    </span>
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
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showShare && <ShareModal onClose={() => setShowShare(false)} c={c} />}
      </AnimatePresence>
    </>
  );
};

export default JourneyLetter;
