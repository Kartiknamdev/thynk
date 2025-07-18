import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const difficulties = ['Easy', 'Medium', 'Hard'];
const lengths = ['Short', 'Medium', 'Long'];

export default function ReadingSettings() {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 dark:from-primary/20 dark:via-secondary/10 dark:to-primary/20 animate-gradient-slow">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-gradient-conic from-primary/40 via-secondary/40 to-primary/40 rounded-full filter blur-[80px] animate-float opacity-70" />
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-conic from-secondary/40 via-primary/40 to-secondary/40 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-white/5 to-transparent dark:from-white/10 dark:to-transparent opacity-50" />
      </div>
      
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm 
          border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30
          text-gray-800 dark:text-white transition-all duration-300"
      >
        <FaArrowLeft />
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 relative animate-morph 
          bg-gradient-to-br from-white/20 to-white/10 dark:from-black/20 dark:to-black/10 
          backdrop-blur-xl border border-white/20 dark:border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-2xl before:-z-10
          after:absolute after:inset-0 after:bg-gradient-to-br after:from-primary/10 after:to-secondary/10 after:rounded-2xl after:-z-20
          space-y-8 rounded-2xl"
      >
        <div className="text-center relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient pb-2">
            Reading Comprehension
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Configure your practice session
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Practice with randomly generated passages similar to company aptitude tests.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {difficulties.map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setSettings({ ...settings, difficulty: level })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg transition-all duration-300 font-medium shadow-lg
                    ${settings.difficulty === level
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-primary/25'
                      : 'bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-gray-800 dark:text-white'
                    }
                    backdrop-blur-xl border border-white/20 dark:border-white/10`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Passage Length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {lengths.map((length) => (
                <motion.button
                  key={length}
                  onClick={() => setSettings({ ...settings, length: length })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg transition-all duration-300 font-medium shadow-lg
                    ${settings.length === length
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-primary/25'
                      : 'bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-gray-800 dark:text-white'
                    }
                    backdrop-blur-xl border border-white/20 dark:border-white/10`}
                >
                  {length}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full py-4 rounded-xl 
            bg-gradient-to-r from-primary via-secondary to-primary 
            animate-gradient bg-[length:200%_auto]
            text-white font-semibold text-lg
            shadow-lg shadow-primary/25 
            border border-white/20
            transition-all duration-300
            hover:shadow-xl hover:shadow-primary/30
            active:shadow-md"
        >
          <span className="relative z-10">Start Practice</span>
          <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      </motion.div>
    </div>
  );
}
