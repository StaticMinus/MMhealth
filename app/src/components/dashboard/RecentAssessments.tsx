import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Mail,
  CheckCircle,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { recentAssessments, getRiskColor, getRiskBgColor } from '@/data/dashboardData';
import type { AssessmentEntry } from '@/data/dashboardData';

type SortKey = 'date' | 'name' | 'score' | 'riskLevel' | 'status' | 'state';
type SortDir = 'asc' | 'desc';

const statusIcons: Record<string, React.ReactNode> = {
  Completed: <CheckCircle className="h-4 w-4 text-[#6B9080]" />,
  Referred: <ArrowRight className="h-4 w-4 text-[#DC2626]" />,
  'Follow-up': <Clock className="h-4 w-4 text-[#D97706]" />,
};

const rowsPerPage = 8;

export default function RecentAssessments() {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const sorted = useMemo(() => {
    const data = [...recentAssessments];
    data.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'date':
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'score':
          cmp = a.score - b.score;
          break;
        case 'riskLevel':
          {
            const order = ['Minimal', 'Mild', 'Moderate', 'Mod. Severe', 'Severe'];
            cmp = order.indexOf(a.riskLevel) - order.indexOf(b.riskLevel);
          }
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'state':
          cmp = a.state.localeCompare(b.state);
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronDown className="h-3.5 w-3.5 text-[#E7E5E4]" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="h-3.5 w-3.5 text-[#DC2626]" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-[#DC2626]" />
    );
  };

  const headerCell = (label: string, col: SortKey) => (
    <th
      className="py-3 px-4 text-left cursor-pointer select-none hover:bg-[#F5F5F4] transition-colors"
      onClick={() => handleSort(col)}
    >
      <div className="flex items-center gap-1">
        <span className="text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider">
          {label}
        </span>
        <SortIcon col={col} />
      </div>
    </th>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.8 }}
      className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E7E5E4] overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-[#E7E5E4] flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-semibold text-[#1C1917]">
            Recent Assessments
          </h3>
          <p className="text-[12px] text-[#A8A29E] mt-0.5">
            Latest PHQ-9 assessment entries
          </p>
        </div>
        <button className="text-[13px] font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAF9] border-b border-[#E7E5E4]">
              {headerCell('Date', 'date')}
              {headerCell('Name', 'name')}
              {headerCell('State', 'state')}
              {headerCell('Score', 'score')}
              {headerCell('Severity', 'riskLevel')}
              {headerCell('Status', 'status')}
              <th className="py-3 px-4 text-left">
                <span className="text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((entry: AssessmentEntry, index: number) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-[#F5F5F4] last:border-b-0 hover:bg-[#FAFAF9] transition-colors"
              >
                <td className="py-3 px-4 text-[13px] text-[#57534E] whitespace-nowrap">
                  {new Date(entry.date).toLocaleDateString('en-NG', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-3 px-4 text-[14px] font-medium text-[#292524]">
                  {entry.name}
                </td>
                <td className="py-3 px-4 text-[13px] text-[#57534E]">
                  {entry.state}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-6 rounded-md text-[12px] font-medium ${
                      entry.score >= 20
                        ? 'bg-[#FEE2E2] text-[#DC2626]'
                        : entry.score >= 15
                        ? 'bg-[#FFEDD5] text-[#EA580C]'
                        : entry.score >= 10
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : entry.score >= 5
                        ? 'bg-[#E0F2F2] text-[#3D8B8B]'
                        : 'bg-[#E8F0EC] text-[#6B9080]'
                    }`}
                  >
                    {entry.score}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      backgroundColor: getRiskBgColor(entry.riskLevel),
                      color: getRiskColor(entry.riskLevel),
                    }}
                  >
                    {entry.riskLevel}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    {statusIcons[entry.status]}
                    <span className="text-[13px] text-[#57534E]">{entry.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded-md hover:bg-[#F5F5F4] text-[#A8A29E] hover:text-[#57534E] transition-colors"
                      aria-label="View details"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-md hover:bg-[#F5F5F4] text-[#A8A29E] hover:text-[#57534E] transition-colors"
                      aria-label="Contact"
                      title="Contact"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-[#E7E5E4] flex items-center justify-between">
        <span className="text-[12px] text-[#A8A29E]">
          Showing {(currentPage - 1) * rowsPerPage + 1}–
          {Math.min(currentPage * rowsPerPage, sorted.length)} of{' '}
          {sorted.length} entries
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md hover:bg-[#F5F5F4] disabled:opacity-30 disabled:cursor-not-allowed text-[#57534E] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-md text-[12px] font-medium transition-colors ${
                page === currentPage
                  ? 'bg-[#DC2626] text-white'
                  : 'text-[#57534E] hover:bg-[#F5F5F4]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md hover:bg-[#F5F5F4] disabled:opacity-30 disabled:cursor-not-allowed text-[#57534E] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
