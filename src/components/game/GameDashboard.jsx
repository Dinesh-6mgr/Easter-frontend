import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaCrown, FaChartBar, FaFire, FaBomb, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import leaderboardService from '../../services/leaderboardService';

const rankColor = (i) => ['text-yellow-400', 'text-gray-400', 'text-amber-600'][i] ?? 'text-gray-500';

const StatCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
    <div className={`text-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold text-gray-800 dark:text-white leading-none">{value}</p>
    </div>
  </div>
);

const GameDashboard = ({ score, level, combo, gameStats, isPlaying, timeLeft }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('board');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    leaderboardService.getTopScores()
      .then((res) => setLeaderboard(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isPlaying && timeLeft === 0) {
      leaderboardService.getTopScores()
        .then((res) => setLeaderboard(res.data || []))
        .catch(() => {});
    }
  }, [isPlaying, timeLeft]);

  const userRank = leaderboard.length > 0
    ? leaderboard.filter((s) => s.score > score).length + 1
    : null;
  const topScore = leaderboard[0]?.score ?? 0;
  const gap = topScore > score ? topScore - score : 0;

  const panelContent = (
    <div className="flex flex-col gap-3">
      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-1 gap-1">
        {[
          { key: 'stats', label: 'Stats', icon: <FaChartBar className="w-3 h-3" /> },
          { key: 'board', label: 'Top 10', icon: <FaTrophy className="w-3 h-3" /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === key
                ? 'bg-white dark:bg-gray-700 text-easter-purple shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'stats' ? (
          <motion.div key="stats" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-2">
            <StatCard icon="🥚" label="Normal Eggs" value={gameStats.normalEggs} color="text-green-500" />
            <StatCard icon={<FaStar />} label="Golden Eggs" value={gameStats.goldenEggs} color="text-yellow-400" />
            <StatCard icon="🌈" label="Rainbows" value={gameStats.rainbows || 0} color="text-purple-500" />
            <StatCard icon={<FaBomb />} label="Bombs Hit" value={gameStats.bombs} color="text-red-500" />
            <StatCard icon={<FaFire />} label="Best Combo" value={combo >= 3 ? `${combo}x 🔥` : combo || 0} color="text-orange-500" />
            {leaderboard.length > 0 && score > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-gradient-to-r from-easter-purple/10 to-easter-pink/10 border border-easter-purple/20 text-center"
              >
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">Current Rank</p>
                <p className="text-2xl font-black text-easter-purple">#{userRank}</p>
                {gap > 0 && <p className="text-[10px] text-gray-400 mt-0.5">{gap} pts behind #1</p>}
                {gap === 0 && <p className="text-[10px] text-yellow-500 font-semibold mt-0.5">🏆 You're #1!</p>}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div key="board" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            {loading ? (
              <div className="text-center py-6 text-gray-400 text-sm animate-pulse">Loading…</div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-3xl mb-2">🥚</p>
                <p className="text-sm text-gray-400">No scores yet — be first!</p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <table className="w-full text-xs bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                      <th className="px-2 py-2 text-left">#</th>
                      <th className="px-2 py-2 text-left">Player</th>
                      <th className="px-2 py-2 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.slice(0, 10).map((entry, i) => (
                      <tr key={entry._id}
                        className={`border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${i < 3 ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''} ${entry.score === score && score > 0 ? 'ring-1 ring-inset ring-easter-purple/40' : ''}`}
                      >
                        <td className="px-2 py-2 align-top">
                          {i < 3 ? <FaCrown className={`w-3 h-3 ${rankColor(i)}`} /> : <span className={`font-mono font-bold ${rankColor(i)}`}>{i + 1}</span>}
                        </td>
                        <td className="px-2 py-2">
                          <p className="font-semibold text-gray-800 dark:text-white leading-tight">{entry.name}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">{entry.church}</p>
                        </td>
                        <td className={`px-2 py-2 text-right font-bold align-top ${rankColor(i)}`}>{entry.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Link to="/leaderboard" className="mt-2 flex items-center justify-center gap-1.5 text-xs text-easter-purple dark:text-easter-pink hover:underline font-semibold py-1">
              <FaTrophy className="w-3 h-3" /> View Full Leaderboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Mobile: collapsible toggle bar */}
      <div className="xl:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          <span className="flex items-center gap-2">
            <FaTrophy className="w-4 h-4 text-yellow-400" />
            Dashboard — Top 10 &amp; Stats
          </span>
          {mobileOpen ? <FaChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <FaChevronDown className="w-3.5 h-3.5 text-gray-400" />}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden mt-2"
            >
              {panelContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: always visible */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden xl:flex flex-col gap-3"
      >
        {panelContent}
      </motion.div>
    </>
  );
};

export default GameDashboard;
