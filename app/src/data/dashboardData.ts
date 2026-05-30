// Dashboard Mock Data
// ===================
// Realistic mock data for the Red Aid Nigeria Admin Dashboard

export interface KPIMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  borderColor: string;
  icon: string;
}

export const kpiMetrics: KPIMetric[] = [
  {
    label: 'Total Registrations',
    value: '12,847',
    change: '+12% from last month',
    changeType: 'positive',
    borderColor: '#DC2626',
    icon: 'Users',
  },
  {
    label: 'Assessments Completed',
    value: '8,532',
    change: '+8% from last month',
    changeType: 'positive',
    borderColor: '#6B9080',
    icon: 'ClipboardCheck',
  },
  {
    label: 'High-Risk Cases',
    value: '342',
    change: '-3% from last month',
    changeType: 'positive',
    borderColor: '#D97706',
    icon: 'AlertTriangle',
  },
  {
    label: 'Active Counselors',
    value: '48',
    change: '+5 this month',
    changeType: 'positive',
    borderColor: '#3D8B8B',
    icon: 'Stethoscope',
  },
  {
    label: 'WhatsApp Engagements',
    value: '5,234',
    change: '+15% from last month',
    changeType: 'positive',
    borderColor: '#25D366',
    icon: 'MessageCircle',
  },
  {
    label: 'Resources Accessed',
    value: '15,678',
    change: '+6% from last month',
    changeType: 'positive',
    borderColor: '#7C3AED',
    icon: 'BookOpen',
  },
];

// 30-day assessment completion data
export interface DailyAssessment {
  date: string;
  day: string;
  completed: number;
  started: number;
}

export const assessmentTrendData: DailyAssessment[] = [
  { date: '2025-04-01', day: 'Apr 1', completed: 245, started: 312 },
  { date: '2025-04-02', day: 'Apr 2', completed: 289, started: 356 },
  { date: '2025-04-03', day: 'Apr 3', completed: 312, started: 398 },
  { date: '2025-04-04', day: 'Apr 4', completed: 278, started: 340 },
  { date: '2025-04-05', day: 'Apr 5', completed: 198, started: 256 },
  { date: '2025-04-06', day: 'Apr 6', completed: 156, started: 198 },
  { date: '2025-04-07', day: 'Apr 7', completed: 267, started: 334 },
  { date: '2025-04-08', day: 'Apr 8', completed: 298, started: 367 },
  { date: '2025-04-09', day: 'Apr 9', completed: 334, started: 412 },
  { date: '2025-04-10', day: 'Apr 10', completed: 289, started: 356 },
  { date: '2025-04-11', day: 'Apr 11', completed: 312, started: 389 },
  { date: '2025-04-12', day: 'Apr 12', completed: 198, started: 245 },
  { date: '2025-04-13', day: 'Apr 13', completed: 167, started: 201 },
  { date: '2025-04-14', day: 'Apr 14', completed: 287, started: 356 },
  { date: '2025-04-15', day: 'Apr 15', completed: 334, started: 401 },
  { date: '2025-04-16', day: 'Apr 16', completed: 356, started: 432 },
  { date: '2025-04-17', day: 'Apr 17', completed: 298, started: 367 },
  { date: '2025-04-18', day: 'Apr 18', completed: 267, started: 312 },
  { date: '2025-04-19', day: 'Apr 19', completed: 189, started: 234 },
  { date: '2025-04-20', day: 'Apr 20', completed: 156, started: 198 },
  { date: '2025-04-21', day: 'Apr 21', completed: 312, started: 389 },
  { date: '2025-04-22', day: 'Apr 22', completed: 345, started: 423 },
  { date: '2025-04-23', day: 'Apr 23', completed: 378, started: 445 },
  { date: '2025-04-24', day: 'Apr 24', completed: 312, started: 389 },
  { date: '2025-04-25', day: 'Apr 25', completed: 287, started: 356 },
  { date: '2025-04-26', day: 'Apr 26', completed: 201, started: 245 },
  { date: '2025-04-27', day: 'Apr 27', completed: 178, started: 212 },
  { date: '2025-04-28', day: 'Apr 28', completed: 334, started: 401 },
  { date: '2025-04-29', day: 'Apr 29', completed: 367, started: 445 },
  { date: '2025-04-30', day: 'Apr 30', completed: 312, started: 378 },
];

