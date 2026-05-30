import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Stethoscope,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  HandHeart,
  ChevronDown,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageSquare,
  Send,
  Loader2,
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
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
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

/* ─── Contact Card Data ─── */
const contactCards = [
  {
    icon: Mail,
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    title: 'General Inquiries',
    contact: 'info@redaidnigeria.org',
    href: 'mailto:info@redaidnigeria.org',
    hours: 'Monday–Friday, 9am–5pm WAT',
    type: 'email' as const,
  },
  {
    icon: Stethoscope,
    iconBg: '#E8F0EC',
    iconColor: '#6B9080',
    title: 'Support & Counseling',
    contact: 'support@redaidnigeria.org',
    href: 'mailto:support@redaidnigeria.org',
    hours: '24/7 Availability',
    type: 'email' as const,
  },
  {
    icon: MessageSquare,
    iconBg: '#DCFCE7',
    iconColor: '#25D366',
    title: 'WhatsApp',
    contact: '+234-800-HELP-NOW',
    href: 'https://wa.me/2348004357669',
    hours: 'Instant messaging support',
    type: 'whatsapp' as const,
  },
  {
    icon: Phone,
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    title: 'Crisis Hotline',
    contact: '0800-MENTAL-HELP',
    href: 'tel:08006368254357',
    hours: '24/7 Emergency support',
    type: 'phone' as const,
  },
]

/* ─── Contact Card ─── */
function ContactCard({
  card,
}: {
  card: (typeof contactCards)[0]
}) {
  const Icon = card.icon
  return (
    <motion.div
      variants={scaleIn}
      className="group flex flex-col items-center rounded-2xl border border-[#E7E5E4] bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: card.iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: card.iconColor }} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#1C1917]">{card.title}</h3>
      <a
        href={card.href}
        className={cn(
          'mt-2 text-[15px] font-medium transition-colors duration-200',
          card.type === 'email' && 'text-[#3D8B8B] hover:text-[#2A6868]',
          card.type === 'whatsapp' && 'text-[#25D366] hover:text-[#1DA851]',
          card.type === 'phone' && 'text-[#DC2626] hover:text-[#B91C1C]'
        )}
      >
        {card.contact}
      </a>
      <p className="mt-2 text-sm font-normal text-[#A8A29E]">{card.hours}</p>
    </motion.div>
  )
}

/* ─── Office Location Data ─── */
const officeLocations = [
  {
    city: 'Abuja (FCT)',
    address: '123 Community Health Drive, CBD',
    phone: '0800-MENTAL-HELP',
    badge: 'Head Office',
    badgeColor: '#DC2626',
  },
  {
    city: 'Lagos',
    address: '45 Wellness Avenue, Ikeja',
    phone: '0800-MENTAL-HELP',
    badge: 'Regional Office',
    badgeColor: '#6B9080',
  },
  {
    city: 'Kano',
    address: '78 Support Street, City Centre',
    phone: '0800-MENTAL-HELP',
    badge: 'Regional Office',
    badgeColor: '#3D8B8B',
  },
]

