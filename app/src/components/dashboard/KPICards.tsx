import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ClipboardCheck,
  AlertTriangle,
  Stethoscope,
  MessageCircle,
  BookOpen,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { kpiMetrics } from '@/data/dashboardData';

const iconMap: Record<string, ReactNode> = {
  Users: <Users className="h-5 w-5" />,
  ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
  AlertTriangle: <AlertTriangle className="h-5 w-5" />,
  Stethoscope: <Stethoscope className="h-5 w-5" />,
  MessageCircle: <MessageCircle className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function KPICards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5"
    >
      {kpiMetrics.map((metric) => (
        <motion.div
          key={metric.label}
          variants={cardVariants}
          className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4] border-l-4"
          style={{ borderLeftColor: metric.borderColor }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: metric.borderColor }}>
              {iconMap[metric.icon]}
            </span>
            <span className="text-[13px] font-medium text-[#A8A29E]">
              {metric.label}
            </span>
          </div>

          <div className="font-accent text-[28px] font-bold text-[#1C1917] leading-tight mb-2">
            {metric.value}
          </div>

          <div
            className={`inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full ${
              metric.changeType === 'positive'
                ? 'bg-[#E8F0EC] text-[#6B9080]'
                : metric.changeType === 'negative'
                ? 'bg-[#FEE2E2] text-[#DC2626]'
                : 'bg-[#F5F5F4] text-[#A8A29E]'
            }`}
          >
            {metric.changeType === 'positive' ? (
              <TrendingUp className="h-3 w-3" />
            ) : metric.changeType === 'negative' ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            {metric.change}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
