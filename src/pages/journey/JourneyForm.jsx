import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JourneyForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo]     = useState('');
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const isValid = from.trim() && to.trim();

  // Build the shareable URL
  const buildUrl = () => {
    const params = new URLSearchParams({ from: from.trim(), to: to.trim() });
    return `${window.location.origin}/journey/letter?${params.toString()}`;
  };

  const handleOpen = () => {
    if (!isValid) return;
    navigate(`/journey/letter?from=${encodeURIComponent(from.trim())}&to=${encodeURIComponent(to.trim())}`);
  };

  const handleShare = () => {
    if (!isValid) return;
    const url = buildUrl();
    setShareUrl(url);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative max-w-md w-full"
      >
        {/* Paper depth shadows */}
        <div className="absolute inset-0 translate-y-2 translate-x-2 bg-amber-100 rounded-2xl opacity-60" />
        <div className="absolute inset-0 translate-y-1 translate-x-1 bg-amber-50 rounded-2xl opacity-80" />

        {/* Card */}
        <div className="relative bg-[#fffdf5] dark:bg-[#2a2416] rounded-2xl shadow-2xl border border-amber-200 dark:border-amber-900 px-8 py-10">

          {/* Cross */}
          <div className="text-center mb-5">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              className="text-4xl inline-block"
            >
              ✝️
            </motion.span>
          </div>

          <h1 className="text-2xl font-extrabold text-center text-gray-800 dark:text-white mb-1">
            Send the Easter Letter
          </h1>
          <p className="text-center text-sm text-amber-700 dark:text-amber-400 mb-8">
            Personalise and share this journey with someone you love ❤️
          </p>

          {/* Form */}
          <div className="space-y-5">
            {/* From */}
            <div>
              <label className="block text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1.5">
                ✍️ From (Your Name)
              </label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Sarah"
                maxLength={40}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
              />
            </div>

            {/* To */}
            <div>
              <label className="block text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1.5">
                💌 To (Receiver's Name)
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. John"
                maxLength={40}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
              />
            </div>
          </div>

          {/* Preview */}
          {isValid && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-800 dark:text-amber-300 space-y-0.5"
            >
              <p>From: <span className="font-bold">{from.trim()}</span></p>
              <p>To: <span className="font-bold">{to.trim()}</span></p>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3">
            <motion.button
              whileHover={isValid ? { scale: 1.04 } : {}}
              whileTap={isValid ? { scale: 0.97 } : {}}
              onClick={handleOpen}
              disabled={!isValid}
              className={`w-full py-3 rounded-full font-bold text-white text-base shadow-lg transition-all ${
                isValid
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-60'
              }`}
            >
              Open the Letter 📖
            </motion.button>

            <motion.button
              whileHover={isValid ? { scale: 1.04 } : {}}
              whileTap={isValid ? { scale: 0.97 } : {}}
              onClick={handleShare}
              disabled={!isValid}
              className={`w-full py-3 rounded-full font-bold text-base border-2 transition-all ${
                isValid
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  : 'border-gray-300 dark:border-gray-700 text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              {copied ? '✅ Link Copied!' : '🔗 Copy Shareable Link'}
            </motion.button>
          </div>

          {/* Copied URL display */}
          {shareUrl && copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs text-gray-400 dark:text-gray-500 break-all text-center"
            >
              {shareUrl}
            </motion.p>
          )}

          {/* Wax seal */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg flex items-center justify-center text-white text-lg select-none">
            ✝
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JourneyForm;
