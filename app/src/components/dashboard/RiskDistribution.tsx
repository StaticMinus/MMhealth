import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { riskDistributionData } from '@/data/dashboardData';

const totalAssessments = riskDistributionData.reduce((s, d) => s + d.count, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { color: string; name: string };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const p = payload[0];
    const pct = ((p.value / totalAssessments) * 100).toFixed(1);
    return (
      <div className="bg-[#1C1917] text-white rounded-lg px-3 py-2 text-[13px]">
        <span style={{ color: p.payload.color }}>{p.name}</span>
        <span className="mx-1 text-[#A8A29E]">·</span>
        <span>{p.value.toLocaleString()}</span>
        <span className="text-[#A8A29E] ml-1">({pct}%)</span>
      </div>
    );
  }
  return null;
}

export default function RiskDistribution() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.35 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4]"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[16px] font-semibold text-[#1C1917]">
          Risk Distribution
        </h3>
        <p className="text-[12px] text-[#A8A29E] mt-0.5">
          PHQ-9 severity classification
        </p>
      </div>

      {/* Donut Chart */}
      <div className="w-full h-[220px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="count"
              nameKey="name"
              stroke="none"
            >
              {riskDistributionData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[24px] font-bold text-[#1C1917] font-accent">
            {totalAssessments.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#A8A29E]">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2.5">
        {riskDistributionData.map((item) => {
          const pct = ((item.count / totalAssessments) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[13px] text-[#57534E]">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-medium text-[#1C1917]">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#A8A29E] w-10 text-right">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
