import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generatePassage, generateQuestions } from '../services/api';

export default function PracticePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [passage, setPassage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassage, setShowPassage] = useState(true);
  
  const settings = location.state || {
    difficulty: "Easy",
    length: "Short"
  };

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const { passage: passageText } = await generatePassage(settings);
        const { questions } = await generateQuestions(passageText);
        setPassage({
          content: passageText,
          questions: questions.map((q, index) => ({
            ...q,
            id: index + 1
          }))
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load practice content. Please try again.');
        setLoading(false);
      }
    };

    fetchPassage();
  }, [settings]);

  const currentQuestion = passage?.questions?.[currentQuestionIndex];

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setAnswers([...answers, { 
      questionId: currentQuestion.id, 
      selected: index, 
      correct: index === currentQuestion.correctAnswer 
    }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < passage.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      navigate('/results', { state: { answers } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-2xl bg-glass dark:bg-glass-dark backdrop-blur-lg border border-white/10"
        >
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-lg text-gray-600 dark:text-gray-300">Generating your practice session...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-2xl bg-glass dark:bg-glass-dark backdrop-blur-lg border border-white/10"
        >
          <div className="text-center">
            <p className="text-lg text-red-500 mb-4">{error}</p>
            <button
              onClick={() => navigate('/reading-settings')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-gradient-conic from-primary/20 via-secondary/20 to-primary/20 rounded-full filter blur-[100px] animate-float opacity-50" />
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-conic from-secondary/20 via-primary/20 to-secondary/20 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto h-screen p-4">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/reading-settings')}
          className="mb-4 text-gray-600 dark:text-gray-300 hover:text-primary"
        >
          ← Back
        </button>

        {/* Content grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-[calc(100vh-6rem)] w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Passage Section */}
          <div className="h-full rounded-2xl overflow-hidden
            bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent
            backdrop-blur-xl border border-white/20 dark:border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          >
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                {settings.difficulty} Level Passage
              </h2>
              <div className="prose dark:prose-invert max-w-none prose-sm">
                {passage.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="h-full rounded-2xl overflow-hidden
            bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent
            backdrop-blur-xl border border-white/20 dark:border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          >
            {/* Progress bar */}
            <div className="h-1 bg-white/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentQuestionIndex + 1) / passage.questions.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="p-6 h-full overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Question {currentQuestionIndex + 1} of {passage.questions.length}
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-200">
                  {currentQuestion.question}
                </p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                    className={`w-full p-4 text-left rounded-lg transition-all duration-300 relative
                      ${
                        selectedAnswer === null
                          ? 'bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20'
                          : selectedAnswer === index
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-red-500/20 border-red-500'
                          : index === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-white/10 dark:bg-black/10'
                      }`}
                  >
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center
                      rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="block ml-10">
                      {option}
                    </span>
                  </motion.button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-primary/10 dark:bg-primary/5"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}

              {selectedAnswer !== null && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleNext}
                  className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary
                    text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {currentQuestionIndex < passage.questions.length - 1 ? 'Next Question' : 'View Results'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
