import { motion } from 'framer-motion';
import {
  RefreshCw,
  Download,
  FileText,
} from 'lucide-react';
import KPICards from '@/components/dashboard/KPICards';
import AssessmentChart from '@/components/dashboard/AssessmentChart';
import RiskDistribution from '@/components/dashboard/RiskDistribution';
import GeographicMap from '@/components/dashboard/GeographicMap';
import LanguageChart from '@/components/dashboard/LanguageChart';
import RecentAssessments from '@/components/dashboard/RecentAssessments';
import CounselorActivity from '@/components/dashboard/CounselorActivity';
import WhatsAppStats from '@/components/dashboard/WhatsAppStats';

export default function Dashboard() {
  return (
    <div className="min-h-[100dvh] bg-[#FAFAF9]">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="bg-white border-b border-[#E7E5E4]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left: Title + Breadcrumb */}
            <div>
              <nav className="flex items-center gap-1.5 text-[13px] text-[#A8A29E] mb-1">
                <span>Red Aid Nigeria</span>
                <span>/</span>
                <span className="text-[#57534E]">Dashboard</span>
              </nav>
              <h1 className="text-[24px] font-bold text-[#1C1917]">
                Dashboard
              </h1>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3">
              {/* Date Range Selector */}
              <select
                className="h-9 px-3 text-[14px] text-[#57534E] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] transition-all cursor-pointer"
                defaultValue="30"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>

              {/* Export Report Button */}
              <button className="inline-flex items-center gap-2 h-9 px-4 text-[14px] font-medium text-[#DC2626] bg-white border-2 border-[#DC2626] rounded-lg hover:bg-[#FEE2E2] transition-all duration-200">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              {/* CSV Export */}
              <button className="inline-flex items-center gap-2 h-9 px-4 text-[14px] font-medium text-[#57534E] bg-white border border-[#E7E5E4] rounded-lg hover:bg-[#F5F5F4] hover:text-[#292524] transition-all duration-200">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">CSV</span>
              </button>

              {/* Refresh */}
              <button
                className="inline-flex items-center justify-center h-9 w-9 text-[#A8A29E] hover:text-[#DC2626] bg-white border border-[#E7E5E4] rounded-lg hover:bg-[#F5F5F4] transition-all duration-200"
                aria-label="Refresh data"
                title="Refresh data"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards Row */}
        <section className="mb-8">
          <KPICards />
        </section>

        {/* Charts Row: Assessment Trends + Risk Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
          <div className="lg:col-span-3">
            <AssessmentChart />
          </div>
          <div className="lg:col-span-2">
            <RiskDistribution />
          </div>
        </section>

        {/* Geographic Distribution */}
        <section className="mb-8">
          <GeographicMap />
        </section>

        {/* Bottom Row: Language Chart + Recent Assessments + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Language Chart */}
          <div className="lg:col-span-1">
            <LanguageChart />
          </div>

          {/* Center: Recent Assessments Table */}
          <div className="lg:col-span-1">
            <RecentAssessments />
          </div>

          {/* Right: Counselor Activity + WhatsApp Stats */}
          <div className="lg:col-span-1 space-y-6">
            <CounselorActivity />
            <WhatsAppStats />
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-12" />
      </div>
    </div>
  );
}
