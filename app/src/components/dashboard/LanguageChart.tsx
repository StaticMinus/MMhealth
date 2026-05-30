import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { languageData } from '@/data/dashboardData';

interface TooltipPayloadItem {
  payload: {
    language: string;
    count: number;
    percentage: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div className="bg-[#1C1917] text-white rounded-lg px-3 py-2 text-[13px]">
        <span className="font-medium">{p.language}</span>
        <span className="mx-1 text-[#A8A29E]">·</span>
        <span>{p.count.toLocaleString()}</span>
        <span className="text-[#A8A29E] ml-1">({p.percentage}%)</span>
      </div>
    );
  }
  return null;
}

export default function LanguageChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.65 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4]"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[16px] font-semibold text-[#1C1917]">
          Language Distribution
        </h3>
        <p className="text-[12px] text-[#A8A29E] mt-0.5">
          Top languages used by beneficiaries
        </p>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={languageData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: '#A8A29E' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="language"
              tick={{ fontSize: 13, fill: '#57534E', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={24}>
              {languageData.map((entry, index) => (
                <Cell
                  key={entry.language}
                  fill={index === 0 ? '#DC2626' : index === 1 ? '#B91C1C' : index === 2 ? '#EA580C' : index === 3 ? '#D97706' : '#A8A29E'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-[12px] text-[#A8A29E]">
        <span>{languageData.length} languages tracked</span>
        <span>Total: {languageData.reduce((s, d) => s + d.count, 0).toLocaleString()}</span>
      </div>
    </motion.div>
  );
}
