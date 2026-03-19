// ─────────────────────────────────────────────────────────────────────────────
// Easter Journey Game — Bible Verse System
// Offline verse library that mimics a real content API.
// Supports English (en) and Nepali (ne).
// ─────────────────────────────────────────────────────────────────────────────

// ── English ───────────────────────────────────────────────────────────────────
export const versesData = {
  easter: [
    "He is not here; He has risen! – Luke 24:6",
    "I am the resurrection and the life. Whoever believes in me will live. – John 11:25",
    "Death has been swallowed up in victory. – 1 Corinthians 15:54",
    "Why do you look for the living among the dead? He is not here; He has risen! – Luke 24:5-6",
    "He has risen, just as He said. Come and see the place where He lay. – Matthew 28:6",
    "Because I live, you also will live. – John 14:19",
    "The Lord has risen indeed! – Luke 24:34",
    "He was delivered over to death for our sins and raised to life for our justification. – Romans 4:25",
    "Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep. – 1 Corinthians 15:20",
    "If Christ has not been raised, your faith is futile. But He has been raised! – 1 Corinthians 15:17",
    "We were buried with Him through baptism into death, and raised to live a new life. – Romans 6:4",
    "The angel said: Do not be afraid, for I know you are looking for Jesus who was crucified. – Matthew 28:5",
    "He appeared to Peter, and then to the Twelve. – 1 Corinthians 15:5",
    "Blessed be the God who caused us to be born again to a living hope through the resurrection. – 1 Peter 1:3",
    "Jesus said: I am the Living One; I was dead, and now look, I am alive forever! – Revelation 1:18",
    "If the Spirit of Him who raised Jesus from the dead dwells in you, He will give life to your mortal bodies. – Romans 8:11",
    "He is risen! He is not here. See the place where they laid Him. – Mark 16:6",
    "Mary Magdalene went and announced: I have seen the Lord! – John 20:18",
    "Jesus met them and said: Greetings! They came and took hold of His feet and worshiped Him. – Matthew 28:9",
    "Jesus said to her: Mary. She turned and said: Rabboni! – John 20:16",
    "He showed them His hands and His side. The disciples were overjoyed when they saw the Lord. – John 20:20",
    "Thomas said: My Lord and my God! – John 20:28",
    "He presented Himself alive after His suffering by many proofs. – Acts 1:3",
    "God raised Him from the dead, freeing Him from the agony of death. – Acts 2:24",
    "This Jesus God raised up, and of that we all are witnesses. – Acts 2:32",
    "He is the living God, enduring forever; His kingdom shall never be destroyed. – Daniel 6:26",
    "The Lord is risen indeed, and has appeared to Simon! – Luke 24:34",
    "Jesus Christ is the same yesterday and today and forever. – Hebrews 13:8",
    "Worthy is the Lamb who was slain, to receive power and wealth and wisdom and strength! – Revelation 5:12",
    "He who raised Christ from the dead will also give life to your mortal bodies. – Romans 8:11",
  ],
  goodFriday: [
    "He was pierced for our transgressions; He was crushed for our iniquities. – Isaiah 53:5",
    "For God so loved the world that He gave His one and only Son. – John 3:16",
    "It is finished. – John 19:30",
    "Father, forgive them, for they do not know what they are doing. – Luke 23:34",
    "Greater love has no one than this: to lay down one's life for one's friends. – John 15:13",
    "He himself bore our sins in His body on the cross. – 1 Peter 2:24",
    "God demonstrates His own love for us: while we were still sinners, Christ died for us. – Romans 5:8",
    "He was oppressed and afflicted, yet He did not open His mouth. – Isaiah 53:7",
    "Surely He took up our pain and bore our suffering. – Isaiah 53:4",
    "By His wounds we are healed. – Isaiah 53:5",
    "Christ redeemed us from the curse of the law by becoming a curse for us. – Galatians 3:13",
    "He made Him who knew no sin to be sin for us. – 2 Corinthians 5:21",
    "The Son of Man came to give His life as a ransom for many. – Mark 10:45",
    "Jesus cried out: My God, my God, why have you forsaken me? – Matthew 27:46",
    "He was numbered with the transgressors; yet He bore the sin of many. – Isaiah 53:12",
    "We all, like sheep, have gone astray; the Lord has laid on Him the iniquity of us all. – Isaiah 53:6",
    "He humbled Himself by becoming obedient to death — even death on a cross! – Philippians 2:8",
    "Jesus said: Into your hands I commit my spirit. – Luke 23:46",
    "He was despised and rejected by mankind, a man of suffering. – Isaiah 53:3",
    "The curtain of the temple was torn in two from top to bottom. – Matthew 27:51",
    "For the joy set before Him He endured the cross, scorning its shame. – Hebrews 12:2",
    "He is the atoning sacrifice for our sins, and not only for ours but also for the whole world. – 1 John 2:2",
    "In Him we have redemption through His blood, the forgiveness of sins. – Ephesians 1:7",
    "Christ died for sins once for all, the righteous for the unrighteous, to bring you to God. – 1 Peter 3:18",
    "The punishment that brought us peace was on Him, and by His wounds we are healed. – Isaiah 53:5",
    "Jesus said: Woman, here is your son. Then to the disciple: Here is your mother. – John 19:26-27",
    "They will look on the one they have pierced, and they will mourn for Him. – Zechariah 12:10",
    "He poured out His life unto death, and was numbered with the transgressors. – Isaiah 53:12",
    "The blood of Jesus His Son purifies us from all sin. – 1 John 1:7",
    "He canceled the charge of our legal indebtedness, nailing it to the cross. – Colossians 2:14",
  ],
  palmSunday: [
    "Hosanna! Blessed is He who comes in the name of the Lord! – Mark 11:9",
    "Rejoice greatly, O daughter of Zion! Your king comes to you, gentle and riding on a donkey. – Zechariah 9:9",
    "The crowds spread their cloaks on the road, and others cut branches from the trees. – Matthew 21:8",
    "Blessed is the king who comes in the name of the Lord! Peace in heaven and glory in the highest! – Luke 19:38",
    "Hosanna to the Son of David! Blessed is He who comes in the name of the Lord! – Matthew 21:9",
    "The whole crowd of disciples began joyfully to praise God in loud voices. – Luke 19:37",
    "See, your king comes to you, righteous and victorious, lowly and riding on a donkey. – Zechariah 9:9",
    "They took palm branches and went out to meet Him, shouting: Hosanna! – John 12:13",
    "Blessed is the coming kingdom of our father David! Hosanna in the highest heaven! – Mark 11:10",
    "Jesus entered Jerusalem and went into the temple courts. – Mark 11:11",
    "The stone the builders rejected has become the cornerstone. – Psalm 118:22",
    "This is the day the Lord has made; let us rejoice and be glad in it. – Psalm 118:24",
    "Open for me the gates of the righteous; I will enter and give thanks to the Lord. – Psalm 118:19",
    "Blessed is He who comes in the name of the Lord. From the house of the Lord we bless you. – Psalm 118:26",
    "The Lord is God, and He has made His light shine on us. – Psalm 118:27",
    "I tell you, if they keep quiet, the stones will cry out. – Luke 19:40",
    "Jesus found a young donkey and sat on it, as it is written: Do not be afraid, Daughter Zion. – John 12:14-15",
    "Many people spread their cloaks on the road, while others spread branches cut in the fields. – Mark 11:8",
    "The crowds that went ahead of Him and those that followed shouted: Hosanna to the Son of David! – Matthew 21:9",
    "When Jesus entered Jerusalem, the whole city was stirred and asked: Who is this? – Matthew 21:10",
    "The crowds answered: This is Jesus, the prophet from Nazareth in Galilee. – Matthew 21:11",
    "His disciples did not understand all this at first. Only after Jesus was glorified did they realize. – John 12:16",
    "Whoever serves Me must follow Me; and where I am, My servant also will be. – John 12:26",
    "And I, when I am lifted up from the earth, will draw all people to myself. – John 12:32",
    "Walk while you have the light, before darkness overtakes you. – John 12:35",
    "Put your trust in the light while you have it, so that you may become children of light. – John 12:36",
    "Blessed is the King of Israel! – John 12:13",
    "Now is the time for judgment on this world; now the prince of this world will be driven out. – John 12:31",
    "Even so, many among the leaders believed in Him. – John 12:42",
    "The Lord is God, and He has made His light shine on us. Bind the festal sacrifice with cords. – Psalm 118:27",
  ],
  general: [
    "For I know the plans I have for you, plans to prosper you and not to harm you. – Jeremiah 29:11",
    "I can do all things through Christ who strengthens me. – Philippians 4:13",
    "The Lord is my shepherd; I shall not want. – Psalm 23:1",
    "Trust in the Lord with all your heart and lean not on your own understanding. – Proverbs 3:5",
    "Be strong and courageous. Do not be afraid; do not be discouraged. – Joshua 1:9",
    "The Lord your God is with you, the Mighty Warrior who saves. – Zephaniah 3:17",
    "Come to me, all you who are weary and burdened, and I will give you rest. – Matthew 11:28",
    "For God has not given us a spirit of fear, but of power and love and a sound mind. – 2 Timothy 1:7",
    "Cast all your anxiety on Him because He cares for you. – 1 Peter 5:7",
    "The Lord is my light and my salvation — whom shall I fear? – Psalm 27:1",
    "Be still, and know that I am God. – Psalm 46:10",
    "Your word is a lamp for my feet, a light on my path. – Psalm 119:105",
    "Delight yourself in the Lord, and He will give you the desires of your heart. – Psalm 37:4",
    "The name of the Lord is a fortified tower; the righteous run to it and are safe. – Proverbs 18:10",
    "He gives strength to the weary and increases the power of the weak. – Isaiah 40:29",
    "Those who hope in the Lord will renew their strength. They will soar on wings like eagles. – Isaiah 40:31",
    "Do not be anxious about anything, but in every situation, by prayer, present your requests to God. – Philippians 4:6",
    "The peace of God, which transcends all understanding, will guard your hearts and minds. – Philippians 4:7",
    "Love is patient, love is kind. It does not envy, it does not boast. – 1 Corinthians 13:4",
    "For it is by grace you have been saved, through faith — and this is not from yourselves. – Ephesians 2:8",
    "In all things God works for the good of those who love Him. – Romans 8:28",
    "Nothing can separate us from the love of God that is in Christ Jesus our Lord. – Romans 8:39",
    "The Lord bless you and keep you; the Lord make His face shine on you. – Numbers 6:24-25",
    "Seek first His kingdom and His righteousness, and all these things will be given to you. – Matthew 6:33",
    "Ask and it will be given to you; seek and you will find; knock and the door will be opened. – Matthew 7:7",
    "I am the way and the truth and the life. No one comes to the Father except through me. – John 14:6",
    "The Lord is close to the brokenhearted and saves those who are crushed in spirit. – Psalm 34:18",
    "Create in me a pure heart, O God, and renew a steadfast spirit within me. – Psalm 51:10",
    "This is the day the Lord has made; let us rejoice and be glad in it. – Psalm 118:24",
    "Give thanks to the Lord, for He is good; His love endures forever. – Psalm 107:1",
  ],
  gameMotivation: [
    "Run in such a way as to get the prize. – 1 Corinthians 9:24",
    "I press on toward the goal to win the prize for which God has called me. – Philippians 3:14",
    "Let us run with perseverance the race marked out for us. – Hebrews 12:1",
    "Be strong in the Lord and in His mighty power. – Ephesians 6:10",
    "The one who stands firm to the end will be saved. – Matthew 24:13",
    "Do not grow weary in doing good, for at the proper time we will reap a harvest. – Galatians 6:9",
    "Whatever you do, work at it with all your heart, as working for the Lord. – Colossians 3:23",
    "I can do all things through Christ who strengthens me. – Philippians 4:13",
    "Be strong and courageous. Do not be afraid; do not be discouraged. – Joshua 1:9",
    "The Lord your God is with you wherever you go. – Joshua 1:9",
    "Fight the good fight of the faith. – 1 Timothy 6:12",
    "No discipline seems pleasant at the time, but painful. Later on, it produces a harvest of righteousness. – Hebrews 12:11",
    "Everyone who competes in the games goes into strict training. They do it to get a crown that will not last. – 1 Corinthians 9:25",
    "Have I not commanded you? Be strong and courageous! – Joshua 1:9",
    "The Lord gives strength to His people; the Lord blesses His people with peace. – Psalm 29:11",
    "With God all things are possible. – Matthew 19:26",
    "For nothing will be impossible with God. – Luke 1:37",
    "Do not be overcome by evil, but overcome evil with good. – Romans 12:21",
    "He who began a good work in you will carry it on to completion. – Philippians 1:6",
    "Commit to the Lord whatever you do, and He will establish your plans. – Proverbs 16:3",
    "The Lord is my strength and my shield; my heart trusts in Him, and He helps me. – Psalm 28:7",
    "Wait for the Lord; be strong and take heart and wait for the Lord. – Psalm 27:14",
    "You were running a good race. Who cut in on you? – Galatians 5:7",
    "Blessed is the one who perseveres under trial. – James 1:12",
    "Consider it pure joy whenever you face trials of many kinds, for the testing of your faith produces perseverance. – James 1:2-3",
    "The race is not to the swift or the battle to the strong. – Ecclesiastes 9:11",
    "Let your light shine before others, that they may see your good deeds. – Matthew 5:16",
    "Do not merely listen to the word, and so deceive yourselves. Do what it says. – James 1:22",
    "Be watchful, stand firm in the faith, act like men, be strong. – 1 Corinthians 16:13",
    "The Lord will fight for you; you need only to be still. – Exodus 14:14",
  ],
};

