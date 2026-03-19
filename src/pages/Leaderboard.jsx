import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCrown } from 'react-icons/fa';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import leaderboardService from '../services/leaderboardService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import VerseCard from '../components/common/VerseCard';
import { useLanguage } from '../context/LanguageContext';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { t } = useLanguage();

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const response = await leaderboardService.getTopScores();
      setScores(response.data);
      setLastUpdated(new Date());
    } catch { setError(t('common.error')); }
    finally { setLoading(false); }
  }, [t]);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (error)   return <div className="min-h-screen flex items-center justify-center px-4"><ErrorMessage message={error} onRetry={fetchLeaderboard} /></div>;

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
        <FaTrophy className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-400 mx-auto mb-3 sm:mb-4" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          <span className="gradient-text">{t('leaderboard.title')}</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('leaderboard.subtitle')}</p>
        {lastUpdated && (
          <p className="text-xs text-gray-400 mt-1">
            {t('leaderboard.updated', { time: lastUpdated.toLocaleTimeString() })}
          </p>
        )}
      </motion.div>

      {scores.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <p className="text-4xl sm:text-5xl mb-4">🥚</p>
          <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-2">{t('leaderboard.noScores')}</p>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('leaderboard.noScoresDesc')}</p>
        </div>
      ) : (
        <>
          {/* Podium — responsive sizes */}
          {scores.length >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex justify-center items-end gap-2 sm:gap-4 mb-8 sm:mb-12"
            >
              {scores[1] && (
                <div className="text-center">
                  <FaCrown className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400 mx-auto mb-1 sm:mb-2" />
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-t-2xl p-3 sm:p-4 w-20 sm:w-28">
                    <p className="font-bold text-xs sm:text-sm truncate">{scores[1].name}</p>
                    <p className="text-lg sm:text-2xl font-bold">{scores[1].score}</p>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">{t('leaderboard.second')}</p>
                </div>
              )}
              <div className="text-center">
                <FaCrown className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-400 mx-auto mb-1 sm:mb-2" />
                <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-2xl p-4 sm:p-6 w-24 sm:w-36">
                  <p className="font-bold text-white text-xs sm:text-base truncate">{scores[0].name}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{scores[0].score}</p>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-yellow-500">{t('leaderboard.first')}</p>
              </div>
              {scores[2] && (
                <div className="text-center">
                  <FaCrown className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600 mx-auto mb-1 sm:mb-2" />
                  <div className="bg-amber-100 dark:bg-amber-900/50 rounded-t-2xl p-3 sm:p-4 w-20 sm:w-28">
                    <p className="font-bold text-xs sm:text-sm truncate">{scores[2].name}</p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-800 dark:text-amber-200">{scores[2].score}</p>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">{t('leaderboard.third')}</p>
                </div>
              )}
            </motion.div>
          )}

          <LeaderboardTable scores={scores} />
        </>
      )}

      <div className="text-center mt-6 sm:mt-8">
        <button onClick={fetchLeaderboard} className="text-easter-purple hover:text-easter-pink transition-colors text-sm">
          {t('leaderboard.refresh')}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="max-w-xl mx-auto mt-8 sm:mt-10"
      >
        <VerseCard category="general" showRefresh />
      </motion.div>
    </div>
  );
};

export default Leaderboard;
