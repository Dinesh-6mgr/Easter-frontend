import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaCrown } from 'react-icons/fa';

const LeaderboardTable = ({ scores }) => {
  const getRankColor = (index) => {
    switch(index) {
      case 0:
        return 'text-yellow-400';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-amber-600';
      default:
        return 'text-gray-600 dark:text-gray-300';
    }
  };

  const getRankIcon = (index) => {
    if (index < 3) {
      return <FaCrown className={`w-5 h-5 ${getRankColor(index)}`} />;
    }
    return <span className="font-mono">{index + 1}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="overflow-x-auto"
    >
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Church
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Score
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <motion.tr
              key={score._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-b border-gray-100 dark:border-gray-800 
                       hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                       ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' : ''}`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getRankIcon(index)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {score.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {score.church}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`font-bold text-lg ${getRankColor(index)}`}>
                  {score.score}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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