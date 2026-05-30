import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Clock,
  CheckCircle,
  Lock,
  ClipboardCheck,
  MessageCircle,
  Users,
  Globe,
  ChevronDown,
  AlertTriangle,
  Phone,
} from "lucide-react";
import ConsentForm from "@/components/assessment/ConsentForm";
import IntakeForm, { type IntakeFormData } from "@/components/assessment/IntakeForm";
import PHQ9Wizard from "@/components/assessment/PHQ9Wizard";
import ResultsDashboard from "@/components/assessment/ResultsDashboard";

// ─── Types ───────────────────────────────────────────────────────────
type AssessmentStep = "consent" | "intake" | "phq9" | "results";

interface AssessmentState {
  step: AssessmentStep;
  intakeData?: IntakeFormData;
  answers: number[];
}

const STORAGE_KEY = "phq9_assessment_state";

// ─── FAQ Data ────────────────────────────────────────────────────────
const faqItems = [
  {
    question: "What is the PHQ-9 assessment?",
    answer:
      "The PHQ-9 (Patient Health Questionnaire-9) is a 9-question screening tool used by healthcare professionals worldwide to assess depression symptoms. It helps identify the severity of depressive episodes and guides treatment recommendations.",
  },
  {
    question: "Is this a diagnosis?",
    answer:
      "No. The PHQ-9 is a screening tool, not a diagnostic instrument. It helps identify symptoms that may require further evaluation by a qualified mental health professional. Only a licensed clinician can provide a diagnosis.",
  },
  {
    question: "Who can see my results?",
    answer:
      "Your results are completely confidential. They are stored securely with encryption on your device. You choose whether to share them with a counselor. We never share your data with third parties without your explicit consent.",
  },
  {
    question: "What happens after I complete the assessment?",
    answer:
      "You'll receive immediate results with your score and severity classification. Based on your results, we'll provide personalized recommendations \u2014 which may include self-help resources, our AI assistant, or referrals to professional counselors.",
  },
  {
    question: "What if I'm in crisis?",
    answer:
      "If you're experiencing thoughts of self-harm or are in immediate danger, please call our 24/7 crisis line: 0809 445 5221. You can also visit our emergency support page for immediate resources. If it's a life-threatening emergency, call emergency services at 112.",
  },
  {
    question: "Can I retake the assessment?",
    answer:
      "Yes, you can retake the assessment at any time. Many people find it helpful to track their symptoms over time by retaking the PHQ-9 every few weeks.",
  },
];

// ─── Feature Data ────────────────────────────────────────────────────
const features = [
  {
    icon: <ClipboardCheck className="w-6 h-6 text-[#DC2626]" />,
    bgClass: "bg-[#FEE2E2]",
    title: "Clinically Validated",
    description:
      "The PHQ-9 is one of the most widely used and validated depression screening tools globally, recommended by healthcare professionals.",
  },
  {
    icon: <Shield className="w-6 h-6 text-[#6B9080]" />,
    bgClass: "bg-[#E8F0EC]",
    title: "Completely Confidential",
    description:
      "Your responses are encrypted and stored securely. We never share your personal data without your explicit consent.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-[#3D8B8B]" />,
    bgClass: "bg-[#E0F2F2]",
    title: "Personalized Support",
    description:
      "Based on your results, we provide tailored recommendations \u2014 from self-help resources to professional counseling referrals.",
  },
  {
    icon: <Clock className="w-6 h-6 text-[#DC2626]" />,
    bgClass: "bg-[#FEE2E2]",
    title: "Quick & Simple",
    description:
      "The assessment takes just 3 minutes. Answer 9 simple questions about how you've been feeling over the past two weeks.",
  },
  {
    icon: <Globe className="w-6 h-6 text-[#6B9080]" />,
    bgClass: "bg-[#E8F0EC]",
    title: "In Your Language",
    description:
      "Available in multiple languages, including major Nigerian languages like Hausa, Yoruba, and Igbo.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#3D8B8B]" />,
    bgClass: "bg-[#E0F2F2]",
    title: "Connect to Care",
    description:
      "If needed, we'll connect you with qualified mental health professionals in your area for ongoing support.",
  },
];

// ─── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const fadeUpLarge = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.87, 0, 0.13, 1] as [number, number, number, number],
    },
  },
};

