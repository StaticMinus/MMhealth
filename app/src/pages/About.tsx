import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  Heart,
  Globe,
  Users,
  Shield,
  TrendingUp,
  Building,
  Stethoscope,
  ArrowRight,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const fadeUpLarge = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.87, 0, 0.13, 1] as [number, number, number, number] },
  }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
}

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => {
    if (target >= 1000) {
      return Math.floor(v).toLocaleString()
    }
    return Math.floor(v).toString()
  })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      })
      const unsub = rounded.on('change', (v) => setDisplay(v))
      return () => {
        controls.stop()
        unsub()
      }
    }
  }, [isInView, target, duration, count, rounded])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* ─── Section Wrapper ─── */
function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('w-full', className)}>
      {children}
    </section>
  )
}

/* ─── Mission Point ─── */
function MissionPoint({ icon: Icon, text }: { icon: typeof Heart; text: string }) {
  return (
    <div className="flex items-start gap-4 border-l-2 border-[#E7E5E4] pl-4">
      <Icon className="mt-0.5 h-6 w-6 shrink-0" style={{ color: '#DC2626' }} />
      <p className="text-base font-normal text-[#44403C] leading-relaxed">{text}</p>
    </div>
  )
}

/* ─── Value Card ─── */
function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Heart
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE2E2]">
        <Icon className="h-5 w-5 text-[#DC2626]" />
      </div>
      <h4 className="mt-4 text-base font-semibold text-[#1C1917]">{title}</h4>
      <p className="mt-1 text-sm font-normal text-[#57534E] leading-relaxed">{description}</p>
    </div>
  )
}

/* ─── Timeline Data ─── */
const timelineData = [
  {
    year: '2018',
    title: 'Foundation',
    description: 'Red Aid Nigeria was founded with a mission to address the mental health crisis in underserved communities.',
  },
  {
    year: '2019',
    title: 'First Pilot',
    description: 'Launched our first psychosocial support program in 3 states, reaching 2,000 beneficiaries.',
  },
  {
    year: '2020',
    title: 'Digital Platform',
    description: 'Developed our digital assessment platform to reach communities during the pandemic.',
  },
  {
    year: '2021',
    title: 'WhatsApp Integration',
    description: 'Introduced WhatsApp-based support, increasing accessibility for rural communities.',
  },
  {
    year: '2022',
    title: 'National Expansion',
    description: 'Expanded services to all 36 states, with support in 50+ languages.',
  },
  {
    year: '2023',
    title: 'AI Assistant Launch',
    description: 'Launched our AI-powered mental health assistant to provide 24/7 support.',
  },
  {
    year: '2024',
    title: '50,000 Beneficiaries',
    description: 'Reached over 50,000 beneficiaries and completed 25,000+ mental health assessments.',
  },
]

