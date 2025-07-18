import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaExchangeAlt, FaVolumeUp, FaChartLine } from 'react-icons/fa';

export default function LandingPage() {
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 overflow-hidden bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 dark:from-primary/20 dark:via-secondary/10 dark:to-primary/20 animate-gradient-slow">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-gradient-conic from-primary/40 via-secondary/40 to-primary/40 rounded-full filter blur-[80px] animate-float opacity-70" />
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-conic from-secondary/40 via-primary/40 to-secondary/40 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-white/5 to-transparent dark:from-white/10 dark:to-transparent opacity-50" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <div className="text-center relative mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient pb-2">
            Thinkore
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">
            Master Verbal Aptitude for Corporate & Competitive Exams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut",
                delay: index * 0.1 + 0.2
              }}
              onClick={() => handleCardClick(card.path, card.ready)}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl cursor-pointer
                bg-gradient-to-br from-white/20 to-white/10 dark:from-black/20 dark:to-black/10 
                backdrop-blur-xl border border-white/20 dark:border-white/10 
                shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                transition-all duration-300
                hover:shadow-xl group`}
            >
              {!card.ready && (
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full">
                  Coming Soon
                </div>
              )}
              
              <div className={`inline-flex items-center justify-center p-3 mb-4 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                {card.icon}
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {card.description}
              </p>
              
              <div className={`inline-flex items-center text-sm font-medium ${card.ready ? 'text-primary' : 'text-gray-400'}`}>
                {card.ready ? 'Start Practice' : 'Coming Soon'}
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Thinkore. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}