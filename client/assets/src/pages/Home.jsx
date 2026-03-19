import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGamepad, FaTrophy, FaHistory } from 'react-icons/fa';
import { GiEasterEgg } from 'react-icons/gi';
import { getCurrentEasterMessage } from '../utils/dateMessages';
import Button from '../components/common/Button';

const Home = () => {
  const currentMessage = getCurrentEasterMessage();

  const features = [
    {
      icon: <FaHistory className="w-8 h-8" />,
      title: 'Easter Timeline',
      description: 'Journey through Holy Week from Palm Sunday to Easter Sunday',
      color: 'from-blue-400 to-purple-400',
      link: '/timeline'
    },
    {
      icon: <FaGamepad className="w-8 h-8" />,
      title: 'Egg Hunt Game',
      description: 'Collect eggs, avoid bombs, and set high scores!',
      color: 'from-green-400 to-yellow-400',
      link: '/game'
    },
    {
      icon: <FaTrophy className="w-8 h-8" />,
      title: 'Leaderboard',
      description: 'Compete with others and see top scores',
      color: 'from-yellow-400 to-red-400',
      link: '/leaderboard'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="inline-block mb-8"
          >
            <GiEasterEgg className="w-24 h-24 text-easter-purple" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Easter Journey</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            {currentMessage.message}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/game">
              <Button size="lg">
                Start Playing 🎮
              </Button>
            </Link>
            <Link to="/timeline">
              <Button variant="outline" size="lg">
                Learn the Story 📖
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative eggs */}
        <div className="absolute top-20 left-10 opacity-20 animate-bounce-slow">
          <GiEasterEgg className="w-16 h-16 text-easter-purple" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-bounce-slow animation-delay-200">
          <GiEasterEgg className="w-20 h-20 text-easter-pink" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Your Easter <span className="gradient-text">Adventure</span> Awaits
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="card text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`inline-block p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <Link to={feature.link}>
                <Button variant="ghost" size="sm">
                  Learn More →
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-easter-purple to-easter-pink rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready for the Hunt?</h2>
          <p className="text-xl mb-8 opacity-90">
            Test your skills, collect eggs, and make it to the leaderboard!
          </p>
          <Link to="/game">
            <Button variant="secondary" size="lg">
              Play Now 🎯
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;