// Risk distribution data
export interface RiskCategory {
  name: string;
  count: number;
  color: string;
  bgColor: string;
}

export const riskDistributionData: RiskCategory[] = [
  { name: 'Minimal', count: 2560, color: '#6B9080', bgColor: '#E8F0EC' },
  { name: 'Mild', count: 2133, color: '#3D8B8B', bgColor: '#E0F2F2' },
  { name: 'Moderate', count: 1706, color: '#D97706', bgColor: '#FEF3C7' },
  { name: 'Mod. Severe', count: 1280, color: '#EA580C', bgColor: '#FFEDD5' },
  { name: 'Severe', count: 853, color: '#DC2626', bgColor: '#FEE2E2' },
];

// Nigerian states data for geographic distribution
export interface StateData {
  state: string;
  assessments: number;
  beneficiaries: number;
  avgScore: number;
  counselors: number;
  referrals: number;
}

export const geographicData: StateData[] = [
  { state: 'Lagos', assessments: 2134, beneficiaries: 3456, avgScore: 12.4, counselors: 12, referrals: 89 },
  { state: 'Kano', assessments: 1456, beneficiaries: 2345, avgScore: 10.8, counselors: 8, referrals: 67 },
  { state: 'FCT Abuja', assessments: 1234, beneficiaries: 1987, avgScore: 11.2, counselors: 10, referrals: 54 },
  { state: 'Kaduna', assessments: 987, beneficiaries: 1567, avgScore: 11.5, counselors: 6, referrals: 43 },
  { state: 'Rivers', assessments: 876, beneficiaries: 1398, avgScore: 12.1, counselors: 5, referrals: 38 },
  { state: 'Oyo', assessments: 765, beneficiaries: 1234, avgScore: 10.5, counselors: 4, referrals: 32 },
  { state: 'Enugu', assessments: 654, beneficiaries: 1056, avgScore: 11.8, counselors: 4, referrals: 28 },
  { state: 'Borno', assessments: 543, beneficiaries: 876, avgScore: 13.2, counselors: 5, referrals: 34 },
  { state: 'Ogun', assessments: 498, beneficiaries: 789, avgScore: 10.9, counselors: 3, referrals: 21 },
  { state: 'Delta', assessments: 456, beneficiaries: 723, avgScore: 12.0, counselors: 3, referrals: 19 },
  { state: 'Plateau', assessments: 423, beneficiaries: 654, avgScore: 11.4, counselors: 3, referrals: 18 },
  { state: 'Niger', assessments: 387, beneficiaries: 598, avgScore: 10.7, counselors: 2, referrals: 15 },
  { state: 'Sokoto', assessments: 345, beneficiaries: 534, avgScore: 9.8, counselors: 2, referrals: 12 },
  { state: 'Bauchi', assessments: 312, beneficiaries: 487, avgScore: 10.3, counselors: 2, referrals: 11 },
  { state: 'Anambra', assessments: 298, beneficiaries: 456, avgScore: 11.0, counselors: 2, referrals: 13 },
];

// Language usage data
export interface LanguageData {
  language: string;
  count: number;
  percentage: number;
}

export const languageData: LanguageData[] = [
  { language: 'English', count: 5119, percentage: 60 },
  { language: 'Hausa', count: 1280, percentage: 15 },
  { language: 'Yoruba', count: 1024, percentage: 12 },
  { language: 'Igbo', count: 683, percentage: 8 },
  { language: 'Others', count: 426, percentage: 5 },
];

// Recent assessment entries
export interface AssessmentEntry {
  id: string;
  name: string;
  date: string;
  score: number;
  riskLevel: 'Minimal' | 'Mild' | 'Moderate' | 'Mod. Severe' | 'Severe';
  status: 'Completed' | 'Referred' | 'Follow-up';
  state: string;
}

