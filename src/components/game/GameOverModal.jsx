import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaTrophy, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ScoreSubmissionModal from './ScoreSubmissionModal';
import VerseCard from '../common/VerseCard';
import leaderboardService from '../../services/leaderboardService';
import { useLanguage } from '../../context/LanguageContext';

const rankColor = (i) => ['text-yellow-400', 'text-gray-400', 'text-amber-600'][i] ?? 'text-gray-500';

const isInTop20 = (score, leaderboard) => {
  if (leaderboard.length < 20) return true;
  return score >= leaderboard[leaderboard.length - 1].score;
};

const GameOverModal = ({ isOpen, onClose, score, onPlayAgain, gameStats }) => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [qualifies, setQualifies] = useState(false);
  const [rank, setRank] = useState(null);
  const [checking, setChecking] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showBoard, setShowBoard] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen || score === 0) return;
    setChecking(true);
    leaderboardService.getTopScores()
      .then((res) => {
        const board = res.data || [];
        setLeaderboard(board);
        const qualifiesNow = isInTop20(score, board);
        setQualifies(qualifiesNow);
        if (qualifiesNow) {
          const higherCount = board.filter((s) => s.score > score).length;
          setRank(higherCount + 1);
        }
      })
      .catch(() => { setQualifies(true); setRank(null); })
      .finally(() => setChecking(false));
  }, [isOpen, score]);

  useEffect(() => {
    if (isOpen && !checking && qualifies) {
      const timer = setTimeout(() => setShowSubmit(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, checking, qualifies]);

  useEffect(() => {
    if (!isOpen) { setShowSubmit(false); setQualifies(false); setRank(null); setShowBoard(false); }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen && !showSubmit} onClose={onClose} title={t('gameOver.title')}>
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-6xl"
          >
            {score >= 80 ? '🏆' : score >= 50 ? '🥈' : '🥚'}
          </motion.div>

          <p className="text-4xl font-bold gradient-text">{score}</p>
          <p className="text-gray-500 dark:text-gray-400">{t('gameOver.finalScore')}</p>

          <div className="grid grid-cols-4 gap-2 py-2 text-sm">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2">
              <p className="text-xl">🥚</p>
              <p className="font-bold">{gameStats.normalEggs}</p>
              <p className="text-gray-500 text-xs">{t('gameOver.normal')}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-2">
              <p className="text-xl">🌟</p>
              <p className="font-bold">{gameStats.goldenEggs}</p>
              <p className="text-gray-500 text-xs">{t('gameOver.golden')}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-2">
              <p className="text-xl">🌈</p>
              <p className="font-bold">{gameStats.rainbows || 0}</p>
              <p className="text-gray-500 text-xs">Rainbow</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-2">
              <p className="text-xl">💣</p>
              <p className="font-bold">{gameStats.bombs}</p>
              <p className="text-gray-500 text-xs">{t('gameOver.bombs')}</p>
            </div>
          </div>

          {checking ? (
            <p className="text-sm text-gray-400 animate-pulse">{t('gameOver.checking')}</p>
          ) : qualifies ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-green-600 dark:text-green-400"
            >
              {t('gameOver.qualified', { rank })}
            </motion.p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('gameOver.notQualified')}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onPlayAgain} className="flex-1">
              {t('gameOver.playAgain')}
            </Button>
            {qualifies && !checking && (
              <Button onClick={() => setShowSubmit(true)} className="flex-1">
                {t('gameOver.enterDetails')}
              </Button>
            )}
          </div>

          {/* Motivational verse */}
          <VerseCard category="gameMotivation" showRefresh className="mt-2" />

          {/* Leaderboard toggle */}
          {leaderboard.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowBoard((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <span className="flex items-center gap-2">
                  <FaTrophy className="w-4 h-4 text-yellow-400" />
                  {t('leaderboard.title')} — {t('leaderboard.subtitle')}
                </span>
                {showBoard ? <FaChevronUp className="w-3.5 h-3.5" /> : <FaChevronDown className="w-3.5 h-3.5" />}
              </button>

              <AnimatePresence>
                {showBoard && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <table className="w-full text-sm bg-white dark:bg-gray-800">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <th className="px-3 py-2">#</th>
                            <th className="px-3 py-2">{t('leaderboard.name')}</th>
                            <th className="px-3 py-2">{t('leaderboard.church')}</th>
                            <th className="px-3 py-2 text-right">{t('leaderboard.score')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.slice(0, 10).map((entry, i) => (
                            <motion.tr
                              key={entry._id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className={`border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${
                                i < 3 ? 'bg-yellow-50/60 dark:bg-yellow-900/10' : ''
                              } ${entry.score === score ? 'ring-1 ring-inset ring-easter-purple/40' : ''}`}
                            >
                              <td className="px-3 py-2">
                                {i < 3
                                  ? <FaCrown className={`w-3.5 h-3.5 ${rankColor(i)}`} />
                                  : <span className={`font-mono font-bold text-xs ${rankColor(i)}`}>{i + 1}</span>
                                }
                              </td>
                              <td className="px-3 py-2 font-medium truncate max-w-[90px]">{entry.name}</td>
                              <td className="px-3 py-2 text-gray-500 dark:text-gray-400 truncate max-w-[80px]">{entry.church}</td>
                              <td className={`px-3 py-2 text-right font-bold ${rankColor(i)}`}>{entry.score}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Modal>

      <ScoreSubmissionModal
        isOpen={showSubmit}
        rank={rank}
        onClose={() => { setShowSubmit(false); onClose(); }}
        score={score}
      />
    </>
  );
};

export default GameOverModal;
