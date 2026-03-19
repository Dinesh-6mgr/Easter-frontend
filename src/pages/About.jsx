import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FaGithub, FaEnvelope, FaHeart, FaGamepad, FaCross, FaTrophy, FaCheckCircle } from 'react-icons/fa';
import { GiEasterEgg } from 'react-icons/gi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const features = [
  { icon: <FaCross className="w-5 h-5" />, color: 'from-purple-400 to-pink-400', title: 'Easter Journey', desc: 'An interactive story walking through Palm Sunday to Resurrection.' },
  { icon: <FaGamepad className="w-5 h-5" />, color: 'from-green-400 to-yellow-400', title: 'Egg Hunt Game', desc: 'Catch eggs, avoid bombs, collect power-ups and climb the leaderboard.' },
  { icon: <FaTrophy className="w-5 h-5" />, color: 'from-yellow-400 to-orange-400', title: 'Leaderboard', desc: 'Compete with players from your church and see who tops the board.' },
];

const About = () => {
  const [searchParams] = useSearchParams();
  const submitted = searchParams.get('sent') === '1';

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4">

      {/* Hero */}
      <motion.div {...fadeUp()} className="text-center mb-12 sm:mb-16">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block mb-5"
        >
          <GiEasterEgg className="w-16 h-16 sm:w-20 sm:h-20 text-easter-purple drop-shadow-lg" />
        </motion.div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">
          About <span className="gradient-text">Easter Journey</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
          A full-stack MERN application built to celebrate Easter — combining faith, fun, and technology.
        </p>
      </motion.div>

      {/* Story */}
      <motion.section {...fadeUp(0.1)} className="max-w-3xl mx-auto mb-14">
        <div className="card border border-gray-100 dark:border-gray-700 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 gradient-text">The Story Behind It</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
            Easter Journey Game was built as a personal project to share the meaning of Easter in an interactive way.
            The idea was simple — what if people could experience the Easter story, play a fun game, and connect with
            others from their church, all in one place?
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            It started as a small experiment and grew into a full-stack application with a game, leaderboard,
            timeline, and an interactive journey — all themed around the most important event in history.
          </p>
        </div>
      </motion.section>

      {/* Features */}
      <section className="max-w-4xl mx-auto mb-14">
        <motion.h2 {...fadeUp(0.1)} className="text-xl sm:text-2xl font-bold text-center mb-8">
          What's Inside
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="card text-center border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${f.color} text-white mb-3 shadow`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-1">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <motion.section {...fadeUp(0.1)} className="max-w-3xl mx-auto mb-14">
        <div className="card border border-gray-100 dark:border-gray-700 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 gradient-text">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB Atlas', 'Netlify', 'Render'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-easter-purple dark:text-easter-pink border border-purple-100 dark:border-purple-800">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Developer */}
      <motion.section {...fadeUp(0.1)} className="max-w-3xl mx-auto mb-14">
        <div className="card border border-gray-100 dark:border-gray-700 shadow-md flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-easter-purple to-easter-pink flex items-center justify-center text-white text-2xl font-extrabold shrink-0 shadow-lg">
            D
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-1">Dinesh Rana Magar</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">MERN-Stack Developer · Built with <FaHeart className="inline w-3 h-3 text-red-400" /> and faith</p>
            <div className="flex gap-3">
              <a href="https://github.com/Dinesh-6mgr" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-easter-purple dark:hover:text-easter-pink transition-colors">
                <FaGithub className="w-4 h-4" /> GitHub
              </a>
              <a href="mailto:dineshrana4352@gmail.com"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-easter-purple dark:hover:text-easter-pink transition-colors">
                <FaEnvelope className="w-4 h-4" /> dineshrana4352@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section {...fadeUp(0.1)} className="max-w-2xl mx-auto">
        <div className="card border border-gray-100 dark:border-gray-700 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 gradient-text">Contact Us</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Have a suggestion, found a bug, or just want to say Happy Easter? Drop a message!</p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-8 text-center"
            >
              <FaCheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-lg font-bold text-gray-800 dark:text-white">Message sent!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thanks for reaching out. I'll get back to you soon 🙏</p>
            </motion.div>
          ) : (
            <form
              action="https://formsubmit.co/dineshrana4352@gmail.com"
              method="POST"
              className="space-y-4"
            >
              {/* FormSubmit config */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Easter Journey — Contact Form" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={`${window.location.origin}/about?sent=1`} />
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Name</label>
                  <input
                    type="text" name="name" required minLength={2} maxLength={50}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-easter-purple focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email</label>
                  <input
                    type="email" name="email" required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-easter-purple focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Subject</label>
                <input
                  type="text" name="subject" maxLength={100}
                  placeholder="What's it about?"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-easter-purple focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Message</label>
                <textarea
                  name="message" required minLength={10} rows={4}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-easter-purple focus:border-transparent outline-none resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-easter-purple to-easter-pink text-white font-bold rounded-xl shadow-lg text-sm"
              >
                Send Message 🙏
              </motion.button>
            </form>
          )}
        </div>
      </motion.section>

    </div>
  );
};

export default About;