export const recentAssessments: AssessmentEntry[] = [
  { id: 'AST-001', name: 'Chioma Okafor', date: '2025-04-30', score: 8, riskLevel: 'Minimal', status: 'Completed', state: 'Lagos' },
  { id: 'AST-002', name: 'Ibrahim Musa', date: '2025-04-30', score: 18, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Kano' },
  { id: 'AST-003', name: 'Adebayo Ogunlesi', date: '2025-04-30', score: 5, riskLevel: 'Minimal', status: 'Completed', state: 'Oyo' },
  { id: 'AST-004', name: 'Fatima Abdullahi', date: '2025-04-29', score: 22, riskLevel: 'Severe', status: 'Referred', state: 'Borno' },
  { id: 'AST-005', name: 'Ngozi Eze', date: '2025-04-29', score: 12, riskLevel: 'Moderate', status: 'Follow-up', state: 'Enugu' },
  { id: 'AST-006', name: 'Yusuf Garba', date: '2025-04-29', score: 9, riskLevel: 'Minimal', status: 'Completed', state: 'Kaduna' },
  { id: 'AST-007', name: 'Amina Bello', date: '2025-04-28', score: 15, riskLevel: 'Moderate', status: 'Follow-up', state: 'Sokoto' },
  { id: 'AST-008', name: 'Olumide Adeyemi', date: '2025-04-28', score: 3, riskLevel: 'Minimal', status: 'Completed', state: 'Lagos' },
  { id: 'AST-009', name: 'Chidi Okonkwo', date: '2025-04-28', score: 19, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Anambra' },
  { id: 'AST-010', name: 'Halima Ibrahim', date: '2025-04-27', score: 7, riskLevel: 'Minimal', status: 'Completed', state: 'Kano' },
  { id: 'AST-011', name: 'Tunde Bakare', date: '2025-04-27', score: 11, riskLevel: 'Moderate', status: 'Follow-up', state: 'Ogun' },
  { id: 'AST-012', name: 'Zainab Mohammed', date: '2025-04-27', score: 25, riskLevel: 'Severe', status: 'Referred', state: 'Plateau' },
  { id: 'AST-013', name: 'Emeka Obi', date: '2025-04-26', score: 6, riskLevel: 'Minimal', status: 'Completed', state: 'Delta' },
  { id: 'AST-014', name: 'Aisha Suleiman', date: '2025-04-26', score: 14, riskLevel: 'Moderate', status: 'Completed', state: 'Bauchi' },
  { id: 'AST-015', name: 'Femi Oladipo', date: '2025-04-25', score: 21, riskLevel: 'Severe', status: 'Referred', state: 'Rivers' },
  { id: 'AST-016', name: 'Grace John', date: '2025-04-25', score: 10, riskLevel: 'Mild', status: 'Follow-up', state: 'FCT Abuja' },
  { id: 'AST-017', name: 'Sani Abubakar', date: '2025-04-25', score: 4, riskLevel: 'Minimal', status: 'Completed', state: 'Niger' },
  { id: 'AST-018', name: 'Blessing Adeleke', date: '2025-04-24', score: 16, riskLevel: 'Moderate', status: 'Follow-up', state: 'Lagos' },
  { id: 'AST-019', name: 'Musa Danjuma', date: '2025-04-24', score: 20, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Kaduna' },
  { id: 'AST-020', name: 'Oluwatobi Williams', date: '2025-04-23', score: 2, riskLevel: 'Minimal', status: 'Completed', state: 'Oyo' },
  { id: 'AST-021', name: 'Hadiza Usman', date: '2025-04-23', score: 13, riskLevel: 'Moderate', status: 'Completed', state: 'Kano' },
  { id: 'AST-022', name: 'Chinedu Nwosu', date: '2025-04-22', score: 17, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Enugu' },
  { id: 'AST-023', name: 'Kafilat Ogundele', date: '2025-04-22', score: 8, riskLevel: 'Minimal', status: 'Completed', state: 'Ogun' },
  { id: 'AST-024', name: 'Abdulrahman Ali', date: '2025-04-21', score: 23, riskLevel: 'Severe', status: 'Referred', state: 'Borno' },
  { id: 'AST-025', name: 'Ifeoma Nnamani', date: '2025-04-21', score: 9, riskLevel: 'Minimal', status: 'Completed', state: 'Anambra' },
  { id: 'AST-026', name: 'Kehinde Ajayi', date: '2025-04-20', score: 11, riskLevel: 'Moderate', status: 'Follow-up', state: 'Lagos' },
  { id: 'AST-027', name: 'Mustapha Goni', date: '2025-04-20', score: 5, riskLevel: 'Minimal', status: 'Completed', state: 'Bauchi' },
  { id: 'AST-028', name: 'Nneka Mbah', date: '2025-04-19', score: 18, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Plateau' },
  { id: 'AST-029', name: 'Temitope Salami', date: '2025-04-19', score: 7, riskLevel: 'Minimal', status: 'Completed', state: 'FCT Abuja' },
  { id: 'AST-030', name: 'Garba Shehu', date: '2025-04-18', score: 15, riskLevel: 'Moderate', status: 'Follow-up', state: 'Sokoto' },
  { id: 'AST-031', name: 'Amara Nwachukwu', date: '2025-04-18', score: 1, riskLevel: 'Minimal', status: 'Completed', state: 'Delta' },
  { id: 'AST-032', name: 'Babajide Sanwo', date: '2025-04-17', score: 19, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Rivers' },
  { id: 'AST-033', name: 'Safiya Tanko', date: '2025-04-17', score: 6, riskLevel: 'Minimal', status: 'Completed', state: 'Niger' },
  { id: 'AST-034', name: 'Obinna Kalu', date: '2025-04-16', score: 12, riskLevel: 'Moderate', status: 'Completed', state: 'Enugu' },
  { id: 'AST-035', name: 'Lara Osinbajo', date: '2025-04-16', score: 24, riskLevel: 'Severe', status: 'Referred', state: 'Lagos' },
  { id: 'AST-036', name: 'Danladi Yusuf', date: '2025-04-15', score: 3, riskLevel: 'Minimal', status: 'Completed', state: 'Kaduna' },
  { id: 'AST-037', name: 'Folake Ojo', date: '2025-04-15', score: 14, riskLevel: 'Moderate', status: 'Follow-up', state: 'Oyo' },
  { id: 'AST-038', name: 'Isa Mohammed', date: '2025-04-14', score: 21, riskLevel: 'Severe', status: 'Referred', state: 'Kano' },
  { id: 'AST-039', name: 'Adaeze Nnamdi', date: '2025-04-14', score: 8, riskLevel: 'Minimal', status: 'Completed', state: 'Anambra' },
  { id: 'AST-040', name: 'Rotimi Amaechi', date: '2025-04-13', score: 16, riskLevel: 'Moderate', status: 'Follow-up', state: 'Rivers' },
  { id: 'AST-041', name: 'Mariam Saidu', date: '2025-04-13', score: 9, riskLevel: 'Minimal', status: 'Completed', state: 'Plateau' },
  { id: 'AST-042', name: 'Segun Adeyemi', date: '2025-04-12', score: 20, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Ogun' },
  { id: 'AST-043', name: 'Chiamaka Ibe', date: '2025-04-12', score: 4, riskLevel: 'Minimal', status: 'Completed', state: 'Lagos' },
  { id: 'AST-044', name: 'Yakubu Datti', date: '2025-04-11', score: 13, riskLevel: 'Moderate', status: 'Completed', state: 'Bauchi' },
  { id: 'AST-045', name: 'Rukayat Balogun', date: '2025-04-11', score: 22, riskLevel: 'Severe', status: 'Referred', state: 'FCT Abuja' },
  { id: 'AST-046', name: 'Ezequiel Maduka', date: '2025-04-10', score: 7, riskLevel: 'Minimal', status: 'Completed', state: 'Delta' },
  { id: 'AST-047', name: 'Asmau Jibril', date: '2025-04-10', score: 17, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Sokoto' },
  { id: 'AST-048', name: 'Funmi Bakare', date: '2025-04-09', score: 10, riskLevel: 'Mild', status: 'Follow-up', state: 'Oyo' },
  { id: 'AST-049', name: 'Bashir Haruna', date: '2025-04-09', score: 5, riskLevel: 'Minimal', status: 'Completed', state: 'Kano' },
  { id: 'AST-050', name: 'Nkem Akunyili', date: '2025-04-08', score: 18, riskLevel: 'Mod. Severe', status: 'Referred', state: 'Enugu' },
];

// Counselor data
export interface CounselorData {
  id: string;
  name: string;
  avatar: string;
  activeCases: number;
  completedCases: number;
  totalCases: number;
  specialization: string;
  status: 'online' | 'offline' | 'busy';
}

export const counselorData: CounselorData[] = [
  { id: 'C001', name: 'Dr. Amara Nwosu', avatar: 'AN', activeCases: 24, completedCases: 156, totalCases: 180, specialization: 'Clinical Psychology', status: 'online' },
  { id: 'C002', name: 'Dr. Ibrahim Kareem', avatar: 'IK', activeCases: 18, completedCases: 134, totalCases: 152, specialization: 'Trauma Therapy', status: 'online' },
  { id: 'C003', name: 'Mrs. Funmilayo Ade', avatar: 'FA', activeCases: 31, completedCases: 198, totalCases: 229, specialization: 'Counseling Psychology', status: 'busy' },
  { id: 'C004', name: 'Dr. Chidi Obi', avatar: 'CO', activeCases: 15, completedCases: 89, totalCases: 104, specialization: 'Psychiatry', status: 'online' },
  { id: 'C005', name: 'Ms. Hadiza Musa', avatar: 'HM', activeCases: 22, completedCases: 167, totalCases: 189, specialization: 'Family Therapy', status: 'offline' },
  { id: 'C006', name: 'Dr. Tunde Bakare', avatar: 'TB', activeCases: 27, completedCases: 145, totalCases: 172, specialization: 'CBT Specialist', status: 'online' },
];

// WhatsApp engagement stats
export interface WhatsAppStats {
  label: string;
  value: number;
  displayValue: string;
  fill: number;
}

export const whatsappStats: WhatsAppStats[] = [
  { label: 'Assessment Conversations', value: 2891, displayValue: '2,891', fill: 85 },
  { label: 'Crisis Support Chats', value: 456, displayValue: '456', fill: 45 },
  { label: 'Resource Sharing', value: 1234, displayValue: '1,234', fill: 72 },
  { label: 'Follow-up Messages', value: 653, displayValue: '653', fill: 38 },
];

// Engagement metrics for the overview section
export interface EngagementMetric {
  label: string;
  value: string;
  fill: number;
}

export const engagementMetrics: EngagementMetric[] = [
  { label: 'Web Assessments', value: '5,234', fill: 72 },
  { label: 'WhatsApp Assessments', value: '1,891', fill: 24 },
  { label: 'AI Assistant Chats', value: '3,456', fill: 48 },
  { label: 'Counselor Sessions', value: '1,234', fill: 18 },
  { label: 'Resource Downloads', value: '2,901', fill: 38 },
];

// Helper functions
export function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'Minimal': return '#6B9080';
    case 'Mild': return '#3D8B8B';
    case 'Moderate': return '#D97706';
    case 'Mod. Severe': return '#EA580C';
    case 'Severe': return '#DC2626';
    default: return '#A8A29E';
  }
}

export function getRiskBgColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'Minimal': return '#E8F0EC';
    case 'Mild': return '#E0F2F2';
    case 'Moderate': return '#FEF3C7';
    case 'Mod. Severe': return '#FFEDD5';
    case 'Severe': return '#FEE2E2';
    default: return '#F5F5F4';
  }
}

export function getStatusIcon(status: string): string {
  switch (status) {
    case 'Completed': return 'CheckCircle';
    case 'Referred': return 'ArrowRight';
    case 'Follow-up': return 'Clock';
    default: return 'HelpCircle';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Completed': return '#6B9080';
    case 'Referred': return '#DC2626';
    case 'Follow-up': return '#D97706';
    default: return '#A8A29E';
  }
}
