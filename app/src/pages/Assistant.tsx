import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Brain,
  Zap,
  BookOpen,
  ClipboardCheck,
  Stethoscope,
  Shield,
  Sun,
  Globe,
  Clock,
  AlertTriangle,
  Phone,
  Users,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import ChatInterface from '@/components/assistant/ChatInterface';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const easeDefault = [0.4, 0, 0.2, 1] as [number, number, number, number];
const easeDramatic = [0.87, 0, 0.13, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: easeDefault },
  }),
};

const fadeUpLarge = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeDramatic },
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const trustBadges = [
  { icon: Shield, label: 'Confidential' },
  { icon: Clock, label: 'Available 24/7' },
  { icon: Heart, label: 'Non-judgmental' },
  { icon: AlertTriangle, label: 'Not a replacement for professional care' },
];

const capabilities = [
  {
    icon: Heart,
    title: 'Emotional Support',
    description: 'A safe space to share your feelings and receive compassionate responses',
  },
  {
    icon: Brain,
    title: 'Mental Health Info',
    description: 'Learn about depression, anxiety, stress, and other mental health topics',
  },
  {
    icon: Zap,
    title: 'Coping Strategies',
    description: 'Discover evidence-based techniques for managing difficult emotions',
  },
  {
    icon: BookOpen,
    title: 'Resource Discovery',
    description: 'Find articles, videos, and guides tailored to your needs',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment Help',
    description: 'Guidance on taking mental health screenings like the PHQ-9',
  },
  {
    icon: Stethoscope,
    title: 'Professional Referral',
    description: 'Help finding qualified counselors and support services near you',
  },
  {
    icon: Shield,
    title: 'Crisis Guidance',
    description: 'Immediate guidance and resources if you\'re in a mental health crisis',
  },
  {
    icon: Sun,
    title: 'Wellness Tips',
    description: 'Daily self-care suggestions and wellness habit building',
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Chat in your preferred language — we support 100+ languages',
  },
];

const safetyCards = [
  {
    icon: AlertTriangle,
    bg: '#FEF3C7',
    iconColor: '#D97706',
    title: 'Not a Replacement for Professional Care',
    body: 'Our AI assistant provides support and information, but it cannot diagnose conditions or replace therapy with a qualified mental health professional.',
  },
  {
    icon: Shield,
    bg: '#E8F0EC',
    iconColor: '#6B9080',
    title: 'Your Privacy Matters',
    body: 'Conversations are encrypted and confidential. We don\'t share your chat data with third parties. You can delete your conversation history at any time.',
  },
  {
    icon: Phone,
    bg: '#FEE2E2',
    iconColor: '#DC2626',
    title: 'Crisis Escalation',
    body: 'If you indicate you\'re in danger, we\'ll immediately provide crisis resources and recommend contacting our 24/7 helpline or emergency services.',
  },
  {
    icon: Users,
    bg: '#E0F2F2',
    iconColor: '#3D8B8B',
    title: 'Human Counselors Available',
    body: 'If you need to speak with a human counselor, our team is available. We can connect you through WhatsApp, phone, or in-person appointments.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Assistant() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/* SECTION 1 — Hero                                             */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden bg-[#FDF8F3] pt-24"
        style={{ minHeight: '40vh' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: 'url(/ai-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F3]/60 via-[#FDF8F3]/80 to-[#FDF8F3]" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center sm:py-20 lg:py-24">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeDefault }}
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]"
          >
            AI Mental Health Assistant
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeDramatic }}
            className="font-display text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#1C1917] sm:text-[56px] lg:text-[64px]"
          >
            Someone to talk to, anytime
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeDefault }}
            className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-[#57534E]"
          >
            Our AI assistant is trained to provide emotional support, mental health information, and guidance. Available 24/7, confidential, and always here to listen.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easeDefault }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.4, ease: easeDefault }}
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm border border-[#E7E5E4]"
              >
                <badge.icon className="h-3.5 w-3.5 text-[#DC2626]" />
                <span className="text-xs font-medium text-[#57534E]">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Chat Interface                                   */}
      {/* ============================================================ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            custom={0}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Capabilities                                     */}
      {/* ============================================================ */}
      <section className="bg-[#F5EDE4] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center lg:mb-16">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]"
            >
              What I Can Help With
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpLarge}
              custom={0.1}
              className="font-display text-[32px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1C1917] sm:text-[40px] lg:text-[48px]"
            >
              Support for your mental wellbeing
            </motion.h2>
          </div>

          {/* Capability Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                custom={i * 0.1}
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl bg-white p-6 sm:p-8 border border-[#E7E5E4] hover:border-[#FEE2E2] transition-colors duration-300"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2]">
                  <cap.icon className="h-7 w-7 text-[#DC2626] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#292524]">{cap.title}</h3>
                <p className="text-sm leading-relaxed text-[#57534E]">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Limitations & Safety                             */}
      {/* ============================================================ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]"
            >
              Important Information
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpLarge}
              custom={0.1}
              className="font-display text-[28px] font-bold leading-[1.2] text-[#1C1917] sm:text-[36px]"
            >
              Understanding AI-assisted support
            </motion.h2>
          </div>

          {/* Safety Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {safetyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                custom={i * 0.15}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-7"
                style={{ backgroundColor: card.bg }}
              >
                <card.icon
                  className="mb-4 h-8 w-8"
                  style={{ color: card.iconColor }}
                />
                <h3 className="mb-2 text-lg font-semibold text-[#292524]">{card.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#57534E]">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Alternative Support CTA                          */}
      {/* ============================================================ */}
      <section className="bg-[#1C1917] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0}
          >
            <MessageCircle className="mx-auto mb-6 h-12 w-12 text-[#DC2626]" />
            <h2 className="font-display text-[28px] font-bold text-white sm:text-[36px] lg:text-[40px]">
              Prefer talking to a person?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A8A29E]">
              Our network of qualified counselors is ready to help. Professional, confidential, and compassionate support.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0.2}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Find a Counselor — Primary */}
            <Link
              to="/find-support"
              className="inline-flex items-center rounded-lg bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white shadow-[0_4px_12px_rgba(220,38,38,0.3)] transition-all duration-250 hover:bg-[#B91C1C] hover:scale-[1.02] active:scale-[0.98]"
            >
              Find a Counselor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            {/* Chat on WhatsApp */}
            <a
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg px-7 py-3.5 text-base font-semibold text-white transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: '#25D366',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              }}
            >
              Chat on WhatsApp
              <MessageCircle className="ml-2 h-4 w-4" />
            </a>

            {/* Call Helpline — Ghost */}
            <a
              href="tel:0800-MENTAL-HELP"
              className="inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Helpline
            </a>
          </motion.div>

          {/* Quick reassurance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.4}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#A8A29E]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#6B9080]" />
              Free & Confidential
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#6B9080]" />
              Available 24/7
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#6B9080]" />
              Qualified Professionals
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
