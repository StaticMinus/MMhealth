import { motion } from "framer-motion";
import { answerOptions, type PHQ9Question } from "@/data/phq9Questions";
import type { AnswerOption } from "@/data/phq9Questions";

interface QuestionCardProps {
  question: PHQ9Question;
  currentAnswer: number | null;
  onAnswer: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

function AnswerOptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: AnswerOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      variants={itemVariants}
      onClick={onSelect}
      className={`w-full flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all duration-200 ${
        isSelected
          ? "border-[#DC2626] bg-[#FEE2E2] shadow-[0_2px_8px_rgba(220,38,38,0.1)]"
          : "border-[#E7E5E4] bg-white hover:border-[#A8A29E] hover:bg-[#FAFAF9]"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Radio circle */}
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
          isSelected
            ? "border-[#DC2626] bg-[#DC2626]"
            : "border-[#D6D3D1] bg-white"
        }`}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "backOut" }}
            className="h-2.5 w-2.5 rounded-full bg-white"
          />
        )}
      </div>

      {/* Label */}
      <span
        className={`flex-1 text-base font-medium ${
          isSelected ? "text-[#DC2626]" : "text-[#292524]"
        }`}
      >
        {option.label}
      </span>

      {/* Score badge */}
      <span
        className={`text-sm ${
          isSelected ? "text-[#DC2626] font-semibold" : "text-[#A8A29E]"
        }`}
      >
        {option.value} pts
      </span>
    </motion.button>
  );
}

export default function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      {/* Question header */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <p className="text-sm font-medium text-[#A8A29E] mb-4">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] max-w-[600px] mx-auto leading-tight">
          {question.question}
        </h3>
      </motion.div>

      {/* Answer options */}
      <div className="flex flex-col gap-3 max-w-xl mx-auto">
        {answerOptions.map((option) => (
          <AnswerOptionCard
            key={option.value}
            option={option}
            isSelected={currentAnswer === option.value}
            onSelect={() => onAnswer(option.value)}
          />
        ))}
      </div>
    </motion.div>
  );
}
