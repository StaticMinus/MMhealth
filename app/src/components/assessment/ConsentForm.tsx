import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, AlertTriangle, Phone } from "lucide-react";

interface ConsentFormProps {
  onBegin: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function ConsentForm({ onBegin }: ConsentFormProps) {
  const [consented, setConsented] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[720px] mx-auto bg-white border border-[#E7E5E4] rounded-[20px] p-6 sm:p-10 lg:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
    >
      {/* Welcome icon */}
      <motion.div variants={fadeUpVariants} className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FEE2E2] mb-5">
          <Heart className="w-8 h-8 text-[#DC2626]" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#1C1917] mb-3">
          Welcome to your mental health check-in
        </h2>
        <p className="text-base text-[#57534E] max-w-[520px] leading-relaxed">
          This assessment uses the PHQ-9, a widely used clinical screening tool
          for depression. It consists of 9 questions about how you&apos;ve been
          feeling over the past two weeks.
        </p>
      </motion.div>

      {/* Notice boxes */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Privacy Notice */}
        <motion.div
          variants={slideInVariants}
          className="flex items-start gap-3 bg-[#E0F2F2] border-l-4 border-[#3D8B8B] rounded-r-lg px-5 py-4"
        >
          <Shield className="w-5 h-5 text-[#3D8B8B] shrink-0 mt-0.5" />
          <p className="text-sm text-[#44403C] leading-relaxed">
            Your responses are completely confidential. We do not share your
            personal information with third parties without your explicit
            consent.
          </p>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          variants={slideInVariants}
          className="flex items-start gap-3 bg-[#FEE2E2] border-l-4 border-[#DC2626] rounded-r-lg px-5 py-4"
        >
          <AlertTriangle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
          <p className="text-sm text-[#44403C] leading-relaxed">
            This screening tool is not a diagnosis. It is designed to help you
            understand your mental health and connect with appropriate support.
            If you&apos;re in crisis, please seek immediate help.
          </p>
        </motion.div>

        {/* Crisis Notice */}
        <motion.div
          variants={slideInVariants}
          className="flex items-start gap-3 bg-[#FEE2E2] border-l-4 border-[#991B1B] rounded-r-lg px-5 py-4"
        >
          <Phone className="w-5 h-5 text-[#991B1B] shrink-0 mt-0.5" />
          <p className="text-sm text-[#44403C] leading-relaxed">
            If you or someone you know is in immediate danger, please call our
            24/7 crisis line:{" "}
            <span className="font-semibold text-[#DC2626]">
              {" "}
              0800-MENTAL-HELP
            </span>{" "}
            or visit our emergency page.
          </p>
        </motion.div>
      </div>

      {/* Consent checkbox */}
      <motion.div variants={fadeUpVariants} className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-[22px] h-[22px] rounded border-2 transition-all duration-200 flex items-center justify-center shrink-0 ${
                consented
                  ? "bg-[#DC2626] border-[#DC2626]"
                  : "border-[#D6D3D1] bg-white group-hover:border-[#A8A29E]"
              }`}
            >
              {consented && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, ease: "backOut" }}
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </div>
          </div>
          <span className="text-[15px] text-[#44403C] leading-relaxed">
            I understand that this is a screening tool, not a diagnosis. I
            consent to providing this information to receive personalized
            support recommendations.
          </span>
        </label>
      </motion.div>

      {/* Begin button */}
      <motion.div variants={fadeUpVariants}>
        <button
          onClick={onBegin}
          disabled={!consented}
          className={`w-full h-12 rounded-lg font-semibold text-base transition-all duration-300 ${
            consented
              ? "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98]"
              : "bg-[#DC2626] text-white opacity-50 cursor-not-allowed"
          }`}
        >
          Begin Assessment
        </button>
      </motion.div>
    </motion.div>
  );
}
