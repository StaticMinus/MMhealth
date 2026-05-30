import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[#57534E]">{label}</span>
        <span className="text-sm text-[#A8A29E]">
          {current} of {total}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#E7E5E4] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#DC2626]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
          }}
        />
      </div>
    </div>
  );
}
