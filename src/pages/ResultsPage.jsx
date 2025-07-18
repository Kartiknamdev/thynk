import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];

  const correctAnswers = answers.filter(answer => answer.correct).length;
  const totalQuestions = answers.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-glass dark:bg-glass-dark backdrop-blur-lg border border-white/10 shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Practice Complete!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's how you performed
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className={`text-6xl font-bold ${getScoreColor()}`}>
            {score}%
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {correctAnswers} correct out of {totalQuestions} questions
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-gray-600 dark:text-gray-300">
            {score >= 80
              ? "Excellent work! Keep it up! 🌟"
              : score >= 60
              ? "Good effort! Room for improvement. 💪"
              : "Keep practicing! You'll get better. 📚"}
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate('/reading-settings')}
              className="flex-1 py-3 rounded-lg bg-white/50 dark:bg-black/50 text-gray-800 dark:text-white font-medium transition-transform hover:scale-105 active:scale-95"
            >
              Try Another
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium transition-transform hover:scale-105 active:scale-95"
            >
              Retry
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
