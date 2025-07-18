import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import ThemeSwitcher from '../components/ThemeSwitcher';

const difficulties = ['Easy', 'Medium', 'Hard'];
const lengths = ['Short', 'Medium', 'Long'];

export default function ReadingSettings() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    difficulty: difficulties[0],
    length: lengths[0],
  });

  const handleStart = () => {
    navigate('/practice', { state: settings });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden relative bg-gradient-to-br from-white/60 to-primary/10 dark:from-black/60 dark:to-primary/10">
      {/* Frosted glass header */}
      <header
        className="w-full fixed top-0 left-0 z-30 flex items-center justify-between px-2 sm:px-4 md:px-12 py-2 md:py-4 backdrop-blur-2xl bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.3) 100%)',
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <span className="text-xl xs:text-2xl font-bold tracking-tight text-primary drop-shadow-sm select-none">Thynk!</span>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 lg:gap-6 text-sm sm:text-base font-medium">
          <Link to="/" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">Home</Link>
          <Link to="/features" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">Features</Link>
          <Link to="/about" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">About</Link>
        </nav>
        {/* ThemeSwitcher always visible, right-aligned */}
        <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2">
          <ThemeSwitcher />
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all"
            aria-label="Open navigation menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile nav dropdown */}
        <motion.nav
          initial={false}
          animate={navOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, y: 0, pointerEvents: 'auto' },
            closed: { opacity: 0, y: -10, pointerEvents: 'none' },
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute top-full left-0 right-0 mx-auto mt-2 w-full max-w-xs sm:max-w-sm rounded-2xl shadow-xl bg-white/90 dark:bg-black/90 border border-white/20 dark:border-white/10 flex flex-col md:hidden z-40 backdrop-blur-lg"
          style={{ overflow: 'hidden' }}
        >
          <Link
            to="/"
            className="px-5 py-3 text-base font-medium text-neutral-700 dark:text-neutral-100 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors border-b border-white/10"
            onClick={() => setNavOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="px-5 py-3 text-base font-medium text-neutral-700 dark:text-neutral-100 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors border-b border-white/10"
            onClick={() => setNavOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/about"
            className="px-5 py-3 text-base font-medium text-neutral-700 dark:text-neutral-100 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
            onClick={() => setNavOpen(false)}
          >
            About
          </Link>
        </motion.nav>
      </header>
      <div className="h-16 sm:h-20 md:h-24" />
      <div className="flex-1 w-full flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg p-10 relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18), 0 0 0 1.5px rgba(255,255,255,0.10) inset',
          }}
        >
          {/* Liquid glass highlight overlay */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-[2.5rem] blur-[10px] opacity-40" style={{ WebkitMaskImage: 'linear-gradient(to bottom, white 60%, transparent 100%)' }} />
            <div className="absolute bottom-0 right-0 w-2/3 h-1/3 bg-white/10 rounded-b-[2.5rem] blur-[12px] opacity-20" style={{ WebkitMaskImage: 'linear-gradient(to top, white 60%, transparent 100%)' }} />
            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-20" style={{ boxShadow: '0 0 32px 8px rgba(0,0,0,0.10) inset, 0 0 0 2px rgba(255,255,255,0.10) inset' }} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/60 dark:bg-black/40 border border-white/20 dark:border-white/10 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 shadow"
              title="Back"
            >
              <FaArrowLeft />
            </motion.button>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient drop-shadow pb-1">
              Reading Comprehension
            </h1>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center mb-2">
            Configure your practice session below. Choose your preferred difficulty and passage length.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Difficulty Level</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((level) => (
                  <motion.button
                    key={level}
                    onClick={() => setSettings({ ...settings, difficulty: level })}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md
                      ${settings.difficulty === level
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-primary/25'
                        : 'bg-white/40 dark:bg-black/30 hover:bg-primary/10 dark:hover:bg-primary/20 text-primary dark:text-white'
                      }
                      border border-white/20 dark:border-white/10`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Passage Length</label>
              <div className="flex flex-wrap gap-2">
                {lengths.map((length) => (
                  <motion.button
                    key={length}
                    onClick={() => setSettings({ ...settings, length: length })}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md
                      ${settings.length === length
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-primary/25'
                        : 'bg-white/40 dark:bg-black/30 hover:bg-primary/10 dark:hover:bg-primary/20 text-primary dark:text-white'
                      }
                      border border-white/20 dark:border-white/10`}
                  >
                    {length}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary animate-gradient bg-[length:200%_auto] text-white font-bold text-lg shadow-lg shadow-primary/25 border border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:shadow-md mt-4"
          >
            Start Practice
          </motion.button>
        </motion.div>
      </div>
      {/* Footer */}
      <footer className="w-full mt-16 py-6 flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/30 backdrop-blur-md border-t border-white/20 dark:border-white/10 transition-all duration-500">
        <p>© 2025 Thynk. All rights reserved.</p>
        <p className="mt-1">Made with <span className="text-pink-500">♥</span> for learners.</p>
      </footer>
    </div>
  );
}
