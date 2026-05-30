export interface PHQ9Question {
  id: number;
  symptom: string;
  question: string;
}

export const phq9Questions: PHQ9Question[] = [
  {
    id: 1,
    symptom: "Little interest or pleasure in doing things",
    question: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
  },
  {
    id: 2,
    symptom: "Feeling down, depressed, or hopeless",
    question: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
  },
  {
    id: 3,
    symptom: "Trouble falling or staying asleep, or sleeping too much",
    question: "Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
  },
  {
    id: 4,
    symptom: "Feeling tired or having little energy",
    question: "Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?",
  },
  {
    id: 5,
    symptom: "Poor appetite or overeating",
    question: "Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?",
  },
  {
    id: 6,
    symptom: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    question: "Over the last 2 weeks, how often have you been bothered by feeling bad about yourself \u2014 or that you are a failure or have let yourself or your family down?",
  },
  {
    id: 7,
    symptom: "Trouble concentrating on things, such as reading the newspaper or watching television",
    question: "Over the last 2 weeks, how often have you been bothered by trouble concentrating on things, such as reading the newspaper or watching television?",
  },
  {
    id: 8,
    symptom: "Moving or speaking so slowly that other people could have noticed, or the opposite \u2014 being so fidgety or restless that you have been moving around a lot more than usual",
    question: "Over the last 2 weeks, how often have you been bothered by moving or speaking so slowly that other people could have noticed? Or the opposite \u2014 being so fidgety or restless that you have been moving around a lot more than usual?",
  },
  {
    id: 9,
    symptom: "Thoughts that you would be better off dead, or of hurting yourself",
    question: "Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead, or of hurting yourself?",
  },
];

export interface AnswerOption {
  value: number;
  label: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}

export const answerOptions: AnswerOption[] = [
  {
    value: 0,
    label: "Not at all",
    colorClass: "text-[#6B9080]",
    borderClass: "border-[#6B9080]",
    bgClass: "bg-[#E8F0EC]",
  },
  {
    value: 1,
    label: "Several days",
    colorClass: "text-[#3D8B8B]",
    borderClass: "border-[#3D8B8B]",
    bgClass: "bg-[#E0F2F2]",
  },
  {
    value: 2,
    label: "More than half the days",
    colorClass: "text-[#D97706]",
    borderClass: "border-[#D97706]",
    bgClass: "bg-[#FEF3C7]",
  },
  {
    value: 3,
    label: "Nearly every day",
    colorClass: "text-[#DC2626]",
    borderClass: "border-[#DC2626]",
    bgClass: "bg-[#FEE2E2]",
  },
];

export type RiskLevel = "minimal" | "mild" | "moderate" | "moderately-severe" | "severe";

export interface RiskClassification {
  level: RiskLevel;
  label: string;
  minScore: number;
  maxScore: number;
  color: string;
  bgColor: string;
  description: string;
}

export const riskClassifications: RiskClassification[] = [
  {
    level: "minimal",
    label: "Minimal Symptoms",
    minScore: 0,
    maxScore: 4,
    color: "#6B9080",
    bgColor: "#E8F0EC",
    description: "Your symptoms suggest minimal or no depression. Continue maintaining your mental wellness with self-care practices.",
  },
  {
    level: "mild",
    label: "Mild Symptoms",
    minScore: 5,
    maxScore: 9,
    color: "#3D8B8B",
    bgColor: "#E0F2F2",
    description: "Your symptoms suggest mild depression. Consider exploring self-help resources and monitoring your symptoms over time.",
  },
  {
    level: "moderate",
    label: "Moderate Symptoms",
    minScore: 10,
    maxScore: 14,
    color: "#D97706",
    bgColor: "#FEF3C7",
    description: "Your symptoms suggest moderate depression. We recommend connecting with a mental health professional for support.",
  },
  {
    level: "moderately-severe",
    label: "Moderately Severe Symptoms",
    minScore: 15,
    maxScore: 19,
    color: "#EA580C",
    bgColor: "#FFEDD5",
    description: "Your symptoms suggest moderately severe depression. We strongly encourage you to seek professional help soon.",
  },
  {
    level: "severe",
    label: "Severe Symptoms",
    minScore: 20,
    maxScore: 27,
    color: "#DC2626",
    bgColor: "#FEE2E2",
    description: "Your symptoms suggest severe depression. Please reach out to a mental health professional or crisis support immediately.",
  },
];

export function getRiskClassification(totalScore: number): RiskClassification {
  return (
    riskClassifications.find(
      (r) => totalScore >= r.minScore && totalScore <= r.maxScore
    ) || riskClassifications[riskClassifications.length - 1]
  );
}

export function getAnswerLabel(value: number): string {
  return answerOptions.find((o) => o.value === value)?.label || "";
}
