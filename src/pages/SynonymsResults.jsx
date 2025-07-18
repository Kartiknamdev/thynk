import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SynonymsResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], settings = {} } = location.state || {};
  const [showAll, setShowAll] = useState(false);
  
  // Calculate results
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  
  // Group by type (synonyms vs antonyms)
  const synonyms = answers.filter(answer => answer.type === 'synonym');
  const antonyms = answers.filter(answer => answer.type === 'antonym');
  
  const synonymsCorrect = synonyms.filter(answer => answer.isCorrect).length;
  const antonymsCorrect = antonyms.filter(answer => answer.isCorrect).length;
  
  const getScoreCategory = (scoreValue) => {
    if (scoreValue >= 90) return { text: 'Excellent!', color: 'text-emerald-500' };
    if (scoreValue >= 75) return { text: 'Very Good!', color: 'text-green-500' };
    if (scoreValue >= 60) return { text: 'Good', color: 'text-lime-500' };
    if (scoreValue >= 40) return { text: 'Keep Practicing', color: 'text-yellow-500' };
    return { text: 'Needs Improvement', color: 'text-red-500' };
  };

  const scoreCategory = getScoreCategory(score);

  const handleTryAgain = () => {
    navigate('/synonyms-settings');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Your Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {settings.difficulty} difficulty • {totalQuestions} questions
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/20 to-white/10 dark:from-black/20 dark:to-black/10 
          backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl 
          shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          overflow-hidden mb-8">
          
          <div className="p-6 text-center border-b border-white/10 dark:border-white/5">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full
              bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-3xl font-bold mb-4">
              {score}%
            </div>
            <h2 className={`text-xl font-bold ${scoreCategory.color} mb-1`}>
              {scoreCategory.text}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              You got {correctAnswers} out of {totalQuestions} questions right
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Performance Breakdown
            </h3>
            
            <div className="space-y-4">
              {synonyms.length > 0 && (
                <div className="p-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-200">Synonyms</h4>
                    <span className={`font-semibold ${
                      synonymsCorrect === synonyms.length ? 'text-emerald-500' : 
                      synonymsCorrect >= synonyms.length * 0.7 ? 'text-green-500' : 
                      'text-yellow-500'
                    }`}>
                      {synonymsCorrect}/{synonyms.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                      style={{ width: `${(synonymsCorrect / synonyms.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {antonyms.length > 0 && (
                <div className="p-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-200">Antonyms</h4>
                    <span className={`font-semibold ${
                      antonymsCorrect === antonyms.length ? 'text-emerald-500' : 
                      antonymsCorrect >= antonyms.length * 0.7 ? 'text-green-500' : 
                      'text-yellow-500'
                    }`}>
                      {antonymsCorrect}/{antonyms.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                      style={{ width: `${(antonymsCorrect / antonyms.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Questions Review
          </h3>
          
          <div className="space-y-4">
            {(showAll ? answers : answers.filter(a => !a.isCorrect)).map((answer, index) => (
              <div
                key={answer.questionId}
                className={`p-4 rounded-xl border ${
                  answer.isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {answer.word}
                  </h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    answer.type === 'synonym'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {answer.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Your answer:</span>
                  <span className={`font-medium ${
                    answer.isCorrect
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {String.fromCharCode(65 + answer.selectedAnswer)}
                  </span>
                  
                  {!answer.isCorrect && (
                    <>
                      <span className="text-gray-600 dark:text-gray-300">Correct answer:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {String.fromCharCode(65 + answer.correctAnswer)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {answers.length > 0 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:underline"
              >
                {showAll 
                  ? 'Show only incorrect answers' 
                  : `Show all ${answers.length} questions`}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={handleTryAgain}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium
              shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30
              transition-all duration-300"
          >
            Try Again
          </motion.button>
          
          <motion.button
            onClick={handleGoHome}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-white/20 dark:bg-black/20 text-gray-800 dark:text-white font-medium
              backdrop-blur-sm border border-white/20 dark:border-white/10 
              hover:bg-white/30 dark:hover:bg-black/30
              transition-all duration-300"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
