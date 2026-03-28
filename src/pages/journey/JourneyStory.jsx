import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const beats = [
  {
    emoji: '🌿',
    color: 'from-green-600 to-emerald-700',
    bg: 'bg-green-50/60 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-100',
    en: { time: 'Palm Sunday — Day 1', story: 'Jesus entered Jerusalem riding on a donkey. The crowd spread palm branches and welcomed Him, shouting "Hosanna!"\n\nThey expected a warrior king. He came as a servant. The journey of love had begun.' },
    ne: { time: 'पाम आइतबार — दिन १', story: 'येशू गधामा चढेर यरूशलेम प्रवेश गर्नुभयो। भीडले ताडपत्र बिछ्याएर "होसन्ना" भन्दै स्वागत गर्‍यो।\n\nउनीहरूले योद्धा राजा चाहन्थे। उहाँ सेवक भएर आउनुभयो। प्रेमको यात्रा सुरु भयो।' },
    verse: {
      en: { text: 'Hosanna! Blessed is He who comes in the name of the Lord!', ref: 'Matthew 21:9' },
      ne: { text: 'होसन्ना! धन्य छन् उहाँ जो प्रभुको नाममा आउनुहुन्छ!', ref: 'मत्ती २१:९' },
    },
  },
  {
    emoji: '🏛️',
    color: 'from-blue-600 to-cyan-700',
    bg: 'bg-blue-50/60 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-100',
    en: { time: 'Monday — Day 2', story: 'Jesus went into the temple and drove out those who were buying and selling. He overturned the tables of the money changers.\n\nWorship is not a marketplace. God\'s house is a house of prayer.' },
    ne: { time: 'सोमबार — दिन २', story: 'येशू मन्दिरमा गएर किनबेच गर्नेहरूलाई निकाल्नुभयो। उहाँले साहुकारहरूका टेबुल पल्टाउनुभयो।\n\nआराधना बजार होइन। परमेश्वरको घर प्रार्थनाको घर हो।' },
    verse: {
      en: { text: 'My house will be called a house of prayer, but you are making it a den of robbers.', ref: 'Matthew 21:13' },
      ne: { text: 'मेरो घर प्रार्थनाको घर भनिनेछ, तर तिमीहरूले यसलाई डाकुहरूको गुफा बनाएका छौ।', ref: 'मत्ती २१:१३' },
    },
  },
  {
    emoji: '📖',
    color: 'from-indigo-600 to-purple-700',
    bg: 'bg-indigo-50/60 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-800',
    textColor: 'text-indigo-100',
    en: { time: 'Tuesday — Day 3', story: 'Jesus taught in the temple all day. He spoke in parables, answered the religious leaders, and warned about the end times.\n\nHis words cut through every argument. Truth cannot be silenced.' },
    ne: { time: 'मंगलबार — दिन ३', story: 'येशूले दिनभर मन्दिरमा शिक्षा दिनुभयो। उहाँले दृष्टान्तहरू बताउनुभयो र धर्मगुरुहरूका प्रश्नहरूको उत्तर दिनुभयो।\n\nउहाँका वचनले हरेक तर्कलाई काट्यो। सत्यलाई चुप गराउन सकिँदैन।' },
    verse: {
      en: { text: 'Heaven and earth will pass away, but my words will never pass away.', ref: 'Matthew 24:35' },
      ne: { text: 'आकाश र पृथ्वी बित्नेछन्, तर मेरा वचन कहिल्यै बित्नेछैनन्।', ref: 'मत्ती २४:३५' },
    },
  },
  {
    emoji: '🤫',
    color: 'from-slate-600 to-gray-700',
    bg: 'bg-slate-50/60 dark:bg-slate-900/20',
    border: 'border-slate-200 dark:border-slate-700',
    textColor: 'text-slate-100',
    en: { time: 'Wednesday — Day 4', story: 'A quiet day. No miracles recorded. No crowds. But in the silence, Judas went to the chief priests and agreed to betray Jesus for thirty pieces of silver.\n\nEven in silence, God is working. Even in betrayal, the plan continues.' },
    ne: { time: 'बुधबार — दिन ४', story: 'शान्त दिन। कुनै चमत्कार थिएन। कुनै भीड थिएन। तर मौनतामा यहूदाले प्रधान पुजारीहरूकहाँ गएर तीस चाँदीका सिक्काको बदलामा येशूलाई धोका दिन सहमत भयो।\n\nमौनतामा पनि परमेश्वर काम गरिरहनु हुन्छ।' },
    verse: {
      en: { text: 'What are you willing to give me if I deliver him over to you? And they paid him thirty pieces of silver.', ref: 'Matthew 26:15' },
      ne: { text: 'यदि म उहाँलाई तिमीहरूको हातमा सुम्पिदिऊँ भने तिमीहरू मलाई के दिन्छौ? र उनीहरूले उसलाई तीस चाँदीका सिक्का दिए।', ref: 'मत्ती २६:१५' },
    },
  },
  {
    emoji: '🍞',
    color: 'from-amber-600 to-orange-700',
    bg: 'bg-amber-50/60 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-100',
    en: { time: 'Thursday — Day 5', story: 'Jesus shared the Last Supper with His disciples. He took bread, broke it, and said "This is my body." He took the cup and said "This is my blood."\n\nHe washed their feet — the King becoming a servant. Then in the garden, He prayed until His sweat was like drops of blood.' },
    ne: { time: 'बिहीबार — दिन ५', story: 'येशूले आफ्ना चेलाहरूसँग अन्तिम भोज गर्नुभयो। उहाँले रोटी लिएर तोड्नुभयो र भन्नुभयो "यो मेरो शरीर हो।" उहाँले प्याला लिएर भन्नुभयो "यो मेरो रगत हो।"\n\nउहाँले उनीहरूका खुट्टा धुनुभयो — राजा सेवक बन्नुभयो। त्यसपछि बगैंचामा उहाँले यति तीव्रतासाथ प्रार्थना गर्नुभयो कि उहाँको पसिना रगतका थोपाजस्तो भयो।' },
    verse: {
      en: { text: 'This is my body given for you; do this in remembrance of me.', ref: 'Luke 22:19' },
      ne: { text: 'यो मेरो शरीर हो जो तिमीहरूको निम्ति दिइन्छ; मेरो सम्झनामा यो गर्नुहोस्।', ref: 'लूका २२:१९' },
    },
  },
  {
    emoji: '✝️',
    color: 'from-red-700 to-rose-900',
    bg: 'bg-red-50/60 dark:bg-red-900/20',
    border: 'border-red-300 dark:border-red-800',
    textColor: 'text-red-100',
    en: { time: 'Good Friday — Day 6', story: 'Jesus was arrested, tried, beaten, and crucified. He was nailed to the cross at nine in the morning. Darkness covered the land.\n\nAt three in the afternoon, He cried out — "It is finished." And He breathed His last.\n\nThe Son of God died so that you could live.' },
    ne: { time: 'गुड फ्राइडे — दिन ६', story: 'येशूलाई पक्राउ गरियो, न्याय गरियो, कुटियो र क्रूसमा टाँगियो। बिहान नौ बजे उहाँलाई क्रूसमा ठोकियो। अँध्यारोले भूमि ढाक्यो।\n\nदिउँसो तीन बजे उहाँले चिच्याउनुभयो — "पूरा भयो।" र उहाँले अन्तिम सास फेर्नुभयो।\n\nपरमेश्वरका पुत्र मर्नुभयो ताकि तपाईं बाँच्न सक्नुहोस्।' },
    verse: {
      en: { text: 'It is finished.', ref: 'John 19:30' },
      ne: { text: 'पूरा भयो।', ref: 'यूहन्ना १९:३०' },
    },
  },
  {
    emoji: '🪨',
    color: 'from-gray-600 to-slate-800',
    bg: 'bg-gray-50/60 dark:bg-gray-900/20',
    border: 'border-gray-200 dark:border-gray-700',
    textColor: 'text-gray-100',
    en: { time: 'Saturday — Day 7', story: 'The body of Jesus was wrapped in linen and placed in a tomb. A large stone was rolled over the entrance. Guards were posted.\n\nThe disciples were silent. Hope seemed buried. But God was not finished.' },
    ne: { time: 'शनिबार — दिन ७', story: 'येशूको शरीरलाई कपडामा बेरेर चिहानमा राखियो। ठूलो ढुंगा प्रवेशद्वारमा लगाइयो। सैनिकहरू तैनाथ गरिए।\n\nचेलाहरू मौन थिए। आशा गाडिएको जस्तो लाग्यो। तर परमेश्वर सकिनुभएको थिएन।' },
    verse: {
      en: { text: 'So they went and made the tomb secure by putting a seal on the stone and posting the guard.', ref: 'Matthew 27:66' },
      ne: { text: 'तिनीहरू गए र ढुंगामा छाप लगाएर र पहरेदार राखेर चिहानलाई सुरक्षित बनाए।', ref: 'मत्ती २७:६६' },
    },
  },
  {
    emoji: '🌅',
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-50/60 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-700',
    textColor: 'text-yellow-100',
    en: { time: 'Easter Sunday — Day 8', story: 'Early in the morning, the women came to the tomb. The stone was rolled away. The tomb was empty.\n\nAn angel said: "He is not here. He has risen!"\n\nJesus appeared to His disciples. Death was defeated. Hope is alive — forever.' },
    ne: { time: 'ईस्टर आइतबार — दिन ८', story: 'बिहान सबेरै महिलाहरू चिहानमा आए। ढुंगा हटाइएको थियो। चिहान खाली थियो।\n\nस्वर्गदूतले भन्यो: "उहाँ यहाँ हुनुहुन्न। उहाँ जीवित हुनुभयो!"\n\nयेशू आफ्ना चेलाहरूलाई देखा पर्नुभयो। मृत्यु पराजित भयो। आशा सधैंको लागि जीवित छ।' },
    verse: {
      en: { text: 'He is not here; he has risen, just as he said.', ref: 'Matthew 28:6' },
      ne: { text: 'उहाँ यहाँ हुनुहुन्न; उहाँले भन्नुभएझैं उहाँ जीवित हुनुभयो।', ref: 'मत्ती २८:६' },
    },
  },
];