// ── Nepali ────────────────────────────────────────────────────────────────────
export const versesDataNe = {
  easter: [
    "उहाँ यहाँ हुनुहुन्न; उहाँ जीवित हुनुभयो! – लूका २४:६",
    "म पुनरुत्थान र जीवन हुँ। जो मलाई विश्वास गर्छ, ऊ बाँच्नेछ। – यूहन्ना ११:२५",
    "मृत्युलाई जितले निल्यो। – १ कोरिन्थी १५:५४",
    "तिमीहरू किन जीवितलाई मृतकहरूमाझ खोज्छौ? उहाँ यहाँ हुनुहुन्न; उहाँ जीवित हुनुभयो! – लूका २४:५-६",
    "उहाँले भन्नुभएझैं उहाँ जीवित हुनुभयो। आउ, जहाँ उहाँ राखिएको थियो त्यो ठाउँ हेर। – मत्ती २८:६",
    "म बाँचेकोले तिमीहरू पनि बाँच्नेछौ। – यूहन्ना १४:१९",
    "प्रभु साँच्चै जीवित हुनुभयो! – लूका २४:३४",
    "उहाँ हाम्रा पापका निम्ति मृत्युमा सुम्पिनुभयो र हाम्रो धर्मीकरणका निम्ति जीवित हुनुभयो। – रोमी ४:२५",
    "ख्रीष्ट साँच्चै मृतकहरूबाट जीवित हुनुभयो, निदाएकाहरूको पहिलो फल। – १ कोरिन्थी १५:२०",
    "यदि ख्रीष्ट जीवित हुनुभएन भने तिम्रो विश्वास व्यर्थ छ। तर उहाँ जीवित हुनुभयो! – १ कोरिन्थी १५:१७",
    "हामी बप्तिस्माद्वारा उहाँसँगै मृत्युमा गाडियौं र नयाँ जीवनमा जीवित भयौं। – रोमी ६:४",
    "स्वर्गदूतले भन्यो: नडराऊ, म जान्दछु तिमीहरू क्रूसमा चढाइएका येशूलाई खोज्दैछौ। – मत्ती २८:५",
    "उहाँ पत्रुसलाई, त्यसपछि बाह्र जनालाई देखा पर्नुभयो। – १ कोरिन्थी १५:५",
    "परमेश्वरलाई धन्य होस् जसले हामीलाई पुनरुत्थानद्वारा जीवित आशामा जन्माउनुभयो। – १ पत्रुस १:३",
    "येशूले भन्नुभयो: म जीवित छु; म मरेको थिएँ, र हेर, म सदासर्वदा जीवित छु! – प्रकाश १:१८",
    "जसले येशूलाई मृतकबाट जीवित गर्नुभयो उहाँको आत्मा तिमीमा बस्छ भने उहाँले तिम्रो नश्वर शरीरलाई पनि जीवन दिनुहुनेछ। – रोमी ८:११",
    "उहाँ जीवित हुनुभयो! उहाँ यहाँ हुनुहुन्न। जहाँ उहाँलाई राखिएको थियो त्यो ठाउँ हेर। – मर्कूस १६:६",
    "मरियम मग्दलिनीले गएर घोषणा गरिन्: मैले प्रभुलाई देखेँ! – यूहन्ना २०:१८",
    "येशूले भेट्नुभयो र भन्नुभयो: नमस्ते! तिनीहरूले उहाँका खुट्टा समाती दण्डवत् गरे। – मत्ती २८:९",
    "येशूले उनलाई भन्नुभयो: मरियम। उनी फर्किएर भनिन्: रब्बोनी! – यूहन्ना २०:१६",
    "उहाँले आफ्ना हात र छेउ देखाउनुभयो। चेलाहरू प्रभुलाई देखेर आनन्दित भए। – यूहन्ना २०:२०",
    "थोमाले भन्यो: मेरो प्रभु र मेरो परमेश्वर! – यूहन्ना २०:२८",
    "उहाँले आफ्नो दुःखभोगपछि धेरै प्रमाणहरूद्वारा आफूलाई जीवित देखाउनुभयो। – प्रेरित १:३",
    "परमेश्वरले उहाँलाई मृत्युको पीडाबाट मुक्त गरी जीवित गर्नुभयो। – प्रेरित २:२४",
    "यही येशूलाई परमेश्वरले जीवित गर्नुभयो, र हामी सबै यसका साक्षी छौं। – प्रेरित २:३२",
    "उहाँ जीवित परमेश्वर हुनुहुन्छ, सदाको लागि; उहाँको राज्य कहिल्यै नष्ट हुनेछैन। – दानियल ६:२६",
    "प्रभु साँच्चै जीवित हुनुभयो र शिमोनलाई देखा पर्नुभयो! – लूका २४:३४",
    "येशू ख्रीष्ट हिजो, आज र सदासर्वदा उही हुनुहुन्छ। – हिब्रू १३:८",
    "वध गरिएको मेमनाले शक्ति, धन, ज्ञान र बल पाउन योग्य हुनुहुन्छ! – प्रकाश ५:१२",
    "जसले ख्रीष्टलाई जीवित गर्नुभयो उहाँले तिम्रो नश्वर शरीरलाई पनि जीवन दिनुहुनेछ। – रोमी ८:११",
  ],
  goodFriday: [
    "उहाँ हाम्रा अपराधका निम्ति घाइते हुनुभयो; हाम्रा अधर्मका निम्ति कुचल्नुभयो। – यशैया ५३:५",
    "परमेश्वरले संसारलाई यति माया गर्नुभयो कि आफ्नो एकमात्र पुत्र दिनुभयो। – यूहन्ना ३:१६",
    "पूरा भयो। – यूहन्ना १९:३०",
    "हे पिता, यिनीहरूलाई माफ गर्नुहोस्, किनकि यिनीहरूलाई थाहा छैन यिनीहरूले के गर्दैछन्। – लूका २३:३४",
    "आफ्ना साथीहरूका निम्ति ज्यान दिनुभन्दा ठूलो माया कसैको छैन। – यूहन्ना १५:१३",
    "उहाँले आफैं हाम्रा पापहरू आफ्नो शरीरमा क्रूसमा बोक्नुभयो। – १ पत्रुस २:२४",
    "परमेश्वरले आफ्नो प्रेम यसरी देखाउनुभयो: हामी पापी छँदै ख्रीष्ट हाम्रा निम्ति मर्नुभयो। – रोमी ५:८",
    "उहाँलाई सताइयो र पीडा दिइयो, तर उहाँले मुख खोल्नुभएन। – यशैया ५३:७",
    "उहाँले हाम्रो दुःख बोक्नुभयो र हाम्रो पीडा सहनुभयो। – यशैया ५३:४",
    "उहाँका घाउहरूले हामी निको भयौं। – यशैया ५३:५",
    "ख्रीष्टले हामीलाई श्रापबाट छुटकारा दिनुभयो, आफैं हाम्रो निम्ति श्राप बन्नुभएर। – गलाती ३:१३",
    "परमेश्वरले जो पापलाई चिन्नुहुन्नथ्यो उहाँलाई हाम्रो निम्ति पाप बनाउनुभयो। – २ कोरिन्थी ५:२१",
    "मानवपुत्र धेरैको निम्ति आफ्नो ज्यान फिरौतीको रूपमा दिन आउनुभयो। – मर्कूस १०:४५",
    "येशूले चिच्याउनुभयो: हे मेरो परमेश्वर, हे मेरो परमेश्वर, किन मलाई त्यागिदिनुभयो? – मत्ती २७:४६",
    "उहाँ अपराधीहरूमा गनिनुभयो; तर उहाँले धेरैको पाप बोक्नुभयो। – यशैया ५३:१२",
    "हामी सबै भेडाझैं भड्किएका थियौं; प्रभुले हामी सबैको अधर्म उहाँमाथि थोपर्नुभयो। – यशैया ५३:६",
    "उहाँले आफूलाई नम्र बनाउनुभयो, मृत्युसम्म, क्रूसको मृत्युसम्म आज्ञाकारी हुनुभयो! – फिलिप्पी २:८",
    "येशूले भन्नुभयो: हे पिता, म आफ्नो आत्मा तपाईंको हातमा सुम्पन्छु। – लूका २३:४६",
    "उहाँ तिरस्कृत र मानिसहरूद्वारा अस्वीकृत हुनुभयो, दुःखको मानिस। – यशैया ५३:३",
    "मन्दिरको पर्दा माथिदेखि तलसम्म दुई टुक्रा भयो। – मत्ती २७:५१",
    "उहाँले आफ्नो अगाडि राखिएको आनन्दका निम्ति क्रूस सहनुभयो। – हिब्रू १२:२",
    "उहाँ हाम्रा पापको प्रायश्चित्त हुनुहुन्छ, र केवल हाम्रो मात्र होइन, सारा संसारको पनि। – १ यूहन्ना २:२",
    "उहाँमा हामीलाई उहाँको रगतद्वारा छुटकारा, पापको क्षमा छ। – एफिसी १:७",
    "ख्रीष्ट एकपटक पापका निम्ति मर्नुभयो, धर्मीले अधर्मीका निम्ति, हामीलाई परमेश्वरकहाँ ल्याउन। – १ पत्रुस ३:१८",
    "हाम्रो शान्तिको दण्ड उहाँमाथि थियो, र उहाँका घाउहरूले हामी निको भयौं। – यशैया ५३:५",
    "येशूले भन्नुभयो: हे नारी, यो तिम्रो छोरो हो। त्यसपछि चेलालाई: यो तिम्री आमा हो। – यूहन्ना १९:२६-२७",
    "तिनीहरूले जसलाई बिँधेका थिए उसलाई हेर्नेछन् र उसका निम्ति विलाप गर्नेछन्। – जकरिया १२:१०",
    "उहाँले आफ्नो ज्यान मृत्युसम्म खन्याउनुभयो र अपराधीहरूमा गनिनुभयो। – यशैया ५३:१२",
    "येशूको पुत्रको रगतले हामीलाई सबै पापबाट शुद्ध पार्छ। – १ यूहन्ना १:७",
    "उहाँले हाम्रो विरुद्धको ऋणपत्र क्रूसमा ठोकेर मेटाउनुभयो। – कलस्सी २:१४",
  ],
  palmSunday: [
    "होसन्ना! धन्य छ उहाँ जो प्रभुको नाममा आउनुहुन्छ! – मर्कूस ११:९",
    "हे सियोनकी छोरी, अत्यन्त आनन्दित हो! तिम्रो राजा तिम्रो छेउमा आउँदैछन्, नम्र र गधामा चढेर। – जकरिया ९:९",
    "भीडले बाटोमा आफ्ना लुगाहरू ओछ्याए, अरूले रूखका हाँगाहरू काटे। – मत्ती २१:८",
    "धन्य छ उहाँ राजा जो प्रभुको नाममा आउनुहुन्छ! स्वर्गमा शान्ति र उच्चमा महिमा! – लूका १९:३८",
    "होसन्ना दाऊदका सन्तानलाई! धन्य छ उहाँ जो प्रभुको नाममा आउनुहुन्छ! – मत्ती २१:९",
    "चेलाहरूको सारा भीड आनन्दले ठूलो स्वरले परमेश्वरको स्तुति गर्न थाले। – लूका १९:३७",
    "हेर, तिम्रो राजा तिम्रो छेउमा आउँदैछन्, धर्मी र विजयी, नम्र र गधामा चढेर। – जकरिया ९:९",
    "तिनीहरूले ताडपत्रका हाँगाहरू लिएर उहाँलाई भेट्न निस्के, होसन्ना भन्दै। – यूहन्ना १२:१३",
    "धन्य छ हाम्रा पिता दाऊदको आउने राज्य! उच्चमा होसन्ना! – मर्कूस ११:१०",
    "येशू यरूशलेममा प्रवेश गर्नुभयो र मन्दिरमा जानुभयो। – मर्कूस ११:११",
    "निर्माताहरूले अस्वीकार गरेको ढुङ्गा कुनाको मुख्य ढुङ्गा भयो। – भजन ११८:२२",
    "यो दिन प्रभुले बनाउनुभएको हो; हामी आनन्दित र खुसी होऔं। – भजन ११८:२४",
    "मेरो निम्ति धर्मीहरूका ढोकाहरू खोल; म भित्र पसेर प्रभुलाई धन्यवाद दिनेछु। – भजन ११८:१९",
    "धन्य छ उहाँ जो प्रभुको नाममा आउनुहुन्छ। प्रभुको घरबाट हामी तिमीलाई आशिष दिन्छौं। – भजन ११८:२६",
    "प्रभु परमेश्वर हुनुहुन्छ, र उहाँले आफ्नो ज्योति हाम्रोमाथि चम्काउनुभयो। – भजन ११८:२७",
    "म तिमीहरूलाई भन्छु, यदि यिनीहरू चुप लागे भने ढुङ्गाहरूले चिच्याउनेछन्। – लूका १९:४०",
    "येशूले एउटा सानो गधा पाउनुभयो र त्यसमा चढ्नुभयो, जसरी लेखिएको छ: हे सियोनकी छोरी, नडरा। – यूहन्ना १२:१४-१५",
    "धेरैले बाटोमा आफ्ना लुगाहरू ओछ्याए, अरूले खेतबाट काटेका हाँगाहरू। – मर्कूस ११:८",
    "अगाडि र पछाडि गएका भीडले चिच्याए: होसन्ना दाऊदका सन्तानलाई! – मत्ती २१:९",
    "येशू यरूशलेममा प्रवेश गर्दा सारा शहर हल्लियो र सोध्यो: यो को हुन्? – मत्ती २१:१०",
    "भीडले जवाफ दियो: यो गलीलको नासरतका अगमवक्ता येशू हुन्। – मत्ती २१:११",
    "चेलाहरूले पहिले यो बुझेनन्। येशू महिमान्वित भएपछि मात्र तिनीहरूले बुझे। – यूहन्ना १२:१६",
    "जो मेरो सेवा गर्छ उसले मलाई पछ्याउनुपर्छ; म जहाँ छु, मेरो सेवक पनि त्यहीँ हुनेछ। – यूहन्ना १२:२६",
    "म जब पृथ्वीबाट माथि उठाइनेछु, सबैलाई आफूतिर तान्नेछु। – यूहन्ना १२:३२",
    "ज्योति छँदासम्म हिँड, नत्र अँध्यारोले तिमीलाई समाउनेछ। – यूहन्ना १२:३५",
    "ज्योति छँदासम्म ज्योतिमा विश्वास गर, ताकि तिमीहरू ज्योतिका सन्तान बन। – यूहन्ना १२:३६",
    "धन्य छ इस्राएलको राजा! – यूहन्ना १२:१३",
    "अहिले यस संसारको न्याय हुन्छ; अहिले यस संसारको हाकिम निकालिनेछ। – यूहन्ना १२:३१",
    "तैपनि नेताहरूमध्ये धेरैले उहाँमा विश्वास गरे। – यूहन्ना १२:४२",
    "प्रभु परमेश्वर हुनुहुन्छ, उहाँले आफ्नो ज्योति हाम्रोमाथि चम्काउनुभयो। – भजन ११८:२७",
  ],
  general: [
    "म तिमीहरूका निम्ति के योजना गरेको छु त्यो म जान्दछु, तिमीहरूको भलाइका योजना। – यर्मिया २९:११",
    "मलाई बलियो बनाउने ख्रीष्टद्वारा म सबै कुरा गर्न सक्छु। – फिलिप्पी ४:१३",
    "प्रभु मेरो गोठाला हुनुहुन्छ; मलाई कुनै कुराको अभाव हुनेछैन। – भजन २३:१",
    "आफ्नो सम्पूर्ण मनले प्रभुमा भर गर र आफ्नै बुद्धिमा भर नपर। – हितोपदेश ३:५",
    "बलियो र साहसी हो। नडरा; निरुत्साहित नहो। – यहोशू १:९",
    "तिम्रो परमेश्वर प्रभु तिम्रो साथमा हुनुहुन्छ, उद्धार गर्ने शक्तिशाली योद्धा। – सपन्या ३:१७",
    "हे थाकेका र बोझिएका सबै, मेरो छेउमा आऊ, म तिमीहरूलाई विश्राम दिनेछु। – मत्ती ११:२८",
    "परमेश्वरले हामीलाई डरको आत्मा दिनुभएको छैन, तर शक्ति, प्रेम र सुस्थिर मनको। – २ तिमोथी १:७",
    "आफ्नो सबै चिन्ता उहाँमाथि थोपर, किनकि उहाँले तिम्रो ख्याल राख्नुहुन्छ। – १ पत्रुस ५:७",
    "प्रभु मेरो ज्योति र मेरो उद्धार हुनुहुन्छ — म कसबाट डराउँ? – भजन २७:१",
    "शान्त हो र जान कि म परमेश्वर हुँ। – भजन ४६:१०",
    "तिम्रो वचन मेरो खुट्टाका निम्ति बत्ती र मेरो बाटोका निम्ति ज्योति हो। – भजन ११९:१०५",
    "प्रभुमा आनन्दित हो, र उहाँले तिम्रो मनको इच्छाहरू पूरा गर्नुहुनेछ। – भजन ३७:४",
    "प्रभुको नाम बलियो गढ हो; धर्मी त्यसमा दौडन्छ र सुरक्षित हुन्छ। – हितोपदेश १८:१०",
    "उहाँले थाकेकालाई शक्ति दिनुहुन्छ र निर्बललाई बल बढाउनुहुन्छ। – यशैया ४०:२९",
    "प्रभुमा आशा राख्नेहरूले नयाँ शक्ति पाउनेछन्। तिनीहरू गरुडझैं उड्नेछन्। – यशैया ४०:३१",
    "कुनै पनि कुराको चिन्ता नगर, तर हरेक परिस्थितिमा प्रार्थनाद्वारा आफ्ना बिन्तीहरू परमेश्वरसमक्ष राख। – फिलिप्पी ४:६",
    "परमेश्वरको शान्ति जो सबै बुझाइभन्दा माथि छ, तिम्रो हृदय र मनलाई रक्षा गर्नेछ। – फिलिप्पी ४:७",
    "प्रेम धैर्यशील छ, प्रेम दयालु छ। यसले इर्ष्या गर्दैन, घमण्ड गर्दैन। – १ कोरिन्थी १३:४",
    "अनुग्रहले नै विश्वासद्वारा तिमीहरू उद्धार पाएका छौ — यो तिमीहरूबाट होइन। – एफिसी २:८",
    "परमेश्वरलाई प्रेम गर्नेहरूका निम्ति सबै कुरा भलाइका निम्ति काम गर्छ। – रोमी ८:२८",
    "कुनै पनि कुराले हामीलाई ख्रीष्ट येशूमा परमेश्वरको प्रेमबाट अलग गर्न सक्दैन। – रोमी ८:३९",
    "प्रभुले तिमीलाई आशिष दिऊन् र तिमीलाई रक्षा गरून्; प्रभुले आफ्नो अनुहार तिमीमाथि चम्काऊन्। – गन्ती ६:२४-२५",
    "पहिले उहाँको राज्य र उहाँको धार्मिकता खोज, र यी सबै कुराहरू तिमीलाई थपिनेछन्। – मत्ती ६:३३",
    "माग र तिमीलाई दिइनेछ; खोज र तिमीले पाउनेछौ; ढक र तिम्रो निम्ति खोलिनेछ। – मत्ती ७:७",
    "म बाटो, सत्य र जीवन हुँ। मेरो द्वारा बाहेक कोही पिताकहाँ आउँदैन। – यूहन्ना १४:६",
    "प्रभु टुटेको मुटु भएकाहरूको नजिक हुनुहुन्छ र कुचलिएका आत्माहरूलाई उद्धार गर्नुहुन्छ। – भजन ३४:१८",
    "हे परमेश्वर, मेरो निम्ति शुद्ध मुटु सिर्जना गर र मभित्र दृढ आत्मा नवीकरण गर। – भजन ५१:१०",
    "यो दिन प्रभुले बनाउनुभएको हो; हामी आनन्दित र खुसी होऔं। – भजन ११८:२४",
    "प्रभुलाई धन्यवाद दिऊ, किनकि उहाँ भलो हुनुहुन्छ; उहाँको प्रेम सदाको लागि छ। – भजन १०७:१",
  ],
  gameMotivation: [
    "पुरस्कार पाउने गरी दौड। – १ कोरिन्थी ९:२४",
    "म लक्ष्यतर्फ अगाडि बढ्छु, परमेश्वरले बोलाउनुभएको पुरस्कारका निम्ति। – फिलिप्पी ३:१४",
    "हाम्रो निम्ति तोकिएको दौडमा धैर्यका साथ दौडौं। – हिब्रू १२:१",
    "प्रभुमा र उहाँको शक्तिशाली बलमा बलियो हो। – एफिसी ६:१०",
    "जो अन्तसम्म दृढ रहन्छ, ऊ उद्धार पाउनेछ। – मत्ती २४:१३",
    "भलो काम गर्दा थाक्नु हुँदैन, किनकि उचित समयमा हामी फसल काट्नेछौं। – गलाती ६:९",
    "जे गर्छौ, प्रभुका निम्ति गर्छौ भनेर सम्पूर्ण मनले गर। – कलस्सी ३:२३",
    "मलाई बलियो बनाउने ख्रीष्टद्वारा म सबै कुरा गर्न सक्छु। – फिलिप्पी ४:१३",
    "बलियो र साहसी हो। नडरा; निरुत्साहित नहो। – यहोशू १:९",
    "तिम्रो परमेश्वर प्रभु तिमी जहाँ जान्छौ त्यहाँ तिम्रो साथमा हुनुहुन्छ। – यहोशू १:९",
    "विश्वासको राम्रो लडाइँ लड। – १ तिमोथी ६:१२",
    "हाल अनुशासन आनन्ददायक होइन, दुःखदायक छ। तर पछि यसले धार्मिकताको फसल दिन्छ। – हिब्रू १२:११",
    "खेलमा भाग लिने सबैले कडा अभ्यास गर्छन्। तिनीहरू नाश हुने मुकुटका निम्ति गर्छन्। – १ कोरिन्थी ९:२५",
    "के मैले तिमीलाई आज्ञा गरेको छैन? बलियो र साहसी हो! – यहोशू १:९",
    "प्रभुले आफ्नो जनलाई शक्ति दिनुहुन्छ; प्रभुले आफ्नो जनलाई शान्तिको आशिष दिनुहुन्छ। – भजन २९:११",
    "परमेश्वरसँग सबै कुरा सम्भव छ। – मत्ती १९:२६",
    "परमेश्वरसँग कुनै पनि कुरा असम्भव छैन। – लूका १:३७",
    "दुष्टताले नजितिऊ, तर भलाइले दुष्टतालाई जित। – रोमी १२:२१",
    "जसले तिमीमा राम्रो काम सुरु गर्नुभयो उहाँले त्यसलाई पूरा गर्नुहुनेछ। – फिलिप्पी १:६",
    "जे गर्छौ प्रभुलाई सुम्प, र उहाँले तिम्रा योजनाहरू स्थापित गर्नुहुनेछ। – हितोपदेश १६:३",
    "प्रभु मेरो शक्ति र मेरो ढाल हुनुहुन्छ; मेरो मनले उहाँमा भर गर्छ र उहाँले मलाई सहायता गर्नुहुन्छ। – भजन २८:७",
    "प्रभुको प्रतीक्षा गर; बलियो हो र साहसी हो र प्रभुको प्रतीक्षा गर। – भजन २७:१४",
    "तिमी राम्रो दौड दौडिरहेका थियौ। कसले तिमीलाई रोक्यो? – गलाती ५:७",
    "जो परीक्षामा दृढ रहन्छ, ऊ धन्य छ। – याकूब १:१२",
    "जब तिमीहरू विभिन्न परीक्षाहरूमा पर्छौ, त्यसलाई सम्पूर्ण आनन्दको विषय ठान, किनकि विश्वासको परीक्षाले धैर्य उत्पन्न गर्छ। – याकूब १:२-३",
    "दौड छिटो दौड्नेको निम्ति होइन, न युद्ध बलवानको निम्ति। – उपदेशक ९:११",
    "आफ्नो ज्योति मानिसहरूको अगाडि चम्काऊ, ताकि तिनीहरूले तिम्रा राम्रा कामहरू देखून्। – मत्ती ५:१६",
    "वचनका सुन्नेमात्र नहो, आफूलाई धोका दिँदै, तर गर्नेहरू हो। – याकूब १:२२",
    "सतर्क हो, विश्वासमा दृढ रहो, पुरुषझैं काम गर, बलियो हो। – १ कोरिन्थी १६:१३",
    "प्रभुले तिम्रो निम्ति लड्नुहुनेछ; तिमीले केवल शान्त रहनु छ। – प्रस्थान १४:१४",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper Utilities
// ─────────────────────────────────────────────────────────────────────────────

const getPool = (category, lang) => {
  const data = lang === 'ne' ? versesDataNe : versesData;
  return data[category] ?? (lang === 'ne' ? versesDataNe.general : versesData.general);
};

/**
 * Returns a random verse from the given category.
 * @param {string} category
 * @param {string} [lang='en']
 * @returns {string}
 */
export const getRandomVerse = (category, lang = 'en') => {
  const pool = getPool(category, lang);
  return pool[Math.floor(Math.random() * pool.length)];
};

/**
 * Returns a consistent verse for the current calendar day (same all day).
 * @param {string} [lang='en']
 * @returns {string}
 */
export const getDailyVerse = (lang = 'en') => {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const pool = lang === 'ne' ? versesDataNe.general : versesData.general;
  return pool[seed % pool.length];
};

/**
 * Returns a verse appropriate for the current date.
 * @param {string} [lang='en']
 * @returns {{ verse: string, category: string }}
 */
export const getVerseByDate = (lang = 'en') => {
  const today = new Date();
  const month = today.getMonth();
  const day   = today.getDate();

  const easterDates = {
    palmSunday:   { month: 3, day: 5  },
    goodFriday:   { month: 3, day: 10 },
    easterSunday: { month: 3, day: 12 },
  };

  if (month === easterDates.palmSunday.month && day === easterDates.palmSunday.day)
    return { verse: getRandomVerse('palmSunday', lang), category: 'palmSunday' };
  if (month === easterDates.goodFriday.month && day === easterDates.goodFriday.day)
    return { verse: getRandomVerse('goodFriday', lang), category: 'goodFriday' };
  if (month === easterDates.easterSunday.month && day === easterDates.easterSunday.day)
    return { verse: getRandomVerse('easter', lang), category: 'easter' };

  return { verse: getDailyVerse(lang), category: 'general' };
};

/**
 * Parses a verse string into text and reference parts.
 * Expects format: "Verse text – Reference"
 * @param {string} verse
 * @returns {{ text: string, reference: string }}
 */
export const parseVerse = (verse) => {
  const parts = verse.split(' \u2013 ');
  if (parts.length < 2) return { text: verse, reference: '' };
  const reference = parts.pop();
  return { text: parts.join(' \u2013 '), reference };
};
