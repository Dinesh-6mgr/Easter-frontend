import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCrown } from 'react-icons/fa';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import leaderboardService from '../services/leaderboardService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await leaderboardService.getTopScores();
      setScores(response.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} onRetry={fetchLeaderboard} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <FaTrophy className="w-16 h-16 text-yellow-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Leaderboard</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Top 20 Egg Hunt Champions
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </motion.div>

      {scores.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">
            No scores yet
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Be the first to make it to the leaderboard!
          </p>
        </motion.div>
      ) : (
        <>
          {/* Top 3 Podium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-end gap-4 mb-12"
          >
            {/* Second Place */}
            {scores[1] && (
              <div className="text-center">
                <div className="mb-2">
                  <FaCrown className="w-8 h-8 text-gray-400 mx-auto" />
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-t-2xl p-4 w-32">
                  <p className="font-bold truncate">{scores[1].name}</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    {scores[1].score}
                  </p>
                </div>
                <p className="mt-2 text-sm">2nd</p>
              </div>
            )}

            {/* First Place */}
            {scores[0] && (
              <div className="text-center">
                <div className="mb-2">
                  <FaCrown className="w-10 h-10 text-yellow-400 mx-auto" />
                </div>
                <div className="bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-2xl p-6 w-40">
                  <p className="font-bold text-white truncate">{scores[0].name}</p>
                  <p className="text-3xl font-bold text-white">
                    {scores[0].score}
                  </p>
                </div>
                <p className="mt-2 text-lg font-semibold text-yellow-500">1st</p>
              </div>
            )}

            {/* Third Place */}
            {scores[2] && (
              <div className="text-center">
                <div className="mb-2">
                  <FaCrown className="w-8 h-8 text-amber-600 mx-auto" />
                </div>
                <div className="bg-amber-100 dark:bg-amber-900 rounded-t-2xl p-4 w-32">
                  <p className="font-bold truncate">{scores[2].name}</p>
                  <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                    {scores[2].score}
                  </p>
                </div>
                <p className="mt-2 text-sm">3rd</p>
              </div>
            )}
          </motion.div>

          {/* Leaderboard Table */}
          <LeaderboardTable scores={scores} />
        </>
      )}

      {/* Refresh Button */}
      <div className="text-center mt-8">
        <button
          onClick={fetchLeaderboard}
          className="text-easter-purple hover:text-easter-pink transition-colors"
        >
          🔄 Refresh Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;