import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappStats, engagementMetrics } from '@/data/dashboardData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function WhatsAppStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.9 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4]"
    >
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="h-5 w-5 text-[#25D366]" />
          <h3 className="text-[16px] font-semibold text-[#1C1917]">
            WhatsApp Engagement
          </h3>
        </div>
        <p className="text-[12px] text-[#A8A29E]">
          Conversations via WhatsApp channel
        </p>
      </div>

      {/* WhatsApp Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4 mb-6"
      >
        {whatsappStats.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-[#57534E]">{stat.label}</span>
              <span className="text-[13px] font-semibold text-[#1C1917] font-accent">
                {stat.displayValue}
              </span>
            </div>
            <div className="w-full bg-[#F5F5F4] rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.fill}%` }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.8 }}
                className="h-full bg-[#25D366] rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="border-t border-[#E7E5E4] pt-5">
        <h4 className="text-[13px] font-semibold text-[#1C1917] mb-4">
          Engagement Overview
        </h4>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {engagementMetrics.map((metric) => (
            <motion.div key={metric.label} variants={itemVariants}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] text-[#57534E]">{metric.label}</span>
                <span className="text-[12px] font-medium text-[#1C1917] font-accent">
                  {metric.value}
                </span>
              </div>
              <div className="w-full bg-[#F5F5F4] rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.fill}%` }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 1 }}
                  className="h-full bg-[#DC2626] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
