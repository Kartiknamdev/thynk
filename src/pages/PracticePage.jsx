import { useState, useEffect, useRef } from 'react';
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
  const [autoNext, setAutoNext] = useState(true);
  const autoNextTimeout = useRef(null);
  
  const settings = location.state || {
    difficulty: "Easy",
    length: "Short"
  };

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const { passage: passageText } = await generatePassage(settings);
        let { questions } = await generateQuestions(passageText);
        // Move main idea question to 4th or 5th position if present
        const mainIdeaIndex = questions.findIndex(q =>
          /main idea|main theme|main point|central idea|central theme/i.test(q.question)
        );
        if (mainIdeaIndex !== -1 && mainIdeaIndex < 3 && questions.length > 3) {
          // Pick 4th or 5th position, prefer 4th
          const targetIndex = questions.length > 4 ? 4 : 3;
          const [mainIdeaQ] = questions.splice(mainIdeaIndex, 1);
          questions.splice(targetIndex, 0, mainIdeaQ);
        }
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
    if (autoNext) {
      autoNextTimeout.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }
  };

  const handleNext = () => {
    if (autoNextTimeout.current) {
      clearTimeout(autoNextTimeout.current);
      autoNextTimeout.current = null;
    }
    if (currentQuestionIndex < passage.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      navigate('/results', { state: { answers } });
    }
  };
  // Clear timeout on unmount or question change
  useEffect(() => {
    return () => {
      if (autoNextTimeout.current) {
        clearTimeout(autoNextTimeout.current);
      }
    };
  }, []);
  useEffect(() => {
    if (selectedAnswer === null && autoNextTimeout.current) {
      clearTimeout(autoNextTimeout.current);
      autoNextTimeout.current = null;
    }
    // eslint-disable-next-line
  }, [currentQuestionIndex]);

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
    <div className="h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-gradient-conic from-primary/20 via-secondary/20 to-primary/20 rounded-full filter blur-[100px] animate-float opacity-50" />
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-conic from-secondary/20 via-primary/20 to-secondary/20 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto h-full p-2 sm:p-4 flex flex-col justify-center">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/reading-settings')}
          className="mb-6 text-base sm:text-lg text-primary font-semibold hover:underline flex items-center gap-1"
        >
          <span className="text-xl">←</span> Back
        </button>

        {/* Content grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch h-[calc(100vh-7.5rem)] md:h-[calc(100vh-7.5rem)]"
        >
          {/* Passage Section */}
          <div className="h-full rounded-3xl overflow-hidden bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 flex flex-col h-full">
              <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 drop-shadow p-6 sm:p-8 pb-0">
                {settings.difficulty} Level Passage
              </h2>
              <div className="flex-1 overflow-y-auto p-6 sm:pt-2 sm:pb-8">
                <div className="prose dark:prose-invert max-w-none prose-base sm:prose-lg">
                  {passage.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-800 dark:text-gray-100 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="h-full rounded-3xl overflow-hidden bg-white/80 dark:bg-black/50 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between min-h-[340px] md:min-h-[420px]">
            {/* Progress bar */}
            <div className="h-1 bg-white/20 dark:bg-black/20">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentQuestionIndex + 1) / passage.questions.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            <div className="p-6 sm:p-8 h-full overflow-y-auto">
              {/* Auto next toggle */}
              <div className="flex items-center justify-end mb-4">
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={autoNext}
                    onChange={e => setAutoNext(e.target.checked)}
                    className="accent-primary w-4 h-4 rounded"
                  />
                  Auto next after answer
                </label>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow">
                  Question {currentQuestionIndex + 1} of {passage.questions.length}
                </h2>
                <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-100 font-medium">
                  {currentQuestion.question}
                </p>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    className={`w-full p-4 sm:p-5 text-left rounded-xl transition-all duration-300 relative font-medium text-base sm:text-lg
                      ${
                        selectedAnswer === null
                          ? 'bg-white/60 dark:bg-black/20 hover:bg-primary/10 dark:hover:bg-primary/20 border border-white/20 dark:border-white/10'
                          : selectedAnswer === index
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-500/20 border-green-500 text-green-800 dark:text-green-200'
                            : 'bg-red-500/20 border-red-500 text-red-800 dark:text-red-200'
                          : index === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-white/60 dark:bg-black/20 border border-white/20 dark:border-white/10'
                      }`}
                  >
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center
                      rounded-full bg-gradient-to-r from-primary to-secondary text-white text-base font-bold shadow">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="block ml-12">
                      {option}
                    </span>
                  </motion.button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-primary/10 dark:bg-primary/10 border border-primary/20 dark:border-primary/20"
                >
                  <p className="text-base text-gray-800 dark:text-gray-100">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}

              {selectedAnswer !== null && !autoNext && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleNext}
                  className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary
                    text-white font-bold text-lg shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
