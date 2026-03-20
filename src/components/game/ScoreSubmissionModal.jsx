import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../common/Modal';
import Button from '../common/Button';
import leaderboardService from '../../services/leaderboardService';
import { FaSearch, FaPlus, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Church combobox
// ─────────────────────────────────────────────────────────────────────────────
const ChurchCombobox = ({ value, onChange, churches, onNewChurch }) => {
  const [input, setInput]     = useState('');
  const [open, setOpen]       = useState(false);
  const [newName, setNewName] = useState('');
  const [addMode, setAddMode] = useState(false);
  const [saving, setSaving]   = useState(false);
  const containerRef          = useRef(null);
  const newInputRef           = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false); setAddMode(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (addMode && newInputRef.current) setTimeout(() => newInputRef.current?.focus(), 50);
  }, [addMode]);

  const suggestions = churches.filter((c) => c.toLowerCase().includes(input.toLowerCase()));

  const pick = useCallback((name) => {
    onChange(name); setInput(''); setOpen(false); setAddMode(false); setNewName('');
  }, [onChange]);

  const clearSelection = () => { onChange(''); setInput(''); setOpen(false); };
  const openAddMode = () => { setNewName(input); setAddMode(true); };

  const handleAddConfirm = async () => {
    const trimmed = newName.trim();
    if (trimmed.length < 2) return;
    setSaving(true);
    try { await onNewChurch(trimmed); pick(trimmed); }
    finally { setSaving(false); }
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {t('submit.churchLbl')}
      </label>

      {value ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-easter-purple bg-easter-purple/5 dark:bg-easter-purple/20">
          <FaCheck className="w-4 h-4 text-easter-purple shrink-0" />
          <span className="flex-1 font-medium text-gray-900 dark:text-white truncate">{value}</span>
          <button type="button" onClick={clearSelection} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Clear">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setOpen(true); setAddMode(false); }}
            onFocus={() => setOpen(true)}
            placeholder={t('submit.churchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-easter-purple focus:border-transparent outline-none"
          />
        </div>
      )}

      <AnimatePresence>
        {open && !value && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl z-[200]"
          >
            {!addMode && (
              <ul className="max-h-44 overflow-y-auto">
                {suggestions.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-gray-400 text-center">
                    {input ? t('submit.noMatch', { q: input }) : t('submit.noChurches')}
                  </li>
                ) : (
                  suggestions.map((c) => (
                    <li key={c}>
                      <button
                        type="button" onClick={() => pick(c)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-easter-purple hover:text-white transition-colors"
                      >
                        {c}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}

            <div className="border-t border-gray-100 dark:border-gray-700 p-2">
              {!addMode ? (
                <button
                  type="button" onClick={openAddMode}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-easter-purple dark:text-easter-pink hover:bg-easter-purple/10 rounded-lg transition-colors font-medium"
                >
                  <FaPlus className="w-3.5 h-3.5" />
                  {input ? t('submit.addNewNamed', { name: input }) : t('submit.addNew')}
                </button>
              ) : (
                <div className="space-y-2 p-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium px-1">{t('submit.newChurchLabel')}</p>
                  <div className="flex gap-2">
                    <input
                      ref={newInputRef}
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); handleAddConfirm(); }
                        if (e.key === 'Escape') setAddMode(false);
                      }}
                      placeholder={t('submit.newChurchPlaceholder')}
                      maxLength={100}
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-easter-purple"
                    />
                    <button
                      type="button" onClick={handleAddConfirm}
                      disabled={newName.trim().length < 2 || saving}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm bg-easter-purple text-white rounded-lg disabled:opacity-40 hover:bg-purple-700 transition-colors whitespace-nowrap"
                    >
                      {saving ? <FaSpinner className="w-3.5 h-3.5 animate-spin" /> : <FaCheck className="w-3.5 h-3.5" />}
                      {saving ? t('submit.saving') : t('submit.save')}
                    </button>
                    <button
                      type="button" onClick={() => setAddMode(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="Cancel"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { getPlayer } from './PlayerSetupModal';

// ─────────────────────────────────────────────────────────────────────────────
// Main modal
// ─────────────────────────────────────────────────────────────────────────────
const ScoreSubmissionModal = ({ isOpen, onClose, score, rank }) => {
  const [name, setName]               = useState('');
  const [church, setChurch]           = useState('');
  const [churches, setChurches]       = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const saved = getPlayer();
      setName(saved?.name || '');
      setChurch(saved?.church || '');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) leaderboardService.getChurches().then(setChurches).catch(() => setChurches([]));
  }, [isOpen]);

  const handleNewChurch = async (newChurchName) => {
    await leaderboardService.addChurch(newChurchName);
    setChurches((prev) =>
      prev.includes(newChurchName) ? prev : [...prev, newChurchName].sort((a, b) => a.localeCompare(b))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !church.trim()) return;
    setIsSubmitting(true);
    try {
      await leaderboardService.submitScore({ name: name.trim(), church: church.trim(), score });
      onClose();
    } catch { /* toast shown in service */ }
    finally { setIsSubmitting(false); }
  };

  const canSubmit = name.trim().length >= 2 && church.trim().length >= 2 && !isSubmitting;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('submit.title')}>
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="text-5xl mb-2"
        >
          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🏆'}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold gradient-text"
        >
          {score} {t('submit.pts')}
        </motion.p>
        {rank && (
          <p className="text-sm font-semibold text-easter-purple dark:text-easter-pink mt-1">
            {t('submit.rank', { rank })}
          </p>
        )}
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('submit.claimSpot')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            {t('submit.nameLbl')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            minLength={2}
            maxLength={50}
            placeholder={t('submit.namePlaceholder')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-easter-purple focus:border-transparent outline-none text-base"
          />
        </div>

        <ChurchCombobox
          value={church}
          onChange={setChurch}
          churches={churches}
          onNewChurch={handleNewChurch}
        />

        <Button type="submit" disabled={!canSubmit} className="w-full" size="lg">
          {isSubmitting ? t('submit.submitting') : t('submit.submit')}
        </Button>
      </form>
    </Modal>
  );
};

export default ScoreSubmissionModal;
