import { motion } from 'framer-motion';

export default function QuestionCard({ question, options, currentQuestion, totalQuestions, onAnswer }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Question card with glass effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl 
          bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent
          backdrop-blur-xl border border-white/20 dark:border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      >
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>

        {/* Question header */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
            Question {currentQuestion} of {totalQuestions}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-200">
            {question}
          </p>
        </div>

        {/* Options grid */}
        <div className="p-6 grid gap-4">
          {options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswer(option)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-6 rounded-xl text-left transition-all duration-300
                bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent
                backdrop-blur-md border border-white/10 dark:border-white/5
                hover:border-white/30 dark:hover:border-white/20
                group overflow-hidden"
            >
              {/* Option letter circle */}
              <div className="absolute top-1/2 -left-3 transform -translate-y-1/2
                w-6 h-6 flex items-center justify-center
                rounded-full bg-gradient-to-r from-primary to-secondary
                text-white text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </div>

              {/* Option text */}
              <p className="ml-4 text-lg text-gray-700 dark:text-gray-200">
                {option}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
