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
      hero: 'Easter Journey',
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
      title: 'The',
      titleHighlight: 'Easter Story',
      subtitle: "Journey through Holy Week, from Jesus' triumphant entry to His glorious resurrection",
      risen: 'He Is Risen!',
      verse: '"He is not here; He has risen, just as He said." — Matthew 28:6',
      events: [
        { day: 'Palm Sunday',     date: 'Sunday before Easter',  description: 'Jesus enters Jerusalem as the people wave palm branches, shouting "Hosanna!"',          verse: 'Matthew 21:1-11' },
        { day: 'Maundy Thursday', date: 'Thursday before Easter', description: "The Last Supper — Jesus shares bread and wine, washing the disciples' feet.",            verse: 'John 13:1-17'   },
        { day: 'Good Friday',     date: 'Friday before Easter',   description: "Jesus is crucified on the cross, sacrificing Himself for humanity's sins.",              verse: 'John 19:17-30'  },
        { day: 'Holy Saturday',   date: 'Day before Easter',      description: 'A day of waiting and reflection as Jesus lies in the tomb.',                             verse: 'Luke 23:50-56'  },
        { day: 'Easter Sunday',   date: 'Resurrection Day',       description: 'The tomb is empty! Jesus rises from the dead, conquering death forever.',                verse: 'Matthew 28:1-10'},
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
      hero: 'ईस्टर यात्रा',
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
      title: '',
      titleHighlight: 'ईस्टरको कथा',
      subtitle: 'येशूको विजयी प्रवेशदेखि उहाँको गौरवशाली पुनरुत्थानसम्म पवित्र सातामा यात्रा गर्नुहोस्',
      risen: 'उहाँ जीवित हुनुहुन्छ!',
      verse: '"उहाँ यहाँ हुनुहुन्न; उहाँले भन्नुभएझैं उहाँ जीवित हुनुभयो।" — मत्ती २८:६',
      events: [
        { day: 'पाम संडे',       date: 'ईस्टरभन्दा अघिको आइतबार',  description: 'येशू यरूशलेममा प्रवेश गर्नुहुन्छ, मानिसहरूले ताडपत्र हल्लाउँदै "होसन्ना!" भन्छन्।',  verse: 'मत्ती २१:१-११' },
        { day: 'मौन्डी बिहीबार', date: 'ईस्टरभन्दा अघिको बिहीबार', description: 'अन्तिम भोज — येशूले रोटी र दाखरस बाँड्नुहुन्छ र चेलाहरूका खुट्टा धुनुहुन्छ।',          verse: 'यूहन्ना १३:१-१७' },
        { day: 'गुड फ्राइडे',    date: 'ईस्टरभन्दा अघिको शुक्रबार', description: 'येशूलाई क्रूसमा चढाइन्छ, उहाँले मानवजातिको पापको लागि आफूलाई बलिदान दिनुहुन्छ।',       verse: 'यूहन्ना १९:१७-३०' },
        { day: 'पवित्र शनिबार',  date: 'ईस्टरभन्दा अघिको दिन',      description: 'येशू चिहानमा हुनुहुँदा प्रतीक्षा र चिन्तनको दिन।',                                         verse: 'लूका २३:५०-५६' },
        { day: 'ईस्टर संडे',     date: 'पुनरुत्थान दिवस',            description: 'चिहान खाली छ! येशू मृत्युबाट जीवित हुनुहुन्छ, सदाको लागि मृत्युलाई जित्नुहुन्छ।',       verse: 'मत्ती २८:१-१०' },
      ],
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
      meaning: 'पुराना समयमा मानिसहरूले वसन्त ऋतु मनाउन अण्डा सजाएर लुकाउँथे, किनभने अण्डा नयाँ जीवन, पुनर्जन्म, र सम्भावनाको प्रतीक थियो — जस्तै बच्चा चरा अण्डाबाट फुट्छ — र बच्चाहरू यी अण्डा खोजेर खेल्थे, जुन पछि ईस्टर परम्पराको भाग बने।',
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
      first: '१म 🏆',
      second: '२य',
      third: '३य',
    },

    common: {
      loading: 'लोड हुँदैछ...',
      error: 'केही गलत भयो',
      tryAgain: 'फेरि प्रयास गर्नुहोस्',
    },
  },
};

export default translations;
