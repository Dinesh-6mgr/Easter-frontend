
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const beats = [
  {
    emoji: '🌑',
    color: 'from-indigo-900 to-purple-900',
    textColor: 'text-indigo-300',
    bg: 'bg-indigo-950/40 dark:bg-indigo-950/60',
    border: 'border-indigo-800/50',
    en: {
      time: 'The Garden — Late Night',
      story: `In the Garden of Gethsemane, Jesus knelt alone under the olive trees. His sweat fell like drops of blood as He prayed: "Father, if it is possible, let this cup pass from me — yet not my will, but yours be done."\n\nHe knew what was coming. He chose it anyway — for you.`,
    },
    ne: {
      time: 'बगैँचा — राति ढिलो',
      story: `गेथसेमनीको बगैँचामा येशू जैतूनका रूखहरूमुनि एक्लै घुँडा टेकेर बस्नुभयो। उहाँको पसिना रगतका थोपाझैं खस्यो जब उहाँले प्रार्थना गर्नुभयो: "हे पिता, यदि सम्भव छ भने यो कचौरा मबाट हटाउनुहोस् — तर मेरो इच्छा होइन, तपाईंकै इच्छा पूरा होस्।"\n\nउहाँलाई थाहा थियो के हुँदैछ। तैपनि उहाँले हाम्रो निम्ति पक्राउ हुनुभो  — तपाईंको निम्ति / हाम्रो निम्ति।`,
    },
    verse: {
      en: { text: 'Father, if it is possible, let this cup pass from me — yet not my will, but yours be done.', ref: 'Matthew 26:39' },
      ne: { text: 'परमेश्वरले संसारलाई यति माया गर्नुभयो कि आफ्नो एकमात्र पुत्र दिनुभयो ताकि उहामाथी विश्वास गर्ने कोहि नास नहोस् तर अनन्त जिवन पावस।', ref: 'यूहन्ना ३:१६' },
    },
  },
  {
    emoji: '🪙',
    color: 'from-yellow-700 to-amber-900',
    textColor: 'text-amber-300',
    bg: 'bg-amber-950/30 dark:bg-amber-950/50',
    border: 'border-amber-800/50',
    en: {
      time: 'The Betrayal — Midnight',
      story: `Judas, one of His own twelve, led soldiers into the garden. He greeted Jesus with a kiss — the signal to arrest Him. Thirty pieces of silver. That was the price placed on the Son of God.\n\nThe disciples fled. Jesus stood still. He did not resist.`,
    },
    ne: {
      time: 'विश्वासघात — मध्यरात',
      story: `यहूदा, उहाँकै बाह्र जनामध्येको एक, सिपाहीहरूलाई बगैँचामा लिएर आयो। उसले येशूलाई चुम्बनले गर्यो — पक्राउ गर्ने संकेत दियो। तीस चाँदीका सिक्कामा उसले येशुलाइ बेच्यो। परमेश्वरको पुत्रको मूल्य त्यही थियो।\n\nयेशुका चेलाहरू भागे। येशू स्थिर उभिनुभयो। उहाँले बिरोध गर्नुभएन।`,
    },
    verse: {
      en: { text: 'He humbled Himself by becoming obedient to death — even death on a cross!', ref: 'Philippians 2:8' },
      ne: { text: 'उहाँले आफूलाई नम्र बनाउनुभयो, मृत्युसम्म, क्रूसको मृत्युसम्म आज्ञाकारी हुनुभयो!', ref: 'फिलिप्पी २:८' },
    },
  },
  {
    emoji: '⚖️',
    color: 'from-gray-700 to-slate-800',
    textColor: 'text-slate-300',
    bg: 'bg-slate-900/40 dark:bg-slate-900/60',
    border: 'border-slate-700/50',
    en: {
      time: 'The Trial — Before Dawn',
      story: `He was dragged before Pilate, mocked, spat upon, and beaten. A crown of thorns was pressed into His skull. Soldiers dressed Him in a purple robe and laughed.\n\n"Are you the King of the Jews?" Pilate asked.\n\n"You have said so," Jesus replied — calm, unbroken, full of grace.`,
    },
    ne: {
      time: 'मुद्दा — बिहान हुनुअघि',
      story: `उहाँलाई पिलातसकहाँ घिसारेर लगियो, ठट्टा गरियो, थुकियो र कुटियो। काँडाको मुकुट उहाँको टाउकोमा थिचियो। सिपाहीहरूले उहाँलाई बैजनी लुगा लगाएर यहुदिको राजा भनेर हाँसे।।`,
    },
    verse: {
      en: { text: 'He humbled Himself by becoming obedient to death — even death on a cross!', ref: 'Philippians 2:8' },
      ne: { text: 'उहाँले आफूलाई नम्र बनाउनुभयो, मृत्युसम्म, क्रूसको मृत्युसम्म आज्ञाकारी हुनुभयो!', ref: 'फिलिप्पी २:८' },
    },
  },
  {
    emoji: '🩸',
    color: 'from-red-800 to-rose-900',
    textColor: 'text-red-300',
    bg: 'bg-red-950/40 dark:bg-red-950/60',
    border: 'border-red-800/50',
    en: {
      time: 'The Road — Morning',
      story: `They forced Him to carry His own cross through the streets of Jerusalem. The crowd jeered. Women wept. He stumbled under the weight — not just of wood, but of every sin ever committed by every person who would ever live.\n\nHe carried your burden. He carried mine.`,
    },
    ne: {
      time: 'बाटो — बिहान',
      story: `उनीहरूले उहाँलाई यरूशलेमका गल्लीहरूमा आफ्नै क्रूस बोकाएर हिँडाए। भीड ठट्टा गर्यो। उहाँ भारले लड्खडाउनुभयो — काठको मात्र होइन, हरेक मानिसले गरेका हरेक पापको भारले।\n\nउहाँले तपाईंको बोझ बोक्नुभयो। उहाँले मेरो पनि बोक्नुभयो।`,
    },
    verse: {
      en: { text: 'He bore the sin of many.', ref: 'Isaiah 53:12' },
      ne: { text: 'उहाँ अपराधीहरूमा गनिनुभयो; तर उहाँले धेरैको पाप बोक्नुभयो।', ref: 'यशैया ५३:१२' },
    },
  },
  {
    emoji: '✝️',
    color: 'from-gray-900 to-red-950',
    textColor: 'text-red-200',
    bg: 'bg-gray-950/60 dark:bg-gray-950/80',
    border: 'border-red-900/60',
    en: {
      time: 'The Cross — 9 AM',
      story: `At Golgotha — "the place of the skull" — they nailed Him to the cross. Iron through flesh. Wood against bone. The sky turned dark at noon, as if creation itself was mourning.\n\nHe looked down at the soldiers gambling for His clothes and said:\n\n"Father, forgive them. They don't know what they are doing."\n\nEven in agony, He chose forgiveness.`,
    },
    ne: {
      time: 'क्रूस — बिहान ९ बजे',
      story: `गलगथामा — "खप्परको ठाउँ" — उनीहरूले उहाँलाई क्रूसमा ठोकेर झुड्याए। दिउँसो आकाश अँध्यारो भयो, मानौं सृष्टि नै शोकमा थियो।\n\nउहाँले आफ्नो लुगाको लागि जुवा खेलिरहेका सिपाहीहरूलाई हेरेर भन्नुभयो:\n\n"हे पिता, यिनीहरूलाई माफ गर्नुहोस्। यिनीहरूलाई थाहा छैन के गर्दैछन्।"\n\nपीडामा पनि उहाँले क्षमा रोज्नुभयो।`,
    },
    verse: {
      en: { text: 'Father, forgive them. They do not know what they are doing.', ref: 'Luke 23:34' },
      ne: { text: 'परमेश्वरले संसारलाई यति माया गर्नुभयो कि आफ्नो एकमात्र पुत्र दिनुभयो।', ref: 'यूहन्ना ३:१६' },
    },
  },
  {
    emoji: '🕯️',
    color: 'from-orange-900 to-red-900',
    textColor: 'text-orange-200',
    bg: 'bg-orange-950/40 dark:bg-orange-950/60',
    border: 'border-orange-800/50',
    en: {
      time: '"It Is Finished" — 3 PM',
      story: `After six hours on the cross, Jesus cried out with a loud voice:\n\n"It is finished."\n\nThe temple curtain — sixty feet tall, four inches thick — tore in two from top to bottom. The barrier between God and humanity was gone forever.\n\nHe bowed His head. And He gave up His spirit.\n\nThe earth shook. Rocks split. The centurion watching said: "Truly, this was the Son of God."`,
    },
    ne: {
      time: '"सकियो" — दिउँसो ३ बजे',
      story: `क्रूसमा छ घण्टापछि येशूले ठूलो स्वरले चिच्याउनुभयो:\n\n"सकियो।"\n\nमन्दिरको पर्दा माथिदेखि तलसम्म दुई टुक्रा भयो। परमेश्वर र मानवजातिबीचको अवरोध सदाको लागि हट्यो।\n\nउहाँले टाउको झुकाउनुभयो। र उहाँले आफ्नो प्राण त्याग्नुभयो।\n\n तब भूकम्प आयो। यो हेरिरहेको सेनापतिले भन्यो: "साँच्चै, यो परमेश्वरको पुत्र थियो।"`,
    },
    verse: {
      en: { text: 'Christ redeemed us from the curse of the law by becoming a curse for us.', ref: 'Galatians 3:13' },
      ne: { text: 'ख्रीष्टले हामीलाई श्रापबाट छुटकारा दिनुभयो, आफैं हाम्रो निम्ति श्राप बन्नुभएर।', ref: 'गलाती ३:१३' },
    },
  },
  {
    emoji: '🪨',
    color: 'from-stone-700 to-gray-800',
    textColor: 'text-stone-300',
    bg: 'bg-stone-900/40 dark:bg-stone-900/60',
    border: 'border-stone-700/50',
    en: {
      time: 'The Tomb — Sunset',
      story: `His body was taken down and laid in a borrowed tomb. A great stone was rolled across the entrance. Guards were posted. Sealed. Silent.\n\nSaturday came. The disciples hid in fear. The world held its breath.\n\nBut death had never met someone like Him before.`,
    },
    ne: {
      time: 'चिहान — साँझ',
      story: `उहाँको शरीर झारेर उधारो चिहानमा राखियो। ठूलो ढुङ्गा ढोकामा गुडाइयो। पहरेदारहरू राखिए। बन्द। मौन।\n\nशनिबार आयो। चेलाहरू डरले लुके। संसारले सास रोक्यो।\n\nतर मृत्युले उहाँजस्तो कसैलाई कहिल्यै भेटेको थिएन।`,
    },
    verse: {
      en: { text: 'God made Him who had no sin to be sin for us, so that in Him we might become the righteousness of God.', ref: '2 Corinthians 5:21' },
      ne: { text: 'परमेश्वरले जो पापलाई चिन्नुहुन्नथ्यो उहाँलाई हाम्रो निम्ति पाप बनाउनुभयो।', ref: '२ कोरिन्थी ५:२१' },
    },
  },
  {
    emoji: '🌅',
    color: 'from-yellow-500 to-orange-500',
    textColor: 'text-yellow-100',
    bg: 'bg-yellow-950/30 dark:bg-yellow-950/50',
    border: 'border-yellow-600/50',
    en: {
      time: 'The Resurrection — Early Morning',
      story: `Before sunrise on the third day, Mary Magdalene came to the tomb. The stone was rolled away. The grave clothes lay folded. Two angels sat where His body had been.\n\n"Why do you look for the living among the dead?" they asked.\n\nThen she heard her name — "Mary" — spoken by a voice she knew. She turned. He was standing there. Alive.\n\nDeath had lost. Love had won. Everything changed.`,
    },
    ne: {
      time: 'पुनरुत्थान — बिहान सबेरै',
      story: `तेस्रो दिन सूर्योदयभन्दा अघि मरियम मग्दलिनी चिहानमा आइन्। ढुङ्गा गुडाइएको थियो। कफन मोडिएको थियो। दुई स्वर्गदूत उहाँको शरीर थिएको ठाउँमा बसेका थिए।\n\n"किन तिमी जीवितलाई मृतकहरूमाझ खोज्छौ?" उनीहरूले सोधे।\n\nत्यसपछि उनले आफ्नो नाम सुनिन् — "मरियम" — एउटा चिनेको आवाजले बोलेको। उनी फर्किइन्। उहाँ त्यहाँ जीवित उभिनुभएको  थियो ।\n\nमृत्यु हार्यो। मायाले जित्यो। सबै कुरा बदलियो।`,
    },
    verse: {
      en: { text: 'He is not here; He has risen, just as He said!', ref: 'Matthew 28:6' },
      ne: { text: 'उहाँ यहाँ हुनुहुन्न; उहाँ जीवित हुनुहुन्छ, उहाँले भन्नु भएको अनुसार!', ref: 'मत्ती २८:६' },
    },
  },
];

