import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiEasterEgg } from 'react-icons/gi';
import { FaGamepad, FaHome, FaHistory, FaTrophy, FaBars, FaTimes, FaBookOpen } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { path: '/',             name: t('nav.home'),        icon: <FaHome /> },
    { path: '/timeline',    name: t('nav.timeline'),    icon: <FaHistory /> },
    { path: '/game',        name: t('nav.game'),        icon: <FaGamepad /> },
    { path: '/leaderboard', name: t('nav.leaderboard'), icon: <FaTrophy /> },
    { path: '/journey/letter', name: 'Letter ✝️',           icon: <FaBookOpen /> },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <GiEasterEgg className="w-8 h-8 text-easter-purple" />
            </motion.div>
            <span className="font-bold text-xl gradient-text">Easter Journey</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                    ? 'text-easter-purple dark:text-easter-pink font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-easter-purple dark:hover:text-easter-pink'
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                      ? 'bg-easter-purple bg-opacity-10 text-easter-purple dark:text-easter-pink'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="px-4 py-3 flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