/* ─── Timeline Entry ─── */
function TimelineEntry({
  year,
  title,
  description,
  index,
}: {
  year: string
  title: string
  description: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex w-full items-center md:justify-center">
      {/* Center dot */}
      <div className="absolute left-4 md:left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#DC2626]" />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        animate={isInView ? { opacity: 1, x: isLeft ? -20 : 20, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className={cn(
          'ml-10 md:ml-0 w-[calc(100%-3rem)] md:w-[45%] rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
          isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'
        )}
      >
        <span className="font-accent text-2xl font-semibold text-[#DC2626]">{year}</span>
        <h4 className="mt-1 text-lg font-semibold text-[#1C1917]">{title}</h4>
        <p className="mt-2 text-[15px] font-normal text-[#44403C] leading-relaxed">{description}</p>
      </motion.div>
    </div>
  )
}

/* ─── Team Member Data ─── */
const teamMembers = [
  {
    name: 'Dr. Aisha Mohammed',
    role: 'Founder & CEO',
    bio: 'Public health specialist with 15 years experience in mental health policy and community health programs across West Africa.',
    initials: 'AM',
    color: '#DC2626',
  },
  {
    name: 'Dr. Chukwuemeka Okafor',
    role: 'Medical Director',
    bio: 'Consultant psychiatrist leading our clinical programs and counselor training initiatives.',
    initials: 'CO',
    color: '#6B9080',
  },
  {
    name: 'Fatima Abdullahi',
    role: 'Head of Operations',
    bio: 'Operations expert managing our nationwide network of counselors and support services.',
    initials: 'FA',
    color: '#3D8B8B',
  },
  {
    name: 'Samuel Adeyemi',
    role: 'Technology Lead',
    bio: 'Software architect driving our digital platform, AI assistant, and WhatsApp integration.',
    initials: 'SA',
    color: '#D97706',
  },
  {
    name: 'Blessing Okonkwo',
    role: 'Community Outreach',
    bio: 'Social worker leading community engagement and partnership development across Nigeria.',
    initials: 'BO',
    color: '#6B9080',
  },
  {
    name: 'Dr. Hauwa Ibrahim',
    role: 'Research Director',
    bio: 'Mental health researcher overseeing our assessment tools, data analytics, and impact measurement.',
    initials: 'HI',
    color: '#DC2626',
  },
]

/* ─── Team Card ─── */
function TeamCard({
  member,
}: {
  member: (typeof teamMembers)[0]
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        variants={scaleIn}
        className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-[3px] border-white text-3xl font-semibold text-white shadow-lg"
        style={{ backgroundColor: member.color }}
      >
        {member.initials}
      </motion.div>
      <h4 className="mt-4 text-lg font-semibold text-[#1C1917]">{member.name}</h4>
      <p className="text-sm font-medium text-[#DC2626]">{member.role}</p>
      <p className="mt-2 max-w-[240px] text-sm font-normal text-[#57534E] leading-relaxed">
        {member.bio}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <a
          href="#"
          className="text-[#A8A29E] transition-colors duration-200 hover:text-[#DC2626]"
          aria-label={`${member.name} LinkedIn`}
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-[#A8A29E] transition-colors duration-200 hover:text-[#DC2626]"
          aria-label={`${member.name} Twitter`}
        >
          <Twitter className="h-5 w-5" />
        </a>
      </div>
    </motion.div>
  )
}

/* ─── Partner Data ─── */
const partnerCategories = [
  {
    icon: Users,
    title: 'NGOs & Civil Society',
    partners: [
      'Mental Health Foundation Nigeria',
      'She Writes Woman',
      'Mentally Aware Nigeria Initiative',
      'Love, Peace & Mental Health Foundation',
      'Project ENABLE',
    ],
    color: '#DC2626',
  },
  {
    icon: Building,
    title: 'Government & Policy',
    partners: [
      'Federal Ministry of Health',
      'National Primary Health Care',
      'State Ministries of Health',
      'National Health Insurance Scheme',
    ],
    color: '#6B9080',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare & Development',
    partners: [
      'World Health Organization (WHO)',
      'UNICEF Nigeria',
      'International Medical Corps',
      'Society for Family Health',
    ],
    color: '#3D8B8B',
  },
]

/* ─── Partner Category Card ─── */
function PartnerCard({
  category,
}: {
  category: (typeof partnerCategories)[0]
}) {
  const Icon = category.icon
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-2xl border border-[#E7E5E4] bg-white p-8 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      <Icon className="h-10 w-10" style={{ color: category.color }} />
      <h4 className="mt-4 text-xl font-semibold text-[#1C1917]">{category.title}</h4>
      <ul className="mt-4 space-y-2">
        {category.partners.map((partner) => (
          <li key={partner} className="text-[15px] font-normal text-[#44403C]">
            {partner}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════ */
export default function About() {
  return (
    <div className="w-full">
      {/* ─── Section 1: Hero ─── */}
      <Section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/about-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,25,23,0.85)] to-[rgba(28,25,23,0.7)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <motion.p
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]"
          >
            About Red Aid Nigeria
          </motion.p>
          <motion.h1
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeUpLarge}
            className="mx-auto mt-4 max-w-[700px] font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Compassionate care for every community
          </motion.h1>
          <motion.p
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mt-5 max-w-[560px] text-lg font-normal text-[#A8A29E] leading-relaxed"
          >
            We believe everyone deserves access to mental health support — regardless of language,
            location, or circumstance.
          </motion.p>
        </div>
      </Section>

      {/* ─── Section 2: Mission & Vision ─── */}
      <Section className="bg-[#FDF8F3] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInLeft}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]">
                Our Mission
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-[#1C1917] md:text-3xl lg:text-4xl">
                To provide accessible, culturally sensitive mental health support to all Nigerians
              </h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}
                className="mt-8 space-y-5"
              >
                <motion.div variants={staggerItem}>
                  <MissionPoint
                    icon={Heart}
                    text="Deliver free, confidential mental health screening and support services"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <MissionPoint
                    icon={Globe}
                    text="Break language and cultural barriers through multilingual resources"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <MissionPoint
                    icon={Users}
                    text="Build community resilience through education and awareness"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <MissionPoint
                    icon={Shield}
                    text="Uphold the highest standards of privacy and data protection"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: Vision */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInRight}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]">
                Our Vision
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-[#1C1917] md:text-3xl lg:text-4xl">
                A Nigeria where mental health is understood, supported, and accessible to all
              </h2>
              <p className="mt-5 text-lg font-normal text-[#57534E] leading-relaxed">
                We envision a future where every Nigerian — from the bustling streets of Lagos to
                the rural communities of Borno — has access to compassionate mental health care. A
                future where seeking help is seen as strength, not weakness. Where technology bridges
                gaps and human connection heals wounds.
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <motion.div variants={staggerItem}>
                  <ValueCard
                    icon={Heart}
                    title="Compassion"
                    description="Every interaction is guided by empathy and care"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ValueCard
                    icon={Shield}
                    title="Integrity"
                    description="We uphold the highest ethical standards"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ValueCard
                    icon={Users}
                    title="Inclusion"
                    description="Mental health support for everyone, everywhere"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ValueCard
                    icon={TrendingUp}
                    title="Innovation"
                    description="Leveraging technology to expand access"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── Section 3: Timeline ─── */}
      <Section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]"
            >
              Our Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              Key milestones in our story
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative mt-12 md:mt-16">
            {/* Center line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#DC2626] md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8">
              {timelineData.map((entry, i) => (
                <TimelineEntry
                  key={entry.year}
                  year={entry.year}
                  title={entry.title}
                  description={entry.description}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Section 4: Team ─── */}
      <Section className="bg-[#F5EDE4] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]"
            >
              Our Team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              Meet the people behind the mission
            </motion.h2>
          </div>

          {/* Team Photo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="mt-8 overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src="/about-team.jpg"
              alt="Red Aid Nigeria team"
              className="h-[250px] w-full object-cover sm:h-[300px] md:h-[400px]"
            />
          </motion.div>

          {/* Team Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── Section 5: Impact Stats ─── */}
      <Section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]"
            >
              Impact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              The difference we&apos;ve made
            </motion.h2>
          </div>

          {/* Primary Stats Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
            className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {[
              { stat: 50000, suffix: '+', label: 'Lives touched', color: '#DC2626' },
              { stat: 25000, suffix: '+', label: 'Assessments completed', color: '#6B9080' },
              { stat: 36, suffix: '', label: 'States reached', color: '#3D8B8B' },
              { stat: 100, suffix: '+', label: 'Languages supported', color: '#DC2626' },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="relative flex flex-col items-center text-center"
              >
                <span
                  className="font-accent text-4xl font-semibold md:text-5xl lg:text-6xl"
                  style={{ color: item.color }}
                >
                  <AnimatedCounter target={item.stat} suffix={item.suffix} duration={2.5} />
                </span>
                <span className="mt-2 text-base font-normal text-[#57534E]">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Secondary Stats Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
            }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {[
              { stat: 5000, suffix: '+', label: 'Counseling referrals made' },
              { stat: 85, suffix: '%', label: 'Beneficiaries report improved wellbeing' },
              { stat: 200, suffix: '+', label: 'Trained mental health volunteers' },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="flex flex-col items-center text-center"
              >
                <span className="font-accent text-4xl font-semibold text-[#1C1917] md:text-5xl">
                  <AnimatedCounter target={item.stat} suffix={item.suffix} duration={2} />
                </span>
                <span className="mt-2 text-base font-normal text-[#57534E]">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="mt-16 rounded-[20px] bg-[#DC2626] p-8 text-center md:p-12"
          >
            <p className="font-display text-xl font-medium italic leading-relaxed text-white md:text-2xl">
              &ldquo;Mental health is not a luxury — it is a fundamental human right. Our work ensures
              that no one is left behind.&rdquo;
            </p>
            <p className="mt-4 text-base font-normal text-white/80">
              — Dr. Aisha Mohammed, Founder &amp; CEO
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ─── Section 6: Partners ─── */}
      <Section className="bg-[#FDF8F3] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]"
            >
              Partners
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              Working together for change
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base font-normal text-[#57534E]"
            >
              We collaborate with organizations that share our commitment to mental health and
              psychosocial support.
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {partnerCategories.map((cat) => (
              <PartnerCard key={cat.title} category={cat} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── Section 7: CTA Banner ─── */}
      <Section className="bg-[#1C1917] py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Join us in making mental health support accessible to all
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-base font-normal text-[#A8A29E]">
              Whether you&apos;re seeking support, want to volunteer, or represent an organization —
              we&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/assessment"
                className="inline-flex items-center rounded-lg bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white transition-all duration-250 hover:bg-[#B91C1C] hover:scale-[1.02] hover:shadow-primary active:scale-[0.98]"
              >
                Get Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-white/10"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
