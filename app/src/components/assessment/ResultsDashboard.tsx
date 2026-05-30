import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  BookOpen,
  MessageCircle,
  Heart,
  Stethoscope,
  Users,
  Phone,
  AlertTriangle,
  Download,
  RotateCcw,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  phq9Questions,
  getRiskClassification,
  getAnswerLabel,
  riskClassifications,
} from "@/data/phq9Questions";
import type { IntakeFormData } from "./IntakeForm";

interface ResultsDashboardProps {
  answers: number[];
  intakeData?: IntakeFormData;
  onRetake: () => void;
}

function AnimatedScore({
  score,
  color,
}: {
  score: number;
  color: string;
}) {
  const [displayScore, setDisplayScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, score]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        }}
        className="relative inline-flex items-center justify-center"
      >
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ borderColor: color }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <span
          className="text-7xl md:text-8xl font-accent font-bold"
          style={{ color }}
        >
          {displayScore}
        </span>
      </motion.div>
      <p className="text-base font-medium text-[#57534E] mt-3">
        Your PHQ-9 Score
      </p>
      <p className="text-sm text-[#A8A29E] mt-1">out of 27</p>
    </div>
  );
}

function RecommendationCard({
  icon,
  title,
  description,
  link,
  linkLabel,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="flex items-start gap-4 bg-white border border-[#E7E5E4] rounded-xl p-5 hover:border-[#FEE2E2] hover:translate-x-1 transition-all duration-300 group"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FEE2E2] text-[#DC2626] shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-[#1C1917] mb-1">{title}</h4>
        <p className="text-sm text-[#57534E] leading-relaxed mb-2">
          {description}
        </p>
        {link && linkLabel && (
          <Link
            to={link}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors group-hover:gap-2 duration-200"
          >
            {linkLabel}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function ResultsDashboard({
  answers,
  intakeData,
  onRetake,
}: ResultsDashboardProps) {
  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const classification = getRiskClassification(totalScore);
  const isSevere = classification.level === "severe";
  const isModeratelySevere = classification.level === "moderately-severe";
  const isModerate = classification.level === "moderate";

  // Check if Q9 (suicidal ideation) has a positive score
  const q9Score = answers[8]; // Question 9 is index 8
  const showCrisisBanner = isSevere || q9Score >= 1;

  // Build recommendations based on severity
  const getRecommendations = () => {
    const recs: {
      icon: React.ReactNode;
      title: string;
      description: string;
      link?: string;
      linkLabel?: string;
    }[] = [];

    if (isSevere || isModeratelySevere) {
      recs.push({
        icon: <Stethoscope className="w-5 h-5" />,
        title: "Connect with a Counselor",
        description:
          "We strongly recommend speaking with a mental health professional who can provide personalized support and treatment options.",
        link: "/find-support",
        linkLabel: "Find a Counselor",
      });
      recs.push({
        icon: <Phone className="w-5 h-5" />,
        title: "Crisis Support Resources",
        description:
          "Our crisis helpline is available 24/7. Trained counselors are ready to listen and help you through this difficult time.",
        link: "/contact",
        linkLabel: "Get Crisis Support",
      });
    }

    if (isModerate) {
      recs.push({
        icon: <Stethoscope className="w-5 h-5" />,
        title: "Connect with a Counselor",
        description:
          "Consider reaching out to a mental health professional for a more comprehensive evaluation and personalized support.",
        link: "/find-support",
        linkLabel: "Find a Counselor",
      });
      recs.push({
        icon: <Users className="w-5 h-5" />,
        title: "Join a Support Group",
        description:
          "Connecting with others who understand what you're going through can provide comfort, encouragement, and practical coping strategies.",
        link: "/find-support",
        linkLabel: "Find Support Groups",
      });
    }

    // Self-help resources for all levels
    recs.push({
      icon: <BookOpen className="w-5 h-5" />,
      title: "Explore Self-Help Resources",
      description:
        "Browse our library of articles, guided exercises, and educational materials about mental health and wellness.",
      link: "/resources",
      linkLabel: "Browse Resources",
    });

    recs.push({
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Try Our AI Assistant",
      description:
        "Chat with our AI mental health companion for immediate support, coping strategies, and a listening ear — available 24/7.",
      link: "/ai-assistant",
      linkLabel: "Chat Now",
    });

    recs.push({
      icon: <Heart className="w-5 h-5" />,
      title: "Practice Self-Care",
      description:
        "Small daily habits can make a big difference: get regular sleep, stay physically active, eat nutritious meals, connect with loved ones, and practice mindfulness or deep breathing exercises.",
    });

    return recs;
  };

  const recommendations = getRecommendations();

  // Build breakdown table data
  const breakdownData = phq9Questions.map((q, idx) => ({
    question: q.symptom,
    answer: getAnswerLabel(answers[idx]),
    score: answers[idx],
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[900px] mx-auto"
    >
      {/* Success header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#E8F0EC] mb-5 mx-auto">
          <CheckCircle className="w-10 h-10 text-[#6B9080]" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-3">
          Assessment Complete
        </h2>
        {intakeData && (
          <p className="text-[15px] text-[#57534E] mb-1">
            Thank you, {intakeData.firstName}, for taking this important step.
          </p>
        )}
        <p className="text-[15px] text-[#57534E]">
          Here are your results and personalized recommendations.
        </p>
      </motion.div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        }}
        className="bg-white border border-[#E7E5E4] rounded-[20px] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Score */}
          <div className="shrink-0">
            <AnimatedScore
              score={totalScore}
              color={classification.color}
            />
          </div>

          {/* Classification */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base mb-4"
                style={{
                  backgroundColor: classification.bgColor,
                  color: classification.color,
                }}
              >
                {classification.label}
              </div>
              <p className="text-[15px] text-[#44403C] leading-relaxed max-w-md">
                {classification.description}
              </p>
            </motion.div>

            {/* Score legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start"
            >
              {riskClassifications.map((r) => (
                <div
                  key={r.level}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                    r.level === classification.level
                      ? "font-semibold"
                      : ""
                  }`}
                  style={{
                    backgroundColor: r.bgColor,
                    color: r.color,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                  {r.minScore}-{r.maxScore}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Crisis Banner (conditional) */}
      {showCrisisBanner && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-[#991B1B] rounded-2xl p-6 md:p-8 text-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [1, 0.9, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <AlertTriangle className="w-8 h-8 text-white mx-auto mb-4" />
          </motion.div>
          <h3 className="text-xl md:text-[22px] font-bold text-white mb-2">
            We&apos;re here to help you right now
          </h3>
          <p className="text-[15px] text-white/90 max-w-lg mx-auto mb-5 leading-relaxed">
            Your responses indicate you may be going through a difficult time.
            Please reach out to our crisis support team immediately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:0800-MENTAL-HELP"
              className="inline-flex items-center gap-2 bg-white text-[#991B1B] font-bold text-base px-6 py-3 rounded-lg hover:bg-[#F5F5F4] transition-all duration-200 animate-pulse"
            >
              <Phone className="w-5 h-5" />
              Call Crisis Line: 0800-MENTAL-HELP
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold text-base px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Chat with Crisis Counselor
            </Link>
          </div>
        </motion.div>
      )}

      {/* Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden mb-8"
      >
        <div className="px-5 py-4 border-b border-[#E7E5E4] bg-[#FAFAF9]">
          <h3 className="text-base font-semibold text-[#1C1917]">
            Response Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F5F4]">
                <th className="text-left px-5 py-3 font-medium text-[#57534E]">
                  Question
                </th>
                <th className="text-left px-5 py-3 font-medium text-[#57534E]">
                  Your Response
                </th>
                <th className="text-center px-5 py-3 font-medium text-[#57534E] w-20">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {breakdownData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-[#E7E5E4] ${
                    idx % 2 === 1 ? "bg-[#FAFAF9]" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3 text-[#292524] max-w-xs truncate">
                    {idx + 1}. {row.question}
                  </td>
                  <td
                    className={`px-5 py-3 font-medium ${
                      row.score >= 2
                        ? "text-[#D97706]"
                        : row.score >= 1
                        ? "text-[#3D8B8B]"
                        : "text-[#6B9080]"
                    }`}
                  >
                    {row.answer}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                        row.score >= 2
                          ? "bg-[#FEF3C7] text-[#D97706]"
                          : row.score >= 1
                          ? "bg-[#E0F2F2] text-[#3D8B8B]"
                          : "bg-[#E8F0EC] text-[#6B9080]"
                      }`}
                    >
                      {row.score}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-[#E7E5E4] bg-[#F5F5F4] font-semibold">
                <td className="px-5 py-3 text-[#1C1917]" colSpan={2}>
                  Total Score
                </td>
                <td
                  className="px-5 py-3 text-center text-lg"
                  style={{ color: classification.color }}
                >
                  {totalScore}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-[#1C1917] mb-5">
          Recommended Next Steps
        </h3>
        <div className="flex flex-col gap-4">
          {recommendations.map((rec, idx) => (
            <RecommendationCard
              key={rec.title}
              icon={rec.icon}
              title={rec.title}
              description={rec.description}
              link={rec.link}
              linkLabel={rec.linkLabel}
              delay={1.1 + idx * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 py-8 border-t border-[#E7E5E4]"
      >
        <button
          onClick={onRetake}
          className="flex items-center gap-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-all duration-200 font-medium text-base px-5 py-3 rounded-lg"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] transition-all duration-200 font-semibold text-base px-5 py-2.5 rounded-lg"
        >
          <Download className="w-4 h-4" />
          Download Results
        </button>

        {(isModerate || isModeratelySevere || isSevere) && (
          <Link
            to="/find-support"
            className="flex items-center gap-2 bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] transition-all duration-250 font-semibold text-base px-6 py-3 rounded-lg"
          >
            Find Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-center text-xs text-[#A8A29E] max-w-lg mx-auto mt-4 leading-relaxed"
      >
        This assessment is for screening purposes only and does not constitute a
        medical diagnosis. If you are experiencing a mental health emergency,
        please call 112 or our crisis line at 0800-MENTAL-HELP.
      </motion.p>
    </motion.div>
  );
}
