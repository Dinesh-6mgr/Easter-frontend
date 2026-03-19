import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaCrown } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const rankColor = (i) => ['text-yellow-400', 'text-gray-400', 'text-amber-600'][i] || 'text-gray-500 dark:text-gray-400';
const rowBg    = (i) => i < 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' : '';

const LeaderboardTable = ({ scores }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      className="overflow-x-auto rounded-xl shadow"
    >
      <table className="w-full bg-white dark:bg-gray-800 text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
            <th className="px-3 sm:px-6 py-3 sm:py-4">{t('leaderboard.rank')}</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4">{t('leaderboard.name')}</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4">{t('leaderboard.score')}</th>
            <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">{t('leaderboard.date')}</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => (
            <motion.tr
              key={score._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${rowBg(i)}`}
            >
              <td className="px-3 sm:px-6 py-3 sm:py-4 align-top">
                {i < 3
                  ? <FaCrown className={`w-4 h-4 sm:w-5 sm:h-5 ${rankColor(i)}`} />
                  : <span className={`font-mono font-bold text-xs sm:text-sm ${rankColor(i)}`}>{i + 1}</span>
                }
              </td>
              {/* Name + church stacked — always visible */}
              <td className="px-3 sm:px-6 py-3 sm:py-4">
                <p className="font-medium text-gray-800 dark:text-white leading-tight">{score.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight mt-0.5">{score.church}</p>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 align-top">
                <span className={`font-bold text-base sm:text-lg ${rankColor(i)}`}>{score.score}</span>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell align-top">
                {format(new Date(score.createdAt), 'MMM dd, yyyy')}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default LeaderboardTable;