/* ─── Office Card ─── */
function OfficeCard({
  office,
}: {
  office: (typeof officeLocations)[0]
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="group overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1"
    >
      {/* Map Placeholder */}
      <div className="relative h-[200px] w-full bg-[#F5EDE4] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-[#DC2626]" />
            <p className="mt-2 text-sm font-medium text-[#57534E]">{office.city}</p>
          </div>
        </div>
        {/* Decorative map pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#57534E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#grid)" />
          <circle cx="200" cy="100" r="40" fill="#6B9080" opacity="0.3" />
          <circle cx="150" cy="80" r="20" fill="#3D8B8B" opacity="0.2" />
          <circle cx="260" cy="120" r="15" fill="#DC2626" opacity="0.2" />
        </svg>
        {/* Badge */}
        <div
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: office.badgeColor }}
        >
          {office.badge}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold text-[#1C1917]">{office.city}</h4>
        <div className="mt-3 flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A8A29E]" />
          <p className="text-[15px] font-normal text-[#57534E]">{office.address}</p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-[#A8A29E]" />
          <a href={`tel:${office.phone.replace(/-/g, '')}`} className="text-[15px] font-medium text-[#3D8B8B] hover:text-[#2A6868] transition-colors">
            {office.phone}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Subject Options ─── */
const subjectOptions = [
  'General Inquiry',
  'Mental Health Support',
  'Partnership Opportunity',
  'Volunteer / Join Us',
  'Media & Press',
  'Technical Support',
  'Feedback',
  'Other',
]

/* ═══════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════ */
export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shake, setShake] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Please enter your name'
    if (!formData.email.trim()) newErrors.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.subject) newErrors.subject = 'Please select a subject'
    if (!formData.message.trim()) newErrors.message = 'Please enter a message'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setFormState('sending')
    // Simulate API call
    setTimeout(() => {
      setFormState('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <div className="w-full">
      {/* ─── Section 1: Hero ─── */}
      <Section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/contact-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,25,23,0.8)] to-[rgba(28,25,23,0.65)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <motion.p
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.1em] text-[#DC2626]"
          >
            Contact Us
          </motion.p>
          <motion.h1
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUpLarge}
            className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            We&apos;re here to help
          </motion.h1>
          <motion.p
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mt-5 max-w-[560px] text-lg font-normal text-[#A8A29E] leading-relaxed"
          >
            Whether you have a question, need support, or want to partner with us, we&apos;d love to
            hear from you.
          </motion.p>
        </div>
      </Section>

      {/* ─── Section 2: Crisis Support Banner ─── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="w-full bg-[#991B1B] py-8"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AlertTriangle className="mx-auto h-8 w-8 text-white" />
          <h2 className="mt-3 font-display text-xl font-bold text-white md:text-2xl">
            If you&apos;re in crisis, reach out now
          </h2>
          <p className="mt-2 font-accent text-2xl font-semibold text-white md:text-3xl animate-pulse-crisis">
            0800-MENTAL-HELP
          </p>
          <p className="mt-1 text-sm font-normal text-white/80">
            24/7 Crisis Support — Free &amp; Confidential
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:08006368254357"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#991B1B] transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
            <a
              href="https://wa.me/2348004357669"
              className="inline-flex items-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp Crisis Line
            </a>
          </div>
        </div>
      </motion.div>

      {/* ─── Section 3: Contact Cards ─── */}
      <Section className="bg-[#FDF8F3] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.15em] text-[#DC2626]"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              How would you like to reach us?
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactCards.map((card) => (
              <ContactCard key={card.title} card={card} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── Section 4: Contact Form ─── */}
      <Section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left: Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInLeft}
              className="lg:col-span-3"
            >
              <h2 className="font-display text-2xl font-bold text-[#1C1917] md:text-3xl lg:text-4xl">
                Send us a message
              </h2>
              <p className="mt-3 text-base font-normal text-[#57534E]">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <motion.form
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                onSubmit={handleSubmit}
                className={cn('mt-8 space-y-5', shake && 'animate-pulse-crisis')}
                noValidate
              >
                {/* Name */}
                <motion.div variants={staggerItem}>
                  <label htmlFor="name" className="block text-sm font-medium text-[#292524]">
                    Full Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your full name"
                    className={cn(
                      'mt-1.5 w-full rounded-[10px] border bg-white px-4 py-3.5 text-base font-normal text-[#1C1917] placeholder:text-[#A8A29E] transition-all duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)]',
                      errors.name
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#E7E5E4] focus:border-[#DC2626]'
                    )}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1 text-[13px] font-normal text-[#DC2626]"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email */}
                <motion.div variants={staggerItem}>
                  <label htmlFor="email" className="block text-sm font-medium text-[#292524]">
                    Email Address <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                      'mt-1.5 w-full rounded-[10px] border bg-white px-4 py-3.5 text-base font-normal text-[#1C1917] placeholder:text-[#A8A29E] transition-all duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)]',
                      errors.email
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#E7E5E4] focus:border-[#DC2626]'
                    )}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1 text-[13px] font-normal text-[#DC2626]"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone */}
                <motion.div variants={staggerItem}>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#292524]">
                    Phone Number <span className="text-[#A8A29E]">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="mt-1.5 w-full rounded-[10px] border border-[#E7E5E4] bg-white px-4 py-3.5 text-base font-normal text-[#1C1917] placeholder:text-[#A8A29E] transition-all duration-200 focus:border-[#DC2626] focus:outline-none focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)]"
                  />
                </motion.div>

                {/* Subject */}
                <motion.div variants={staggerItem} className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-[#292524]">
                    Subject <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={cn(
                      'mt-1.5 w-full appearance-none rounded-[10px] border bg-white px-4 py-3.5 text-base font-normal text-[#1C1917] transition-all duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)]',
                      errors.subject
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#E7E5E4] focus:border-[#DC2626]',
                      !formData.subject && 'text-[#A8A29E]'
                    )}
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-[#1C1917]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-[42px] h-5 w-5 text-[#A8A29E]" />
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1 text-[13px] font-normal text-[#DC2626]"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Message */}
                <motion.div variants={staggerItem}>
                  <label htmlFor="message" className="block text-sm font-medium text-[#292524]">
                    Message <span className="text-[#DC2626]">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className={cn(
                      'mt-1.5 w-full min-h-[160px] resize-y rounded-[10px] border bg-white px-4 py-3.5 text-base font-normal text-[#1C1917] placeholder:text-[#A8A29E] transition-all duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)]',
                      errors.message
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#E7E5E4] focus:border-[#DC2626]'
                    )}
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[13px] font-normal text-[#DC2626]"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span className="ml-auto text-xs font-normal text-[#A8A29E]">
                      {formData.message.length} chars
                    </span>
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.div variants={staggerItem}>
                  <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3 rounded-lg bg-[#E8F0EC] py-4 text-base font-semibold text-[#6B9080]"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Message sent! We&apos;ll be in touch.
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit"
                        type="submit"
                        disabled={formState === 'sending'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          'inline-flex w-full items-center justify-center rounded-lg bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white transition-all duration-250 hover:bg-[#B91C1C] hover:scale-[1.01] hover:shadow-primary active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100'
                        )}
                      >
                        {formState === 'sending' ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={slideInRight}
              custom={0.2}
              className="lg:col-span-2"
            >
              {/* Office Address */}
              <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2]">
                    <MapPin className="h-5 w-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1C1917]">Head Office</h4>
                    <div className="mt-2 space-y-1 text-[15px] font-normal text-[#57534E]">
                      <p>Red Aid Nigeria</p>
                      <p>123 Community Health Drive</p>
                      <p>Central Business District</p>
                      <p>Abuja, FCT, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-base font-semibold text-[#1C1917]">Follow Us</h4>
                <div className="mt-4 flex items-center gap-3">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Youtube, label: 'YouTube' },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F4] text-[#57534E] transition-all duration-200 hover:bg-[#DC2626] hover:text-white hover:scale-110"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Partnership Note */}
              <div className="mt-8 flex items-start gap-3 rounded-xl bg-[#E8F0EC] p-5">
                <HandHeart className="mt-0.5 h-6 w-6 shrink-0 text-[#6B9080]" />
                <p className="text-sm font-normal text-[#44403C] leading-relaxed">
                  Interested in partnering with us? Email{' '}
                  <a
                    href="mailto:partnerships@redaidnigeria.org"
                    className="font-medium text-[#3D8B8B] hover:text-[#2A6868] transition-colors"
                  >
                    partnerships@redaidnigeria.org
                  </a>{' '}
                  directly.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#F5EDE4]">
                <div className="relative h-[250px] w-full">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250">
                    {/* Simplified Nigeria map outline */}
                    <path
                      d="M180,20 L220,25 L250,40 L270,60 L280,90 L290,120 L285,150 L270,180 L250,200 L220,210 L190,215 L160,210 L130,200 L110,180 L100,150 L95,120 L100,90 L115,60 L140,40 L160,25 Z"
                      fill="#E8DDD0"
                      stroke="#A8A29E"
                      strokeWidth="1.5"
                    />
                    {/* State-like divisions */}
                    <path
                      d="M180,20 L220,25 L250,40 L270,60 L280,90 L290,120 L285,150 L270,180 L250,200 L220,210 L190,215 L160,210 L130,200 L110,180 L100,150 L95,120 L100,90 L115,60 L140,40 L160,25 Z"
                      fill="none"
                      stroke="#D6CFC7"
                      strokeWidth="0.5"
                      strokeDasharray="4,4"
                    />
                    {/* Location dots */}
                    <circle cx="200" cy="110" r="6" fill="#DC2626" />
                    <circle cx="150" cy="170" r="5" fill="#6B9080" />
                    <circle cx="240" cy="80" r="5" fill="#3D8B8B" />
                    {/* Labels */}
                    <text x="210" y="105" fontSize="8" fill="#57534E" fontFamily="Inter, sans-serif">Abuja</text>
                    <text x="120" y="175" fontSize="7" fill="#57534E" fontFamily="Inter, sans-serif">Lagos</text>
                    <text x="250" y="75" fontSize="7" fill="#57534E" fontFamily="Inter, sans-serif">Kano</text>
                  </svg>
                  <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-[#57534E] backdrop-blur-sm">
                    Our locations across Nigeria
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── Section 5: Office Locations ─── */}
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
              Our Offices
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold text-[#1C1917] md:text-4xl lg:text-5xl"
            >
              Find us across Nigeria
            </motion.h2>
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
            {officeLocations.map((office) => (
              <OfficeCard key={office.city} office={office} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── Section 6: FAQ CTA ─── */}
      <Section className="bg-[#1C1917] py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Have more questions?
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-base font-normal text-[#A8A29E]">
              Visit our resources page for more information, or chat with our AI assistant for
              instant answers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/resources"
                className="inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-white/10"
              >
                Browse Resources
              </Link>
              <Link
                to="/ai-assistant"
                className="inline-flex items-center rounded-lg bg-[#DC2626] px-7 py-3.5 text-base font-semibold text-white transition-all duration-250 hover:bg-[#B91C1C] hover:scale-[1.02] hover:shadow-primary active:scale-[0.98]"
              >
                Chat with AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
