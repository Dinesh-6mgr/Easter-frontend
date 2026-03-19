import React from 'react';
import { motion } from 'framer-motion';
import { timelineEvents } from '../utils/dateMessages';

const Timeline = () => {
  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          The <span className="gradient-text">Easter Story</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Journey through Holy Week, from Jesus' triumphant entry to His glorious resurrection
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-easter-purple via-easter-pink to-easter-yellow" />

        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex items-center mb-16 ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            {/* Timeline dot */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-${event.color}-400 to-${event.color}-600 z-10 cursor-pointer`}
            />

            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card relative overflow-hidden group"
              >
                {/* Decorative background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${event.color}-200 to-${event.color}-400 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{event.icon}</span>
                    <h3 className="text-2xl font-bold">{event.day}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {event.date}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {event.description}
                  </p>
                  
                  <p className="text-sm italic text-easter-purple dark:text-easter-pink">
                    {event.verse}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Easter Sunday Celebration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12 text-white">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="text-6xl mb-4"
          >
            🌅
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">He Is Risen!</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            "He is not here; He has risen, just as He said. Come and see the place where He lay." - Matthew 28:6
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;