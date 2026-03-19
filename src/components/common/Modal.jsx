import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizes = { sm: 'sm:max-w-md', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl' };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Bottom-sheet on mobile, centered dialog on sm+ */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className={`pointer-events-auto w-full ${sizes[size]} bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh]`}
            >
              {/* Drag handle (mobile only) */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b dark:border-gray-700 flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold gradient-text">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="px-5 sm:px-6 py-5 overflow-y-auto flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