// ─── FAQ Accordion Item ──────────────────────────────────────────────
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E7E5E4]">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className="text-base font-semibold text-[#1C1917] pr-4 group-hover:text-[#DC2626] transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#57534E]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-[#57534E] leading-relaxed pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Assessment Page
// ═══════════════════════════════════════════════════════════════════════
export default function Assessment() {
  // ─── State ────────────────────────────────────────────────────────
  const [step, setStep] = useState<AssessmentStep>("consent");
  const [intakeData, setIntakeData] = useState<IntakeFormData | undefined>();
  const [answers, setAnswers] = useState<number[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // ─── Restore state from localStorage on mount ─────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state: AssessmentState = JSON.parse(saved);
        if (state.step === "results" && state.answers.length === 9) {
          setStep("results");
          setAnswers(state.answers);
          if (state.intakeData) setIntakeData(state.intakeData);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // ─── Save state to localStorage ────────────────────────────────────
  useEffect(() => {
    const state: AssessmentState = {
      step,
      intakeData,
      answers,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [step, intakeData, answers]);

  // ─── Keyboard navigation ──────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to go back (if not on first step)
      if (e.key === "Escape") {
        if (step === "intake") setStep("consent");
        else if (step === "phq9") setStep("intake");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  // ─── Handlers ─────────────────────────────────────────────────────
  const handleBegin = useCallback(() => setStep("intake"), []);

  const handleIntakeSubmit = useCallback((data: IntakeFormData) => {
    setIntakeData(data);
    setStep("phq9");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleIntakeBack = useCallback(() => setStep("consent"), []);

  const handlePhq9Complete = useCallback(
    (finalAnswers: number[]) => {
      setAnswers(finalAnswers);
      setStep("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const handlePhq9Back = useCallback(() => setStep("intake"), []);

  const handleRetake = useCallback(() => {
    setAnswers([]);
    setStep("consent");
    // Clear all assessment-related localStorage
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("phq9_assessment_state");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ─── Trust badges data ────────────────────────────────────────────
  const trustBadges = [
    { icon: <Shield className="w-[18px] h-[18px] text-[#6B9080]" />, label: "100% Confidential" },
    { icon: <Clock className="w-[18px] h-[18px] text-[#6B9080]" />, label: "Takes 3 minutes" },
    { icon: <CheckCircle className="w-[18px] h-[18px] text-[#6B9080]" />, label: "Clinically validated" },
    { icon: <Lock className="w-[18px] h-[18px] text-[#6B9080]" />, label: "Secure & encrypted" },
  ];

  // ══════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-[100dvh]">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative bg-[#FDF8F3] min-h-[50dvh] flex items-center justify-center pt-[72px]">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assessment-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F3]/80 to-[#FDF8F3]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-16 md:py-24">
          {/* Overline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-4"
          >
            Mental Health Screening
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUpLarge}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1C1917] mb-6 leading-tight tracking-tight"
          >
            Take a confidential mental health assessment
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-lg text-[#57534E] leading-relaxed max-w-xl mx-auto mb-8"
          >
            The PHQ-9 is a clinically validated screening tool used worldwide.
            Your responses are completely confidential and help us provide
            personalized support recommendations.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                custom={0.6 + i * 0.1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2"
              >
                {badge.icon}
                <span className="text-[13px] font-medium text-[#57534E]">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Assessment Flow Container ────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {step === "consent" && (
              <motion.div
                key="consent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ConsentForm onBegin={handleBegin} />
              </motion.div>
            )}

            {step === "intake" && (
              <motion.div
                key="intake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IntakeForm
                  onSubmit={handleIntakeSubmit}
                  onBack={handleIntakeBack}
                  defaultValues={intakeData}
                />
              </motion.div>
            )}

            {step === "phq9" && (
              <motion.div
                key="phq9"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PHQ9Wizard
                  onComplete={handlePhq9Complete}
                  onBack={handlePhq9Back}
                  savedAnswers={answers.length > 0 ? answers : undefined}
                />
              </motion.div>
            )}

            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ResultsDashboard
                  answers={answers}
                  intakeData={intakeData}
                  onRetake={handleRetake}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Assessment Features Section ──────────────────────────── */}
      {step === "consent" && (
        <section className="bg-[#F5EDE4] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="text-center mb-12 md:mb-16"
            >
              <p className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-3">
                Why Take This Assessment
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917]">
                What to expect
              </h2>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="bg-white rounded-2xl border border-[#E7E5E4] p-6 md:p-8 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full ${feature.bgClass} mb-5`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1C1917] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] text-[#57534E] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Section ──────────────────────────────────────────── */}
      {step === "consent" && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="text-center mb-10 md:mb-12"
            >
              <p className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-3">
                Common Questions
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917]">
                Frequently asked questions
              </h2>
            </motion.div>

            {/* Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
            >
              {faqItems.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaqIndex === i}
                  onToggle={() =>
                    setOpenFaqIndex(openFaqIndex === i ? null : i)
                  }
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Emergency Info Section ───────────────────────────────── */}
      {step === "consent" && (
        <section className="bg-[#991B1B] py-12 md:py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
            >
              <AlertTriangle className="w-10 h-10 text-white mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                If you&apos;re in immediate danger
              </h2>
              <motion.a
                href="tel:0809 445 5221"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 12px rgba(255,255,255,0.4)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block font-accent text-3xl md:text-4xl font-semibold text-white mb-3 hover:underline"
              >
                0809 445 5221
              </motion.a>
              <p className="text-base text-white/80 mb-6">
                24/7 Crisis Support Line &mdash; Free and Confidential
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#991B1B] font-bold text-base px-6 py-3 rounded-lg hover:bg-[#F5F5F4] transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                Get Emergency Help
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA Section ──────────────────────────────────────────── */}
      {step === "consent" && (
        <section className="bg-[#FDF8F3] py-16 md:py-24">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
                Not ready for an assessment?
              </h2>
              <p className="text-base text-[#57534E] mb-8 leading-relaxed">
                Explore our resources or chat with our AI assistant &mdash; both
                are free and available anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] transition-all duration-200 font-semibold text-base px-6 py-3 rounded-lg"
                >
                  Browse Resources
                </Link>
                <Link
                  to="/ai-assistant"
                  className="inline-flex items-center gap-2 bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] transition-all duration-250 font-semibold text-base px-6 py-3 rounded-lg"
                >
                  Chat with AI
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
