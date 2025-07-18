import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

export default function ComingSoon({ title = "Coming Soon" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient pb-2">
          {title}
        </h1>
        
        <div className="text-4xl mb-4">🚧</div>
        
        <p className="text-xl text-gray-600 dark:text-gray-300">
          This feature is currently under development.
        </p>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          We're working hard to bring you this feature soon. Check back later for updates!
        </p>
        
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-6 py-3 mt-6 rounded-lg 
            bg-gradient-to-r from-primary to-secondary text-white
            shadow-lg shadow-primary/25
            transition-all duration-300"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
