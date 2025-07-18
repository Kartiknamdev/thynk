import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaExchangeAlt, FaVolumeUp, FaChartLine } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
// import ThemeToggle from '../components/ThemeToggle';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function LandingPage() {
  const navigate = useNavigate();
  const { currentTheme, darkMode } = useTheme();

  const cards = [
    {
      id: 'reading',
      title: 'Reading Comprehension',
      description: 'Practice understanding and analyzing passages with interactive questions',
      icon: <FaBookOpen className="text-3xl" />,
      color: 'from-blue-500 to-indigo-600',
      path: '/reading-settings',
      ready: true
    },
    {
      id: 'synonyms',
      title: 'Synonyms & Antonyms',
      description: 'Enhance your vocabulary by practicing word relationships',
      icon: <FaExchangeAlt className="text-3xl" />,
      color: 'from-emerald-500 to-teal-600',
      path: '/synonyms-settings',
      ready: true
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Builder',
      description: 'Learn and practice essential words for aptitude tests',
      icon: <FaVolumeUp className="text-3xl" />,
      color: 'from-purple-500 to-violet-600',
      path: '/vocabulary',
      ready: false
    },
    {
      id: 'progress',
      title: 'Performance Analytics',
      description: 'Track your progress and identify areas for improvement',
      icon: <FaChartLine className="text-3xl" />,
      color: 'from-rose-500 to-pink-600',
      path: '/analytics',
      ready: false
    }
  ];

  const handleCardClick = (path, ready) => {
    if (ready) {
      navigate(path);
    } else {
      // Maybe show a "coming soon" toast/modal here
      console.log('Coming soon!');
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center overflow-hidden relative bg-gradient-to-br ${currentTheme.gradient}`}
      style={{
        backgroundAttachment: 'fixed',
        transition: 'background 0.6s'
      }}
    >
      {/* Frosted glass header */}
      <header
        className="w-full fixed top-0 left-0 z-30 flex items-center justify-between px-6 py-3 md:px-12 md:py-4 backdrop-blur-2xl bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.3) 100%)',
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <span className="text-2xl font-bold tracking-tight text-primary drop-shadow-sm select-none">Thynk!</span>
        <nav className="flex gap-6 text-base font-medium">
          <Link to="/" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">Home</Link>
          <Link to="/features" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">Features</Link>
          <Link to="/about" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-2 ml-4">
          <ThemeSwitcher />
        </div>
      </header>
      <div className="h-20 md:h-24" />
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <div className="text-center relative mb-12 flex flex-col items-center">
          <div className="relative inline-block">
            <span className="absolute inset-0 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 z-0" style={{ filter: 'blur(8px)' }} />
            <h1
              className="relative z-10 text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient pb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
              style={{
                textShadow: '0 2px 16px rgba(0,0,0,0.18), 0 1px 0 #fff',
                WebkitTextStroke: '1px rgba(255,255,255,0.25)'
              }}
            >
             
            </h1>
          </div>
          <p className="mt-0 text-xl font-medium max-w-2xl mx-auto text-neutral-800 dark:text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)] bg-white/60 dark:bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10">
            Master Verbal Aptitude for Corporate & Competitive Exams
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.13
              }
            }
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
              }}
              onClick={() => handleCardClick(card.path, card.ready)}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-5 sm:p-6 rounded-[2.5rem] cursor-pointer overflow-hidden transition-all duration-300 group w-full min-w-0`}
              style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18), 0 0 0 1.5px rgba(255,255,255,0.10) inset',
              }}
            >
              {/* Liquid glass glossy overlay */}
              <div className="pointer-events-none absolute inset-0 z-10">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-[2.5rem] blur-[10px] opacity-40" style={{ WebkitMaskImage: 'linear-gradient(to bottom, white 60%, transparent 100%)' }} />
                <div className="absolute bottom-0 right-0 w-2/3 h-1/3 bg-white/10 rounded-b-[2.5rem] blur-[12px] opacity-20" style={{ WebkitMaskImage: 'linear-gradient(to top, white 60%, transparent 100%)' }} />
                <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-20" style={{ boxShadow: '0 0 32px 8px rgba(0,0,0,0.10) inset, 0 0 0 2px rgba(255,255,255,0.10) inset' }} />
              </div>
              {!card.ready && (
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full">
                  Coming Soon
                </div>
              )}
              
              <div className={`inline-flex items-center justify-center p-3 mb-4 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                {card.icon}
              </div>
              
              <h2
                className="text-xl font-bold mb-2 transition-colors group-hover:text-primary/90 text-neutral-900 dark:text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)] bg-white/60 dark:bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/20 dark:border-white/10"
              >
                {card.title}
              </h2>
              <p className="mb-4 text-neutral-700 dark:text-neutral-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)] bg-white/50 dark:bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10 dark:border-white/5">
                {card.description}
              </p>
              <div
                className={`inline-flex items-center text-sm font-medium px-2 py-1 rounded-md transition-colors
                  ${card.ready ? 'text-primary bg-white/70 dark:bg-black/40 hover:bg-primary/90 hover:text-white dark:hover:bg-primary/80' : 'text-gray-400 bg-white/40 dark:bg-black/30'}`}
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
              >
                {card.ready ? 'Start Practice' : 'Coming Soon'}
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Footer */}
        <footer className="w-full mt-16 py-6 flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/30 backdrop-blur-md border-t border-white/20 dark:border-white/10 transition-all duration-500">
          <p>© 2025 Thynk. All rights reserved.</p>
          <p className="mt-1">Made with <span className="text-pink-500">♥</span> for learners.</p>
        </footer>
      </motion.div>
    </div>
  );
}