const ui = {
  en: {
    chapter: 'Chapter',
    title1: 'The Story of',
    title2: 'Holy Week',
    subtitle: 'Walk slowly through the final days of Jesus. Feel every moment, every sacrifice, every hope.',
    closing1: 'He did all of this for you.',
    closing2: 'Not because you were perfect. Not because you earned it. Simply because He loved you — before you even knew His name.',
    continueBtn: 'Continue the Journey ✝️',
  },
  ne: {
    chapter: 'अध्याय',
    title1: 'को कथा',
    title2: 'पवित्र साता',
    subtitle: 'येशूका अन्तिम दिनहरूमा बिस्तारै हिँड्नुहोस्। हरेक क्षण, हरेक बलिदान, हरेक आशा महसुस गर्नुहोस्।',
    closing1: 'उहाँले यो सब तपाईंको निम्ति गर्नुभयो।',
    closing2: 'किनभने तपाईं सिद्ध हुनुहुन्थ्यो भनेर होइन। केवल किनभने उहाँले तपाईंलाई माया गर्नुहुन्थ्यो — तपाईंले उहाँको नाम जान्नुभन्दा पहिले नै।',
    continueBtn: 'यात्रा जारी राख्नुहोस् ✝️',
  },
};

const BeatCard = ({ beat, index }) => {
  const { lang } = useLanguage();
  const l = beat[lang] ?? beat.en;
  const v = beat.verse[lang] ?? beat.verse.en;
  const chapter = (ui[lang] ?? ui.en).chapter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl border ${beat.border} ${beat.bg} backdrop-blur-sm overflow-hidden shadow-lg`}
    >
      <div className={`bg-gradient-to-r ${beat.color} px-5 sm:px-6 py-4 flex items-center gap-3`}>
        <span className="text-2xl sm:text-3xl shrink-0">{beat.emoji}</span>
        <div className="min-w-0">
          <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${beat.textColor} opacity-80`}>
            {chapter} {index + 1}
          </p>
          <h3 className="text-white font-bold text-base sm:text-lg leading-tight">{l.time}</h3>
        </div>
      </div>
      <div className="px-5 sm:px-6 py-5 sm:py-6">
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line text-sm sm:text-[15px]">
          {l.story}
        </p>
        <div className={`mt-5 rounded-xl border ${beat.border} bg-white/30 dark:bg-black/20 px-4 sm:px-5 py-4`}>
          <p className="italic text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            &ldquo;{v.text}&rdquo;
          </p>
          {v.ref && (
            <p className={`text-right text-xs font-bold mt-2 ${beat.textColor}`}>— {v.ref}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const JourneyStory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang } = useLanguage();
  const t = ui[lang] ?? ui.en;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-red-600 to-yellow-400 origin-left z-50"
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="text-5xl mb-4"
          >
            ✝️
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-gray-800 dark:text-white leading-tight">
            {lang === 'ne' ? (
              <><span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{t.title2}</span>{' '}{t.title1}</>
            ) : (
              <>{t.title1}{' '}<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{t.title2}</span></>
            )}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-sm mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="space-y-8">
          {beats.map((beat, i) => (
            <BeatCard key={i} beat={beat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-2xl bg-gradient-to-br from-red-900/80 to-gray-900/80 border border-red-800/40 px-6 sm:px-8 py-8 sm:py-10 text-center shadow-2xl"
        >
          <p className="text-4xl mb-4">🕊️</p>
          <p className="text-white text-lg sm:text-xl font-bold mb-3">{t.closing1}</p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{t.closing2}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mt-10 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/journey/game?${searchParams.toString()}`)}
            className="px-10 sm:px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold rounded-full shadow-2xl shadow-red-200 dark:shadow-red-900/30 text-base sm:text-lg"
          >
            {t.continueBtn}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JourneyStory;
