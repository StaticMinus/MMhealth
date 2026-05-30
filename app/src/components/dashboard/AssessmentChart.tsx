import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { assessmentTrendData } from '@/data/dashboardData';

type Period = 'daily' | 'weekly' | 'monthly';

function groupByWeek(data: typeof assessmentTrendData) {
  const weeks: { label: string; completed: number; started: number }[] = [];
  let weekCompleted = 0;
  let weekStarted = 0;
  let weekIndex = 1;
  data.forEach((d, i) => {
    weekCompleted += d.completed;
    weekStarted += d.started;
    if ((i + 1) % 7 === 0 || i === data.length - 1) {
      weeks.push({
        label: `Week ${weekIndex}`,
        completed: weekCompleted,
        started: weekStarted,
      });
      weekCompleted = 0;
      weekStarted = 0;
      weekIndex++;
    }
  });
  return weeks;
}

export default function AssessmentChart() {
  const [period, setPeriod] = useState<Period>('daily');

  const data =
    period === 'weekly'
      ? groupByWeek(assessmentTrendData)
      : period === 'monthly'
      ? [
          {
            label: 'Apr 2025',
            completed: assessmentTrendData.reduce((s, d) => s + d.completed, 0),
            started: assessmentTrendData.reduce((s, d) => s + d.started, 0),
          },
        ]
      : assessmentTrendData.map((d) => ({
          label: d.day,
          completed: d.completed,
          started: d.started,
        }));

  const tabs: { key: Period; label: string }[] = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[16px] font-semibold text-[#1C1917]">
            Assessment Trends
          </h3>
          <p className="text-[12px] text-[#A8A29E] mt-0.5">
            Daily assessment completions over selected period
          </p>
        </div>
        <div className="flex bg-[#F5F5F4] rounded-lg p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setPeriod(t.key)}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200 ${
                period === t.key
                  ? 'bg-white text-[#1C1917] shadow-sm'
                  : 'text-[#A8A29E] hover:text-[#57534E]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: '#A8A29E' }}
              axisLine={false}
              tickLine={false}
              interval={period === 'daily' ? 4 : 0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#A8A29E' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1917',
                border: 'none',
                borderRadius: 8,
                color: '#FFFFFF',
                fontSize: 13,
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#A8A29E', marginBottom: 4 }}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#DC2626"
              strokeWidth={2}
              fill="url(#colorCompleted)"
              name="Completed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
