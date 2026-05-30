import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp } from 'lucide-react';
import { geographicData } from '@/data/dashboardData';

export default function GeographicMap() {
  const [, setHoveredState] = useState<string | null>(null);

  const maxAssessments = Math.max(...geographicData.map((s) => s.assessments));

  const getBarWidth = (value: number) => `${(value / maxAssessments) * 100}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.5 }}
      className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4] overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-[#E7E5E4]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-[#1C1917]">
              Geographic Distribution
            </h3>
            <p className="text-[12px] text-[#A8A29E] mt-0.5">
              Beneficiary distribution across Nigerian states
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6B9080] font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Lagos leads</span>
          </div>
        </div>
      </div>

      {/* Map Placeholder + State Data */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Image */}
        <div className="lg:col-span-1 relative bg-[#F5F5F4] rounded-lg p-4 flex items-center justify-center min-h-[280px]">
          <img
            src="/nigeria-map.svg"
            alt="Nigeria Map"
            className="w-full h-auto max-h-[260px] object-contain"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-[#A8A29E]">
            <MapPin className="h-3 w-3" />
            <span>15 states active</span>
          </div>
        </div>

        {/* State Data Table */}
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E7E5E4]">
                  <th className="text-left text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider py-2 pr-4">
                    State
                  </th>
                  <th className="text-left text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider py-2 pr-4 w-[35%]">
                    Assessments
                  </th>
                  <th className="text-right text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider py-2 pr-4">
                    Beneficiaries
                  </th>
                  <th className="text-right text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider py-2 pr-4">
                    Avg Score
                  </th>
                  <th className="text-right text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider py-2">
                    Counselors
                  </th>
                </tr>
              </thead>
              <tbody>
                {geographicData.slice(0, 10).map((s) => (
                  <tr
                    key={s.state}
                    className="border-b border-[#F5F5F4] last:border-b-0 hover:bg-[#FAFAF9] transition-colors cursor-default"
                    onMouseEnter={() => setHoveredState(s.state)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <td className="py-2.5 pr-4 text-[13px] font-medium text-[#292524]">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-[#DC2626] shrink-0" />
                        {s.state}
                      </div>
                    </td>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#F5F5F4] rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: getBarWidth(s.assessments) }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.6 }}
                            className="h-full bg-[#DC2626] rounded-full"
                          />
                        </div>
                        <span className="text-[12px] text-[#57534E] w-10 text-right shrink-0">
                          {s.assessments.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-[13px] text-[#57534E] text-right">
                      {s.beneficiaries.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4 text-[13px] text-[#57534E] text-right">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-6 rounded-md text-[12px] font-medium ${
                          s.avgScore >= 15
                            ? 'bg-[#FEE2E2] text-[#DC2626]'
                            : s.avgScore >= 10
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#E8F0EC] text-[#6B9080]'
                        }`}
                      >
                        {s.avgScore}
                      </span>
                    </td>
                    <td className="py-2.5 text-[13px] text-[#57534E] text-right">
                      {s.counselors}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
