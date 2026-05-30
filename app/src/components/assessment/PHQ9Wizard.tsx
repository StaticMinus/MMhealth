import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { phq9Questions } from "@/data/phq9Questions";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

interface PHQ9WizardProps {
  onComplete: (answers: number[]) => void;
  onBack: () => void;
  savedAnswers?: number[];
}

const STORAGE_KEY = "phq9_assessment_state";

export default function PHQ9Wizard({
  onComplete,
  onBack,
  savedAnswers,
}: PHQ9WizardProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (savedAnswers) {
      const answered = savedAnswers.filter((a) => a !== null).length;
      return Math.min(answered, phq9Questions.length - 1);
    }
    // Try to restore from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        if (state.answers) {
          const answered = state.answers.filter((a: number | null) => a !== null).length;
          return Math.min(answered, phq9Questions.length - 1);
        }
      }
    } catch {
      // ignore
    }
    return 0;
  });

  const [answers, setAnswers] = useState<(number | null)[]>(() => {
    if (savedAnswers) return savedAnswers;
    // Try to restore from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        if (state.answers) return state.answers;
      }
    } catch {
      // ignore
    }
    return Array(phq9Questions.length).fill(null);
  });

  const [direction, setDirection] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  const currentQuestion = phq9Questions[currentIndex];
  const isLastQuestion = currentIndex === phq9Questions.length - 1;
  const isFirstQuestion = currentIndex === 0;
  const currentAnswer = answers[currentIndex];
  const allAnswered = answers.every((a) => a !== null);

  // Save state to localStorage whenever answers change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers,
          currentIndex,
          timestamp: Date.now(),
        })
      );
    } catch {
      // ignore
    }
  }, [answers, currentIndex]);

  // Check if we should show warning for question 9 (suicidal ideation)
  useEffect(() => {
    if (currentQuestion.id === 9 && currentAnswer !== null && currentAnswer >= 1) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [currentQuestion, currentAnswer]);

  const handleAnswer = useCallback(
    (value: number) => {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = value;
      setAnswers(newAnswers);

      // Auto-advance after a short delay (except last question)
      if (!isLastQuestion) {
        setTimeout(() => {
          setDirection(1);
          setCurrentIndex((prev) => prev + 1);
        }, 400);
      }
    },
    [answers, currentIndex, isLastQuestion]
  );

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion && allAnswered) {
      // Clear localStorage on completion
      localStorage.removeItem(STORAGE_KEY);
      onComplete(answers as number[]);
    } else if (!isLastQuestion && currentAnswer !== null) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="w-full max-w-[800px] mx-auto"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <ProgressBar
          current={currentIndex + 1}
          total={phq9Questions.length}
          label={`Question ${currentIndex + 1} of ${phq9Questions.length}`}
        />
      </div>

      {/* Question card */}
      <div className="bg-white border border-[#E7E5E4] rounded-[20px] p-6 sm:p-10 lg:p-14 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        {/* Back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
              isFirstQuestion
                ? "text-[#A8A29E] cursor-not-allowed"
                : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F5F4]"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Question counter badge */}
          <div className="flex items-center gap-1.5">
            {phq9Questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-[#DC2626] w-6"
                    : idx < currentIndex || answers[idx] !== null
                    ? "bg-[#DC2626]"
                    : "bg-[#E7E5E4]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question with animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
          >
            <QuestionCard
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onAnswer={handleAnswer}
              questionNumber={currentIndex + 1}
              totalQuestions={phq9Questions.length}
            />
          </motion.div>
        </AnimatePresence>

        {/* Suicidal ideation warning (Question 9) */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              <div className="flex items-start gap-3 bg-[#FEE2E2] border border-[#DC2626] rounded-xl px-5 py-4">
                <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#DC2626] mb-2">
                    If you&apos;re having thoughts of hurting yourself, please
                    reach out immediately. You are not alone.
                  </p>
                  <a
                    href="tel:0809 445 5221"
                    className="inline-flex items-center gap-2 bg-[#991B1B] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#7F1D1D] transition-all duration-200 animate-pulse"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Get Immediate Help
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E7E5E4]">
          <button
            onClick={isFirstQuestion ? onBack : handlePrevious}
            className="flex items-center gap-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-all duration-200 font-medium text-base px-4 py-2.5 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            {isFirstQuestion ? "Back to Intake" : "Previous"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className={`flex items-center gap-2 font-semibold text-base px-6 py-3 rounded-lg transition-all duration-250 ${
              currentAnswer !== null
                ? "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98]"
                : "bg-[#E7E5E4] text-[#A8A29E] cursor-not-allowed"
            }`}
          >
            {isLastQuestion ? "See Results" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
