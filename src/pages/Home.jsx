import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGamepad, FaTrophy, FaHistory, FaCrown } from 'react-icons/fa';
import { GiEasterEgg } from 'react-icons/gi';
import { getCurrentEasterMessage } from '../utils/dateMessages';
import Button from '../components/common/Button';
import VerseCard from '../components/common/VerseCard';
import leaderboardService from '../services/leaderboardService';
import { useLanguage } from '../context/LanguageContext';

const featureIcons = [
  { icon: <FaHistory className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'from-blue-400 to-purple-400', link: '/timeline' },
  { icon: <FaGamepad className="w-6 h-6 sm:w-8 sm:h-8" />, color: 'from-green-400 to-yellow-400', link: '/game' },
  { icon: <FaTrophy className="w-6 h-6 sm:w-8 sm:h-8" />,  color: 'from-yellow-400 to-red-400',   link: '/leaderboard' },
];

const rankColor = (i) => ['text-yellow-400', 'text-gray-400', 'text-amber-600'][i] ?? 'text-gray-500';

const Home = () => {
  const { t } = useLanguage();
  const { message } = getCurrentEasterMessage();
  const features = t('home.features');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    leaderboardService.getTopScores()
      .then((res) => setScores(res.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden text-center py-12 sm:py-20 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block mb-6 sm:mb-8"
          >
            <GiEasterEgg className="w-16 h-16 sm:w-24 sm:h-24 text-easter-purple" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">{t('home.hero')}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-2"
          >
            {message || t('home.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Link to="/game" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">{t('home.startPlaying')}</Button>
            </Link>
            <Link to="/timeline" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">{t('home.learnStory')}</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="max-w-xl mx-auto mt-8 sm:mt-10 px-2"
          >
            <VerseCard category="general" />
          </motion.div>
        </motion.div>

        <div className="absolute top-20 left-4 sm:left-10 opacity-10 animate-bounce-slow pointer-events-none">
          <GiEasterEgg className="w-10 h-10 sm:w-16 sm:h-16 text-easter-purple" />
        </div>
        <div className="absolute bottom-10 right-4 sm:right-10 opacity-10 animate-bounce-slow pointer-events-none">
          <GiEasterEgg className="w-12 h-12 sm:w-20 sm:h-20 text-easter-pink" />
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
        >
          {t('home.adventureTitle')} <span className="gradient-text">{t('home.adventureHighlight')}</span> {t('home.adventureEnd')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 max-w-5xl mx-auto">
          {Array.isArray(features) && features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="card text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}
                className={`inline-block p-3 sm:p-4 rounded-full bg-gradient-to-r ${featureIcons[i].color} text-white mb-3 sm:mb-4`}
              >
                {featureIcons[i].icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{f.description}</p>
              <Link to={featureIcons[i].link}><Button variant="ghost" size="sm">{t('home.explore')}</Button></Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Easter Journey banner */}
      <section className="py-6 sm:py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-7 sm:p-10 text-center text-white shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
            className="text-4xl sm:text-5xl mb-3 sm:mb-4"
          >
            ✝️
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">Easter Journey Experience</h2>
          <p className="text-white/90 text-sm sm:text-lg mb-5 sm:mb-7 max-w-xl mx-auto">
            An interactive story from Palm Sunday to Resurrection. Walk the path, feel the story, and discover hope.
          </p>
          <Link to="/journey">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 sm:px-9 py-3 bg-white text-orange-500 font-extrabold rounded-full shadow-lg text-sm sm:text-base"
            >
              Begin the Journey 📖
            </motion.button>
          </Link>
          <div className="absolute -top-8 -left-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 pointer-events-none" />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="bg-gradient-to-r from-easter-purple to-easter-pink rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white"
        >
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('home.ctaTitle')}</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">{t('home.ctaDesc')}</p>
          <Link to="/game"><Button variant="secondary" size="lg">{t('home.playNow')}</Button></Link>
        </motion.div>
      </section>

      {/* Leaderboard preview */}
      {scores.length > 0 && (
        <section className="py-10 sm:py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-5 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <FaTrophy className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400" />
                <h2 className="text-xl sm:text-3xl font-bold">{t('leaderboard.title')}</h2>
              </div>
              <Link to="/leaderboard">
                <Button variant="ghost" size="sm">{t('home.explore')}</Button>
              </Link>
            </div>

            {/* Top 3 podium */}
            <div className="flex justify-center items-end gap-2 sm:gap-4 mb-6">
              {scores[1] && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
                  <FaCrown className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400 mx-auto mb-1" />
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-t-xl p-2 sm:p-3 w-16 sm:w-24">
                    <p className="font-bold text-[10px] sm:text-xs truncate">{scores[1].name}</p>
                    <p className="text-base sm:text-xl font-bold">{scores[1].score}</p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">2nd</p>
                </motion.div>
              )}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} className="text-center">
                <FaCrown className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-1" />
                <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-xl p-3 sm:p-5 w-20 sm:w-28">
                  <p className="font-bold text-white text-[10px] sm:text-sm truncate">{scores[0].name}</p>
                  <p className="text-xl sm:text-3xl font-bold text-white">{scores[0].score}</p>
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-yellow-500 mt-1">1st 🏆</p>
              </motion.div>
              {scores[2] && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
                  <FaCrown className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 mx-auto mb-1" />
                  <div className="bg-amber-100 dark:bg-amber-900/50 rounded-t-xl p-2 sm:p-3 w-16 sm:w-24">
                    <p className="font-bold text-[10px] sm:text-xs truncate">{scores[2].name}</p>
                    <p className="text-base sm:text-xl font-bold text-amber-800 dark:text-amber-200">{scores[2].score}</p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">3rd</p>
                </motion.div>
              )}
            </div>

            {/* Top 5 list */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="w-full text-sm bg-white dark:bg-gray-800">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">{t('leaderboard.name')}</th>
                    <th className="px-4 py-3 text-left hidden sm:table-cell">{t('leaderboard.church')}</th>
                    <th className="px-4 py-3 text-right">{t('leaderboard.score')}</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.slice(0, 5).map((entry, i) => (
                    <motion.tr key={entry._id}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className={`border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${i < 3 ? 'bg-yellow-50/40 dark:bg-yellow-900/10' : ''}`}
                    >
                      <td className="px-4 py-3">
                        {i < 3
                          ? <FaCrown className={`w-4 h-4 ${rankColor(i)}`} />
                          : <span className={`font-mono font-bold text-xs ${rankColor(i)}`}>{i + 1}</span>
                        }
                      </td>
                      <td className="px-4 py-3 font-medium truncate max-w-[100px] sm:max-w-none">{entry.name}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 truncate hidden sm:table-cell">{entry.church}</td>
                      <td className={`px-4 py-3 text-right font-bold ${rankColor(i)}`}>{entry.score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-4">
              <Link to="/leaderboard">
                <Button variant="outline" size="sm">{t('leaderboard.title')} →</Button>
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Home;
