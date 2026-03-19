import { GiEasterEgg } from 'react-icons/gi';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-6 mt-auto">
    <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-2">
        <GiEasterEgg className="text-easter-purple" />
        <span>Easter Journey Game</span>
      </div>
      <span>He is Risen! 🌅</span>
    </div>
  </footer>
);

export default Footer;
