import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ClipboardCheck,
  Phone,
  Shield,
  Globe,
  Clock,
  Heart,
  BookOpen,
  Play,
  Headphones,
  FileText,
  ArrowRight,
  Star,
  Info,
  X,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const fadeUpLarge = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

/* ------------------------------------------------------------------ */
/*  Section 1: Announcement Bar                                       */
/* ------------------------------------------------------------------ */

function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="w-full bg-[#FDF8F3] border-b border-[#E7E5E4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-6 overflow-hidden">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#44403C] truncate">
              <Info className="h-3.5 w-3.5 shrink-0 text-[#57534E]" />
              Free mental health support available 24/7
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-[#DC2626] truncate">
              Need help now? Call{' '}
              <a href="tel:08094455221" className="underline underline-offset-2">
                0809 445 5221
              </a>
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-full p-1 text-[#57534E] hover:bg-[#E7E5E4] transition-colors shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2: Hero                                                   */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-80px)] bg-[#FDF8F3] pt-[80px]">
      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row min-h-[calc(100dvh-80px)]">
          {/* Left: Content */}
          <div className="flex flex-col justify-center py-12 lg:py-0 lg:w-[55%] lg:pr-8 relative z-10">
            <motion.h1
              {...fadeUpLarge}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.87, 0, 0.13, 1] as [number, number, number, number] }}
              className="font-display text-[48px] lg:text-[96px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1C1917] max-w-[600px]"
            >
              Your mental health matters. We're here to help.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              className="mt-6 text-base lg:text-lg leading-[1.7] text-[#57534E] max-w-[520px]"
            >
              Red Aid Nigeria provides free, confidential mental health screening, psychosocial support, and resources to communities across Nigeria — in your language, on your terms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/assessment"
                className="inline-flex items-center rounded-lg bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#B91C1C] hover:scale-[1.02] hover:shadow-primary active:scale-[0.98] transition-all duration-250"
              >
                <ClipboardCheck className="mr-2 h-5 w-5" />
                Take Free Assessment
              </Link>
              <a
                href="https://wa.me/2348094455221"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-[#25D366] px-7 py-3.5 text-base font-semibold text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 shadow-whatsapp"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              transition={{ delayChildren: 1.0, staggerChildren: 0.1 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8"
            >
              {[
                { icon: Shield, label: '100% Confidential' },
                { icon: Globe, label: '100+ Languages' },
                { icon: Clock, label: 'Available 24/7' },
                { icon: Heart, label: 'Free Forever' },
              ].map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <badge.icon className="h-5 w-5 text-[#6B9080] shrink-0" />
                  <span className="text-[13px] font-medium text-[#57534E]">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <div className="lg:w-[45%] relative">
            {/* Gradient overlay for blending */}
            <div
              className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
              style={{
                background: 'linear-gradient(to right, rgba(253,248,243,0.9) 0%, rgba(253,248,243,0.3) 40%, transparent 60%)',
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              className="relative h-[50vh] lg:h-full w-full lg:absolute lg:inset-0"
            >
              <img
                src="/hero-main.jpg"
                alt="Nigerian community gathering"
                className="h-full w-full object-cover lg:object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3: Services / How It Works                                */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const services = [
    {
      icon: ClipboardCheck,
      iconBg: 'bg-[#FEE2E2]',
      iconColor: 'text-[#DC2626]',
      title: 'Take a Screening',
      body: 'Complete a confidential PHQ-9 assessment to understand your mental wellbeing. Get instant results and personalized recommendations.',
      cta: 'Start Assessment',
      ctaLink: '/assessment',
      ctaStyle: 'primary' as const,
      badge: 'Takes 3 minutes',
    },
    {
      icon: BookOpen,
      iconBg: 'bg-[#E0F2F2]',
      iconColor: 'text-[#3D8B8B]',
      title: 'Browse Resources',
      body: 'Explore our library of mental health articles, guides, videos, and audio resources tailored for the Nigerian community.',
      cta: 'View Resources',
      ctaLink: '/resources',
      ctaStyle: 'secondary' as const,
      badge: 'Free Access',
    },
    {
      icon: Phone,
      iconBg: 'bg-[#FEE2E2]',
      iconColor: 'text-[#DC2626]',
      title: 'Talk to Someone',
      body: 'Reach out to our support team via phone or WhatsApp. Speak with trained counselors who understand your needs.',
      cta: 'Get in Touch',
      ctaLink: '/contact',
      ctaStyle: 'secondary' as const,
      badge: 'Available 24/7',
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-[#F5EDE4] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...fadeUp}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]">
            How We Help
          </span>
          <h2 className="mt-4 font-display text-[32px] lg:text-[48px] font-bold leading-[1.1] text-[#1C1917]">
            Three ways to access support
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-[1.7] text-[#57534E] max-w-[600px] mx-auto">
            Choose the path that works best for you. All services are free and confidential.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="bg-white rounded-[20px] p-8 lg:p-10 text-center group hover:shadow-card-hover transition-all duration-300"
            >
              {/* Icon */}
              <div className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full ${service.iconBg} animate-float`}>
                <service.icon className={`h-8 w-8 ${service.iconColor}`} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#1C1917]">{service.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">{service.body}</p>

              {/* CTA */}
              <div className="mt-6">
                {service.ctaStyle === 'primary' ? (
                  <Link
                    to={service.ctaLink}
                    className="inline-flex items-center rounded-lg bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#B91C1C] hover:scale-[1.02] active:scale-[0.98] transition-all duration-250"
                  >
                    {service.cta}
                  </Link>
                ) : (
                  <Link
                    to={service.ctaLink}
                    className="inline-flex items-center rounded-lg border-2 border-[#DC2626] px-5 py-2.5 text-sm font-semibold text-[#DC2626] hover:bg-[#FEE2E2] active:scale-[0.98] transition-all duration-250"
                  >
                    {service.cta}
                  </Link>
                )}
              </div>

              {/* Badge */}
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-[#E8F0EC] px-3 py-1 text-xs font-medium text-[#6B9080]">
                  {service.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4: Resources Preview                                      */
/* ------------------------------------------------------------------ */

function ResourcesSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const resources = [
    {
      image: '/resource-article-1.jpg',
      category: 'Depression',
      catColor: 'bg-[#FEE2E2] text-[#DC2626]',
      title: 'Understanding Depression: Signs, Symptoms, and Support',
      excerpt: 'Learn to recognize the signs of depression and discover pathways to support and recovery.',
      icon: FileText,
      type: 'Article',
      duration: '5 min read',
    },
    {
      image: '/resource-article-2.jpg',
      category: 'Emotional Resilience',
      catColor: 'bg-[#E8F0EC] text-[#6B9080]',
      title: 'Building Emotional Resilience in Challenging Times',
      excerpt: 'Practical strategies to strengthen your emotional wellbeing and cope with life\'s difficulties.',
      icon: BookOpen,
      type: 'Guide',
      duration: '8 min read',
    },
    {
      image: '/resource-article-3.jpg',
      category: 'Youth Mental Health',
      catColor: 'bg-[#E0F2F2] text-[#3D8B8B]',
      title: 'Supporting Young People Through Mental Health Challenges',
      excerpt: 'A comprehensive guide for parents, educators, and community leaders.',
      icon: Play,
      type: 'Video',
      duration: '12 min',
    },
    {
      image: '/resource-article-1.jpg',
      category: 'Stress Management',
      catColor: 'bg-[#FEF3C7] text-[#D97706]',
      title: '10 Evidence-Based Stress Management Techniques',
      excerpt: 'Proven methods to reduce stress and improve your daily wellbeing.',
      icon: Headphones,
      type: 'Audio',
      duration: '15 min',
    },
    {
      image: '/resource-article-2.jpg',
      category: 'Suicide Prevention',
      catColor: 'bg-[#FEE2E2] text-[#DC2626]',
      title: 'Suicide Prevention: How to Help Someone in Crisis',
      excerpt: 'Learn the warning signs and how to provide life-saving support to someone at risk.',
      icon: FileText,
      type: 'Article',
      duration: '7 min read',
    },
    {
      image: '/resource-article-3.jpg',
      category: 'Family Wellbeing',
      catColor: 'bg-[#E8F0EC] text-[#6B9080]',
      title: 'Strengthening Family Mental Health and Communication',
      excerpt: 'Build stronger, healthier family relationships through better communication.',
      icon: BookOpen,
      type: 'Guide',
      duration: '10 min read',
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-[#FDF8F3] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...fadeUp}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]">
              Resources
            </span>
            <h2 className="mt-4 font-display text-[32px] lg:text-[48px] font-bold leading-[1.1] text-[#1C1917]">
              Mental health resources for everyone
            </h2>
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center text-[#292524] hover:text-[#DC2626] transition-colors duration-200 text-base font-medium shrink-0"
          >
            View All Resources
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {resources.map((resource, i) => (
            <motion.div
              key={resource.title}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="group bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${resource.catColor}`}>
                  {resource.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#1C1917] leading-snug group-hover:text-[#DC2626] transition-colors">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-[#57534E] leading-relaxed">{resource.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-[13px] text-[#A8A29E]">
                  <resource.icon className="h-3.5 w-3.5" />
                  <span>{resource.type}</span>
                  <span className="mx-1">&middot;</span>
                  <span>{resource.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 7: Testimonials                                           */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const testimonials = [
    {
      quote: "Red Aid Nigeria gave me the courage to seek help. The assessment was simple, and connecting with a counselor changed my life. I'm grateful this service exists in our community.",
      avatar: '/testimonial-1.jpg',
      name: 'Amina K.',
      role: 'Beneficiary, Kano State',
    },
    {
      quote: "As a young person struggling with anxiety, I didn't know where to turn. The AI assistant helped me understand what I was going through, and the resources were incredibly helpful.",
      avatar: '/testimonial-2.jpg',
      name: 'Chinedu O.',
      role: 'Beneficiary, Enugu State',
    },
    {
      quote: "The WhatsApp service made it so easy for my daughter to get support. She felt comfortable chatting from home, and the counselors were compassionate and professional.",
      avatar: '/testimonial-3.jpg',
      name: 'Fatima B.',
      role: 'Parent, Lagos State',
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...fadeUp}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]">
            Stories of Hope
          </span>
          <h2 className="mt-4 font-display text-[32px] lg:text-[48px] font-bold leading-[1.1] text-[#1C1917]">
            Hear from those we've supported
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="bg-[#FDF8F3] rounded-[20px] p-8 hover:bg-white hover:scale-[1.01] transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#D97706] text-[#D97706]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base leading-[1.7] text-[#292524] italic">&ldquo;{t.quote}&rdquo;</p>

              {/* Avatar */}
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <div className="text-base font-semibold text-[#1C1917]">{t.name}</div>
                  <div className="text-sm text-[#57534E]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Home Page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <HeroSection />
      <ServicesSection />
      <ResourcesSection />
      <TestimonialsSection />
    </>
  )
}