const ui = {
  en: {
    chapter: 'Chapter',
    title1: 'The Story of',
    title2: 'Good Friday',
    subtitle: 'The day love paid the highest price. Read slowly. Feel every moment.',
    closing1: 'He did all of this for you.',
    closing2: 'Not because you were perfect. Not because you earned it. Simply because He loved you — before you even knew His name.',
    continueBtn: 'Continue ✝️',
  },
  ne: {
    chapter: 'अध्याय',
    title1: 'को कथा',
    title2: 'गुड फ्राइडे',
    subtitle: 'त्यो दिन जब मायाले सबैभन्दा ठूलो मूल्य चुकायो। बिस्तारै पढ्नुहोस्। हरेक क्षण महसुस गर्नुहोस्।',
    closing1: 'उहाँले यो सब तपाईंको निम्ति गर्नुभयो।',
    closing2: 'किनभने तपाईं सिद्ध हुनुहुन्थ्यो भनेर होइन। किनभने तपाईंले कमाएको थियो भनेर होइन। केवल किनभने उहाँले तपाईंलाई माया गर्नुहुन्थ्यो — तपाईंले उहाँको नाम जान्नुभन्दा पहिले नै।',
    continueBtn: 'अगाडि बढ्नुहोस् ✝️',
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-red-600 to-orange-400 origin-left z-50"
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
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

        {/* Beats */}
        <div className="space-y-8">
          {beats.map((beat, i) => (
            <BeatCard key={i} beat={beat} index={i} />
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-2xl bg-gradient-to-br from-red-900/80 to-gray-900/80 border border-red-800/40 px-6 sm:px-8 py-8 sm:py-10 text-center shadow-2xl"
        >
          <p className="text-4xl mb-4">🕊️</p>
          <p className="text-white text-lg sm:text-xl font-bold mb-3">{t.closing1}</p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{t.closing2}</p>
        </motion.div>

        {/* Continue */}
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
