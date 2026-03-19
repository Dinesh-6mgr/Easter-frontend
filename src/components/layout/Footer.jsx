import { useEffect, useState } from 'react';
import { GiEasterEgg } from 'react-icons/gi';
import { FaHeart, FaGithub, FaEye } from 'react-icons/fa';
import visitorService from '../../services/visitorService';

const Footer = () => {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    visitorService.ping()
      .then(setVisitors)
      .catch(() => {}); // silently fail — visitor count is non-critical
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 mt-auto">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">

        <div className="flex items-center gap-2">
          <GiEasterEgg className="text-easter-purple w-4 h-4" />
          <span className="font-semibold text-gray-700 dark:text-gray-200">Easter Journey Game</span>
        </div>

        <p className="text-xs sm:text-sm text-center">
          Happy Easter 🐣 — <span className="italic opacity-80">He is Risen! 🌅</span>
        </p>

        <div className="flex items-center gap-3 text-xs">
          {visitors !== null && (
            <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
              <FaEye className="w-3 h-3" />
              {visitors.toLocaleString()} visitors
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span>Built with</span>
            <FaHeart className="w-3 h-3 text-red-400" />
            <span>by</span>
            <a
              href="https://github.com/Dinesh-6mgr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-easter-purple dark:text-easter-pink hover:underline font-medium"
            >
              <FaGithub className="w-3.5 h-3.5" />
              Dinesh
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
