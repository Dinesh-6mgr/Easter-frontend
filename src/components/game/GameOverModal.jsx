import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import Modal from '../common/Modal';
import Button from '../common/Button';
import VerseCard from '../common/VerseCard';
import leaderboardService from '../../services/leaderboardService';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

const rankEmoji = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '🏆';
};

const GameOverModal = ({ isOpen, onClose, score, onPlayAgain, gameStats, player }) => {
  const [rank, setRank]           = useState(null);
  const [qualifies, setQualifies] = useState(false);
  const [checking, setChecking]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLanguage();

  // Check rank + auto-submit when game ends
  useEffect(() => {
    if (!isOpen || score === 0) return;
    setChecking(true);
    setSubmitted(false);

    leaderboardService.getTopScores()
      .then(async (res) => {
        const board = res.data || [];
        const qualifiesNow = board.length < 20 || score >= board[board.length - 1].score;
        const higherCount  = board.filter((s) => s.score > score).length;
        const rankNow      = higherCount + 1;

        setQualifies(qualifiesNow);
        setRank(rankNow);

        // Auto-submit if player info is saved and score qualifies
        if (qualifiesNow && player?.name && player?.church) {
          setSubmitting(true);
          try {
            await leaderboardService.submitScore({ name: player.name, church: player.church, score });
            setSubmitted(true);
            if (rankNow <= 3) {
              confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
            }
          } catch { /* silent — toast shown in service */ }
          finally { setSubmitting(false); }
        }
      })
      .catch(() => { setQualifies(true); setRank(null); })
      .finally(() => setChecking(false));
  }, [isOpen, score, player]);

  useEffect(() => {
    if (!isOpen) { setRank(null); setQualifies(false); setSubmitted(false); }
  }, [isOpen]);

  const scoreEmoji = score >= 80 ? '🏆' : score >= 50 ? '🥈' : '🥚';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('gameOver.title')}>
      <div className="text-center space-y-4">

        {/* Score */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="text-6xl">{scoreEmoji}</motion.div>
        <p className="text-4xl font-bold gradient-text">{score}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t('gameOver.finalScore')}</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 py-2 text-sm">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2">
            <p className="text-xl">🥚</p><p className="font-bold">{gameStats.normalEggs}</p>
            <p className="text-gray-500 text-xs">{t('gameOver.normal')}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-2">
            <p className="text-xl">🌟</p><p className="font-bold">{gameStats.goldenEggs}</p>
            <p className="text-gray-500 text-xs">{t('gameOver.golden')}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-2">
            <p className="text-xl">🌈</p><p className="font-bold">{gameStats.rainbows || 0}</p>
            <p className="text-gray-500 text-xs">Rainbow</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-2">
            <p className="text-xl">💣</p><p className="font-bold">{gameStats.bombs}</p>
            <p className="text-gray-500 text-xs">{t('gameOver.bombs')}</p>
          </div>
        </div>

        {/* Rank / congrats banner */}
        {checking || submitting ? (
          <p className="text-sm text-gray-400 animate-pulse">
            {submitting ? 'Saving your score…' : t('gameOver.checking')}
          </p>
        ) : qualifies && rank ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-300 dark:border-yellow-700 px-4 py-4"
            >
              <p className="text-3xl mb-1">{rankEmoji(rank)}</p>
              <p className="text-lg font-extrabold text-gray-800 dark:text-white">
                🎉 Congratulations!
              </p>
              <p className="text-sm font-semibold text-easter-purple dark:text-easter-pink mt-0.5">
                You are #{rank} on the leaderboard!
              </p>
              {submitted && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                  ✅ Score saved as <span className="font-bold">{player?.name}</span>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        ) : score > 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('gameOver.notQualified')}</p>
        ) : null}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button variant="outline" onClick={onPlayAgain} className="flex-1">
            {t('gameOver.playAgain')}
          </Button>
          <Button onClick={onClose} className="flex-1">
            <FaTrophy className="inline w-3.5 h-3.5 mr-1.5" />
            Leaderboard
          </Button>
        </div>

        <VerseCard category="gameMotivation" showRefresh className="mt-2" />
      </div>
    </Modal>
  );
};

export default GameOverModal;
