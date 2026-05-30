import { memo } from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-2 w-2 rounded-full bg-[#A8A29E]"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-sm text-[#A8A29E]">typing</span>
    </div>
  );
});

export default TypingIndicator;
