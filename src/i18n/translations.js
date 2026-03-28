const translations = {
  en: {
    // Navbar
    nav: {
      home: 'Home',
      timeline: 'Timeline',
      game: 'Game',
      leaderboard: 'Leaderboard',
    },

    // Language picker
    langPicker: {
      title: 'Choose Your Language',
      subtitle: 'Select a language to continue',
      en: 'English',
      ne: 'नेपाली',
      confirm: 'Continue',
    },

    // Home
    home: {
      hero: 'Passion of the Week 2082',
      tagline: '🕊️ Prepare your heart for the Easter celebration. Join our egg hunt and learn about the journey!',
      startPlaying: 'Start Playing 🎮',
      learnStory: 'Learn the Story 📖',
      adventureTitle: 'Your Easter',
      adventureHighlight: 'Adventure',
      adventureEnd: 'Awaits',
      explore: 'Explore →',
      ctaTitle: 'Ready for the Hunt?',
      ctaDesc: 'Test your skills, collect eggs, and make it to the leaderboard!',
      playNow: 'Play Now 🎯',
      features: [
        { title: 'Easter Timeline', description: 'Journey through Holy Week from Palm Sunday to Easter Sunday' },
        { title: 'Egg Hunt Game',   description: 'Collect eggs, avoid bombs, and set high scores!' },
        { title: 'Leaderboard',     description: 'Compete with others and see top scores' },
      ],
    },

    // Timeline
    timeline: {
      title: 'Holy Week',
      titleHighlight: 'Journey',
      subtitle: 'Walk slowly through the final days of Jesus — feel every moment, every sacrifice, every hope.',
      risen: 'He Is Risen!',
      verse: '"He is not here; He has risen." — Matthew 28:6',
      events: [
        { day: '🌿 Palm Sunday',   date: 'Day 1', description: 'Jesus entered Jerusalem not as a warrior, but as a humble King. People laid palm branches and shouted with joy. They expected power, but He came with peace. The journey of love had begun.',                                                                                  verse: '"Hosanna! Blessed is He who comes in the name of the Lord." — Matthew 21:9' },
        { day: '🏛️ Monday',        date: 'Day 2', description: 'Jesus saw the temple filled with corruption. With authority, He cleared it. Worship is not about rituals — it is about a pure heart.',                                                                                                                                        verse: '"My house will be called a house of prayer." — Matthew 21:13' },
        { day: '📖 Tuesday',       date: 'Day 3', description: 'Jesus taught deeply — about truth, faith, and the future. Some hearts opened, others resisted. His words still echo today.',                                                                                                                                                   verse: '"Heaven and earth will pass away, but my words will never pass away." — Matthew 24:35' },
        { day: '🤫 Wednesday',     date: 'Day 4', description: 'A quiet day. No miracles. No crowds. But behind the silence, betrayal was growing. Even in silence, God is working.',                                                                                                                                                          verse: '"Be still, and know that I am God." — Psalm 46:10' },
        { day: '🍞 Thursday',      date: 'Day 5', description: 'Jesus shared His final meal. He washed feet, broke bread, and showed true love. In the garden, He prayed in pain — yet chose obedience.',                                                                                                                                     verse: '"This is my body given for you." — Luke 22:19' },
        { day: '✝️ Good Friday',   date: 'Day 6', description: "The darkest day. Jesus was beaten, mocked, and crucified. He carried our sins. When He said, 'It is finished,' love had won.",                                                                                                                                                verse: '"It is finished." — John 19:30' },
        { day: '🪨 Saturday',      date: 'Day 7', description: 'Silence. The tomb was sealed. Hope felt lost. But heaven was not finished. Something was coming.',                                                                                                                                                                             verse: '"The tomb was sealed." — Matthew 27:66' },
        { day: '🌅 Easter Sunday', date: 'Day 8', description: 'The stone rolled away. The grave was empty. Jesus is alive! Death was defeated. Hope is alive forever.',                                                                                                                                                                       verse: '"He is not here; He has risen." — Matthew 28:6' },
      ],
    },

    // Game
    game: {
      title: 'Easter',
      titleHighlight: 'Egg Hunt',
      subtitle: 'Collect eggs, avoid bombs, reach {min}+ to submit!',
      score: 'Score',
      level: 'Level',
      timeLeft: 'Time Left',
      multiplier: 'Multiplier',
      startGame: 'Start Game 🎮',
      reset: 'Reset 🔄',
      normalEgg: 'Normal Egg: +1',
      goldenEgg: 'Golden Egg: +5',
      bomb: 'Bomb: -5',
      rainbowEgg: 'Rainbow Egg: +10',
      freeze: 'Freeze: Stop eggs!',
      readyTitle: 'Ready to Hunt?',
      readyDesc: 'Click Start Game to begin!',
      meaning: 'Ancient people celebrated spring by decorating and hiding eggs, seeing them as symbols of new life, rebirth, and potential — like a baby bird hatching — and children played by finding these eggs, which later became part of Easter traditions.',
    },

    // Game Over
    gameOver: {
      title: 'Game Over!',
      finalScore: 'Final Score',
      normal: 'Normal',
      golden: 'Golden',
      bombs: 'Bombs',
      checking: 'Checking leaderboard…',
      qualified: '🎉 You ranked #{rank} — entering your details now…',
      notQualified: "Score didn't make the top 20 this time. Keep playing!",
      playAgain: 'Play Again',
      enterDetails: 'Enter Details 🏆',
    },

    // Score submission
    submit: {
      title: '🎉 You made the Top 20!',
      pts: 'pts',
      rank: '🏅 Rank #{rank} on the leaderboard!',
      claimSpot: 'Enter your details to claim your spot',
      nameLbl: '✍️ Your Name',
      namePlaceholder: 'Enter your full name',
      churchLbl: '⛪ Church Name',
      churchPlaceholder: 'Search or add your church…',
      noChurches: 'No churches saved yet',
      noMatch: 'No church matching "{q}"',
      addNew: 'Add new church',
      addNewNamed: 'Add "{name}" as new church',
      newChurchLabel: 'New church name:',
      newChurchPlaceholder: 'Type church name…',
      save: 'Save',
      saving: 'Saving…',
      submit: 'Submit to Leaderboard 🚀',
      submitting: 'Submitting…',
    },

    // Leaderboard
    leaderboard: {
      title: 'Leaderboard',
      subtitle: 'Top 20 Egg Hunt Champions',
      updated: 'Updated: {time}',
      noScores: 'No scores yet',
      noScoresDesc: 'Be the first to make it to the leaderboard!',
      refresh: '🔄 Refresh',
      rank: 'Rank',
      name: 'Name',
      church: 'Church',
      score: 'Score',
      date: 'Date',
      first: '1st 🏆',
      second: '2nd',
      third: '3rd',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      tryAgain: 'Try Again',
    },
  },

  // ── Nepali ──────────────────────────────────────────────────────────────────
  ne: {
    nav: {
      home: 'गृहपृष्ठ',
      timeline: 'समयरेखा',
      game: 'खेल',
      leaderboard: 'लिडरबोर्ड',
    },

    langPicker: {
      title: 'भाषा छान्नुहोस्',
      subtitle: 'जारी राख्न भाषा छान्नुहोस्',
      en: 'English',
      ne: 'नेपाली',
      confirm: 'जारी राख्नुहोस्',
    },

    home: {
      hero: 'Passion of the Week 2082',
      tagline: '🕊️ ईस्टर उत्सवको लागि आफ्नो मन तयार गर्नुहोस्। हाम्रो अण्डा खोज खेलमा सामेल हुनुहोस्!',
      startPlaying: 'खेल्न सुरु गर्नुहोस् 🎮',
      learnStory: 'कथा जान्नुहोस् 📖',
      adventureTitle: 'तपाईंको ईस्टर',
      adventureHighlight: 'साहसिक',
      adventureEnd: 'यात्रा',
      explore: 'अन्वेषण गर्नुहोस् →',
      ctaTitle: 'खोजको लागि तयार हुनुहोस्?',
      ctaDesc: 'आफ्नो सीप परीक्षण गर्नुहोस्, अण्डा सङ्कलन गर्नुहोस्, र लिडरबोर्डमा पुग्नुहोस्!',
      playNow: 'अहिले खेल्नुहोस् 🎯',
      features: [
        { title: 'ईस्टर समयरेखा',   description: 'पाम संडेदेखि ईस्टर संडेसम्म पवित्र सातामा यात्रा गर्नुहोस्' },
        { title: 'अण्डा खोज खेल',   description: 'अण्डा सङ्कलन गर्नुहोस्, बम बच्नुहोस्, र उच्च स्कोर बनाउनुहोस्!' },
        { title: 'लिडरबोर्ड',        description: 'अरूसँग प्रतिस्पर्धा गर्नुहोस् र शीर्ष स्कोर हेर्नुहोस्' },
      ],
    },

    timeline: {
      title: 'पवित्र साता',
      titleHighlight: 'यात्रा',
      subtitle: 'येशूका अन्तिम दिनहरूमा बिस्तारै हिँड्नुहोस् — हरेक क्षण, हरेक बलिदान, हरेक आशा महसुस गर्नुहोस्।',
      risen: 'उहाँ जीवित हुनुहुन्छ!',
      verse: '"उहाँ यहाँ हुनुहुन्न; उहाँ जीवित हुनुभयो।" — मत्ती २८:६',
   events: [
  {
    day: '🌿 पाम आइतबार | Palm Sunday',
    date: 'दिन १ | Day 1',
    description:
      'येशू गधामा चढेर यरूशलेम प्रवेश गर्नुभयो। भीडले ताडपत्र बिछ्याएर उहाँलाई स्वागत गर्‍यो र "होसन्ना" भन्दै प्रशंसा गर्‍यो।\n\nJesus entered Jerusalem riding on a donkey. The crowd spread palm branches and praised Him, shouting “Hosanna.”',
    verse:
      'मत्ती २१:८–९\nMatthew 21:8–9'
  },

  {
    day: '🏛️ सोमबार | Monday',
    date: 'दिन २ | Day 2',
    description:
      'येशू मन्दिरमा जानुभयो र त्यहाँ किनबेच गर्नेहरूलाई निकाल्नुभयो। उहाँले मन्दिरलाई प्रार्थनाको घर बनाउनु पर्ने कुरा बताउनुभयो।\n\nJesus went to the temple and drove out those buying and selling. He declared the temple should be a house of prayer.',
    verse:
      'मत्ती २१:१२–१३\nMatthew 21:12–13'
  },

  {
    day: '📖 मंगलबार | Tuesday',
    date: 'दिन ३ | Day 3',
    description:
      'येशूले मन्दिरमा शिक्षा दिनुभयो। उहाँले दृष्टान्तहरू बताउनुभयो र धर्मगुरुहरूका प्रश्नहरूको उत्तर दिनुभयो। उहाँले अन्त समयको विषयमा पनि शिक्षा दिनुभयो।\n\nJesus taught in the temple. He spoke in parables, answered the leaders, and taught about the end times.',
    verse:
      'मत्ती २१:२३; मत्ती २४:१–३\nMatthew 21:23; Matthew 24:1–3'
  },

  {
    day: '🤫 बुधबार | Wednesday',
    date: 'दिन ४ | Day 4',
    description:
      'यस दिनको घटनाबारे सुसमाचारमा स्पष्ट विवरण छैन। तर यही समयमा यहूदाले येशूलाई धोका दिन योजना बनायो।\n\nNo specific events are recorded in the Gospels. During this time, Judas planned to betray Jesus.',
    verse:
      'मत्ती २६:१४–१६\nMatthew 26:14–16'
  },

  {
    day: '🍞 बिहीबार | Thursday',
    date: 'दिन ५ | Day 5',
    description:
      'येशूले आफ्ना चेलाहरूसँग अन्तिम भोज गर्नुभयो। उहाँले रोटी र दाखमद्य दिनुभयो। त्यसपछि गेत्सेमाने बगैंचामा प्रार्थना गर्नुभयो र पछि पक्राउ पर्नुभयो।\n\nJesus shared the Last Supper with His disciples. He gave bread and wine. Later, He prayed in Gethsemane and was arrested.',
    verse:
      'लूका २२:१९–२०; मत्ती २६:३६\nLuke 22:19–20; Matthew 26:36'
  },

  {
    day: '✝️ गुड फ्राइडे | Good Friday',
    date: 'दिन ६ | Day 6',
    description:
      'येशूलाई न्यायको लागि लगियो, उहाँलाई कुटियो र क्रूसमा टाँगियो। उहाँ बिहान क्रूसमा टाँगिनुभयो र दिउँसो उहाँको मृत्यु भयो।\n\nJesus was tried, beaten, and crucified. He was nailed to the cross in the morning and died in the afternoon.',
    verse:
      'मत्ती २७:३५; मत्ती २७:५०\nMatthew 27:35; Matthew 27:50'
  },

  {
    day: '🪨 शनिबार | Saturday',
    date: 'दिन ७ | Day 7',
    description:
      'येशूको शरीर चिहानमा राखियो। चिहानमा ढुंगा लगाइयो र सैनिकहरूले सुरक्षा गरे।\n\nJesus’ body was placed in the tomb. A stone was rolled over it, and guards were set.',
    verse:
      'मत्ती २७:५९–६०; मत्ती २७:६६\nMatthew 27:59–60; Matthew 27:66'
  },

  {
    day: '🌅 ईस्टर आइतबार | Easter Sunday',
    date: 'दिन ८ | Day 8',
    description:
      'सप्ताहको पहिलो दिन बिहान चिहान खाली भेटियो। स्वर्गदूतले येशू जीवित हुनुभएको घोषणा गरे। येशू आफ्ना चेलाहरूलाई देखा पर्नुभयो।\n\nEarly on the first day of the week, the tomb was found empty. Angels declared that Jesus had risen. He appeared to His disciples.',
    verse:
      'मत्ती २८:५–६; लूका २४:६\nMatthew 28:5–6; Luke 24:6'
  }
]
    },

    game: {
      title: 'ईस्टर',
      titleHighlight: 'अण्डा खोज',
      subtitle: 'अण्डा सङ्कलन गर्नुहोस्, बम बच्नुहोस्, {min}+ पुग्नुहोस्!',
      score: 'स्कोर',
      level: 'स्तर',
      timeLeft: 'बाँकी समय',
      multiplier: 'गुणक',
      startGame: 'खेल सुरु गर्नुहोस् 🎮',
      reset: 'रिसेट 🔄',
      normalEgg: 'साधारण अण्डा: +१',
      goldenEgg: 'सुनौलो अण्डा: +५',
      bomb: 'बम: -५',
      rainbowEgg: 'इन्द्रेणी अण्डा: +१०',
      freeze: 'फ्रिज: अण्डा रोक्नुहोस्!',
      readyTitle: 'खोजको लागि तयार?',
      readyDesc: 'सुरु गर्न Start Game थिच्नुहोस्!',
      meaning: 'पुराना समयमा मानिसहरूले वसन्त ऋतुमा नयाँ जीवनको सुरुवातलाई मनाउन अण्डा सजाएर लुकाउने गर्थे। अण्डा पुनर्जन्म, आशा र नयाँ सुरुवातको प्रतीक मानिन्थ्यो — जस्तै एउटा सानो चरा अण्डाबाट बाहिर निस्केर नयाँ जीवन सुरु गर्छ। बालबालिकाहरूले यी अण्डाहरू खोज्ने खेल खेल्थे, जसले पछि ईस्टरको परम्परामा विशेष स्थान पायो। आज पनि अण्डा खोज्ने यो परम्परा नयाँ जीवन र पुनरुत्थानको सन्देश बोकेको छ।'
    },

    gameOver: {
      title: 'खेल सकियो!',
      finalScore: 'अन्तिम स्कोर',
      normal: 'साधारण',
      golden: 'सुनौलो',
      bombs: 'बम',
      checking: 'लिडरबोर्ड जाँच गर्दै…',
      qualified: '🎉 तपाईं #{rank} स्थानमा हुनुहुन्छ — विवरण भर्दै…',
      notQualified: 'यस पटक शीर्ष २० मा परिएन। खेल्दै रहनुहोस्!',
      playAgain: 'फेरि खेल्नुहोस्',
      enterDetails: 'विवरण भर्नुहोस् 🏆',
    },

    submit: {
      title: '🎉 तपाईं शीर्ष २० मा पर्नुभयो!',
      pts: 'अंक',
      rank: '🏅 लिडरबोर्डमा #{rank} स्थान!',
      claimSpot: 'आफ्नो स्थान दाबी गर्न विवरण भर्नुहोस्',
      nameLbl: '✍️ तपाईंको नाम',
      namePlaceholder: 'पूरा नाम लेख्नुहोस्',
      churchLbl: '⛪ चर्चको नाम',
      churchPlaceholder: 'आफ्नो चर्च खोज्नुहोस् वा थप्नुहोस्…',
      noChurches: 'अहिलेसम्म कुनै चर्च छैन',
      noMatch: '"{q}" सँग मिल्ने चर्च छैन',
      addNew: 'नयाँ चर्च थप्नुहोस्',
      addNewNamed: '"{name}" नयाँ चर्चको रूपमा थप्नुहोस्',
      newChurchLabel: 'नयाँ चर्चको नाम:',
      newChurchPlaceholder: 'चर्चको नाम लेख्नुहोस्…',
      save: 'सुरक्षित गर्नुहोस्',
      saving: 'सुरक्षित गर्दै…',
      submit: 'लिडरबोर्डमा पेश गर्नुहोस् 🚀',
      submitting: 'पेश गर्दै…',
    },

    leaderboard: {
      title: 'लिडरबोर्ड',
      subtitle: 'शीर्ष २० अण्डा खोज च्याम्पियन',
      updated: 'अपडेट: {time}',
      noScores: 'अहिलेसम्म कुनै स्कोर छैन',
      noScoresDesc: 'लिडरबोर्डमा पहिलो हुनुहोस्!',
      refresh: '🔄 रिफ्रेस',
      rank: 'स्थान',
      name: 'नाम',
      church: 'चर्च',
      score: 'स्कोर',
      date: 'मिति',
      first: '१st 🏆',
      second: '२nd',
      third: '३th',
    },

    common: {
      loading: 'लोड हुँदैछ...',
      error: 'केही गलत भयो',
      tryAgain: 'फेरि प्रयास गर्नुहोस्',
    },
  },
};

export default translations;
