import { motion } from 'framer-motion';
import type { SuggestedPrompt } from '@/data/assistantResponses';

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onPromptClick: (query: string) => void;
  visible: boolean;
}

export default function SuggestedPrompts({ prompts, onPromptClick, visible }: SuggestedPromptsProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="flex flex-wrap gap-2 px-4 pb-2"
    >
      {prompts.map((prompt, idx) => (
        <motion.button
          key={prompt.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: idx * 0.05,
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
          }}
          onClick={() => onPromptClick(prompt.query)}
          className="rounded-full border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#57534E] shadow-sm hover:border-[#DC2626] hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-all duration-200 cursor-pointer"
        >
          {prompt.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
