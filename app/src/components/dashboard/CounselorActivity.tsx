import { motion } from 'framer-motion';
import { Circle, Stethoscope } from 'lucide-react';
import { counselorData } from '@/data/dashboardData';

function getStatusColor(status: string) {
  switch (status) {
    case 'online': return '#6B9080';
    case 'busy': return '#D97706';
    case 'offline': return '#A8A29E';
    default: return '#A8A29E';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'online': return 'Online';
    case 'busy': return 'In Session';
    case 'offline': return 'Offline';
    default: return status;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.7 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function CounselorActivity() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1C1917]">
          Counselor Activity
        </h3>
        <span className="text-[12px] text-[#A8A29E]">
          {counselorData.filter((c) => c.status === 'online').length} online
        </span>
      </div>

      {counselorData.map((counselor) => (
        <motion.div
          key={counselor.id}
          variants={cardVariants}
          className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4] hover:shadow-md transition-shadow"
        >
          {/* Top row: Avatar + Name + Status */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[13px] font-bold text-[#DC2626]">
                {counselor.avatar}
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: getStatusColor(counselor.status) }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-semibold text-[#292524] truncate">
                {counselor.name}
              </h4>
              <div className="flex items-center gap-1.5">
                <Circle
                  className="h-2 w-2 fill-current"
                  style={{ color: getStatusColor(counselor.status) }}
                />
                <span className="text-[11px] text-[#A8A29E]">
                  {getStatusLabel(counselor.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Specialization */}
          <div className="flex items-center gap-1.5 mb-3">
            <Stethoscope className="h-3 w-3 text-[#A8A29E]" />
            <span className="text-[12px] text-[#57534E]">
              {counselor.specialization}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-[#FAFAF9] rounded-lg">
              <div className="text-[14px] font-bold text-[#1C1917] font-accent">
                {counselor.activeCases}
              </div>
              <div className="text-[10px] text-[#A8A29E]">Active</div>
            </div>
            <div className="text-center p-2 bg-[#FAFAF9] rounded-lg">
              <div className="text-[14px] font-bold text-[#6B9080] font-accent">
                {counselor.completedCases}
              </div>
              <div className="text-[10px] text-[#A8A29E]">Done</div>
            </div>
            <div className="text-center p-2 bg-[#FAFAF9] rounded-lg">
              <div className="text-[14px] font-bold text-[#3D8B8B] font-accent">
                {counselor.totalCases}
              </div>
              <div className="text-[10px] text-[#A8A29E]">Total</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] text-[#A8A29E] mb-1">
              <span>Caseload</span>
              <span>{Math.round((counselor.activeCases / counselor.totalCases) * 100)}%</span>
            </div>
            <div className="w-full bg-[#F5F5F4] rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(counselor.activeCases / counselor.totalCases) * 100}%`,
                }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 1 }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    counselor.activeCases / counselor.totalCases > 0.7
                      ? '#DC2626'
                      : counselor.activeCases / counselor.totalCases > 0.5
                      ? '#D97706'
                      : '#6B9080',
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
