import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  User,
  Users,
  Phone,
  MessageCircle,
  MapPin,
  Globe,
  Star,
  ClipboardCheck,
  Heart,
  CheckCircle,
  AlertTriangle,
  Mail,
  ChevronRight,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface Counselor {
  id: number
  name: string
  title: string
  specialties: string[]
  languages: string[]
  location: string
  state: string
  rating: number
  reviews: number
  availability: 'Available Today' | 'Available Tomorrow' | 'Next Week'
  avatar?: string
}

/* ─────────────────────────────────────────────
   Mock Data
   ───────────────────────────────────────────── */

const counselors: Counselor[] = [
  {
    id: 1,
    name: 'Dr. Emeka Nnamdi',
    title: 'Clinical Psychologist',
    specialties: ['Depression', 'Anxiety', 'Trauma'],
    languages: ['English', 'Igbo', 'Yoruba'],
    location: 'Ikeja, Lagos',
    state: 'Lagos',
    rating: 4.9,
    reviews: 127,
    availability: 'Available Today',
  },
  {
    id: 2,
    name: 'Amina Yusuf',
    title: 'Counseling Psychologist',
    specialties: ['Family', 'Youth', 'Stress'],
    languages: ['English', 'Hausa'],
    location: 'Kano Municipal, Kano',
    state: 'Kano',
    rating: 4.8,
    reviews: 93,
    availability: 'Available Tomorrow',
  },
  {
    id: 3,
    name: 'Dr. Blessing Adeleke',
    title: 'Psychiatrist',
    specialties: ['Severe Depression', 'Bipolar', 'Crisis'],
    languages: ['English', 'Yoruba'],
    location: 'Wuse, Abuja',
    state: 'Abuja',
    rating: 4.9,
    reviews: 156,
    availability: 'Available Today',
  },
  {
    id: 4,
    name: 'Samuel Okafor',
    title: 'Mental Health Counselor',
    specialties: ['Anxiety', 'Substance Abuse', 'Grief'],
    languages: ['English', 'Igbo'],
    location: 'Enugu North, Enugu',
    state: 'Enugu',
    rating: 4.7,
    reviews: 78,
    availability: 'Next Week',
  },
  {
    id: 5,
    name: 'Dr. Hauwa Ibrahim',
    title: 'Clinical Psychologist',
    specialties: ['Trauma', 'PTSD', "Women's Health"],
    languages: ['English', 'Hausa', 'Kanuri'],
    location: 'Maiduguri, Borno',
    state: 'Borno',
    rating: 5.0,
    reviews: 201,
    availability: 'Available Today',
  },
  {
    id: 6,
    name: 'Grace Etim',
    title: 'Social Worker',
    specialties: ['Community Support', 'Family', 'Youth'],
    languages: ['English', 'Efik'],
    location: 'Calabar South, Cross River',
    state: 'Cross River',
    rating: 4.8,
    reviews: 64,
    availability: 'Available Tomorrow',
  },
  {
    id: 7,
    name: 'Dr. Oluwaseun Bakare',
    title: 'Psychiatrist',
    specialties: ['Depression', 'Bipolar', 'Schizophrenia'],
    languages: ['English', 'Yoruba'],
    location: 'Ibadan, Oyo',
    state: 'Oyo',
    rating: 4.9,
    reviews: 189,
    availability: 'Available Today',
  },
  {
    id: 8,
    name: 'Fatima Abdullahi',
    title: 'Mental Health Counselor',
    specialties: ['Youth', 'Anxiety', 'Family'],
    languages: ['English', 'Hausa', 'Fulfulde'],
    location: 'Sokoto',
    state: 'Sokoto',
    rating: 4.7,
    reviews: 52,
    availability: 'Next Week',
  },
  {
    id: 9,
    name: 'Dr. Chinedu Obi',
    title: 'Clinical Psychologist',
    specialties: ['Workplace', 'Stress', 'Depression'],
    languages: ['English', 'Igbo'],
    location: 'Port Harcourt, Rivers',
    state: 'Rivers',
    rating: 4.8,
    reviews: 145,
    availability: 'Available Tomorrow',
  },
]

const specialtyFilters = ['All Specialties', 'Depression', 'Anxiety', 'Trauma', 'Family', 'Youth', 'Stress', 'Substance Abuse', 'Crisis']
const stateFilters = ['All Locations', 'Lagos', 'Kano', 'Abuja', 'Enugu', 'Borno', 'Cross River', 'Oyo', 'Sokoto', 'Rivers']
const serviceTypeFilters = ['All Types', 'Psychologists', 'Counselors', 'Psychiatrists', 'Social Workers']

/* ─────────────────────────────────────────────
   Animation helpers
   ───────────────────────────────────────────── */

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

function AvailabilityBadge({ availability }: { availability: Counselor['availability'] }) {
  const colorClass =
    availability === 'Available Today'
      ? 'bg-[#E8F0EC] text-[#6B9080]'
      : availability === 'Available Tomorrow'
        ? 'bg-[#E0F2F2] text-[#3D8B8B]'
        : 'bg-[#FEF3C7] text-[#D97706]'

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      <Calendar className="h-3 w-3 mr-1" />
      {availability}
    </span>
  )
}

function CounselorCard({ counselor, index }: { counselor: Counselor; index: number }) {
  return (
    <motion.div
      custom={index * 0.1}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Photo Area */}
      <div className="relative aspect-[16/10] bg-[#F5EDE4] flex items-center justify-center overflow-hidden">
        <User className="h-16 w-16 text-[#E7E5E4]" />
        <div className="absolute top-3 right-3">
          <AvailabilityBadge availability={counselor.availability} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-[#292524] mb-0.5">{counselor.name}</h3>
        <p className="text-sm font-medium text-[#DC2626] mb-3">{counselor.title}</p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {counselor.specialties.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full bg-[#F5F5F4] text-[#57534E] text-xs font-medium"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Location & Languages */}
        <div className="flex flex-col gap-1.5 text-xs text-[#A8A29E] mb-3">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {counselor.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            {counselor.languages.join(', ')}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(counselor.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-[#E7E5E4]'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-[#292524]">{counselor.rating}</span>
          <span className="text-xs text-[#A8A29E]">({counselor.reviews} reviews)</span>
        </div>

        {/* CTA */}
        <Button className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold rounded-lg hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all duration-250">
          Book Session
        </Button>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main Page Component
   ─═══════════════════════════════════════════ */

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSpecialty, setActiveSpecialty] = useState('All Specialties')
  const [activeState, setActiveState] = useState('All Locations')
  const [activeServiceType, setActiveServiceType] = useState('All Types')

  // Filter counselors
  const filteredCounselors = counselors.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = activeSpecialty === 'All Specialties' || c.specialties.includes(activeSpecialty)
    const matchesState = activeState === 'All Locations' || c.state === activeState
    const matchesServiceType =
      activeServiceType === 'All Types' ||
      (activeServiceType === 'Psychologists' && c.title.includes('Psychologist')) ||
      (activeServiceType === 'Counselors' && c.title.includes('Counselor')) ||
      (activeServiceType === 'Psychiatrists' && c.title.includes('Psychiatrist')) ||
      (activeServiceType === 'Social Workers' && c.title.includes('Social Worker'))
    return matchesSearch && matchesSpecialty && matchesState && matchesServiceType
  })

  const resetFilters = () => {
    setSearchQuery('')
    setActiveSpecialty('All Specialties')
    setActiveState('All Locations')
    setActiveServiceType('All Types')
  }

  return (
    <div className="min-h-[100dvh]">
      {/* ════════════════════════════════════════════
          Section 1: Page Hero
          ════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center min-h-[50dvh] pt-[72px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.82), rgba(28,25,23,0.65)), url(/support-hero.jpg)`,
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-16 lg:py-20">
          {/* Overline */}
          <motion.p
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-4"
          >
            Find Support
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={0.2}
            variants={fadeUpLarge}
            initial="hidden"
            animate="visible"
            className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.08] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Connect with mental health professionals
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-[#A8A29E] max-w-[600px] mx-auto mb-8"
          >
            Browse our network of qualified counselors, psychologists, and support services across Nigeria. Professional, confidential, and compassionate care.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            custom={0.6}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="max-w-[640px] mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A8A29E]" />
              <Input
                type="text"
                placeholder="Search by name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-5 rounded-[28px] bg-white text-[#292524] placeholder:text-[#A8A29E] text-base shadow-[0_4px_16px_rgba(0,0,0,0.1)] focus:shadow-[0_4px_24px_rgba(0,0,0,0.15)] focus:border-[#DC2626] focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)] transition-all duration-200 border-0"
              />
            </div>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            custom={0.8}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            {serviceTypeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setActiveServiceType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeServiceType === type
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                {type}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 2: Support Options Overview
          ════════════════════════════════════════════ */}
      <section className="bg-[#FDF8F3] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-2">
              Ways to Get Help
            </p>
            <h2
              className="text-2xl lg:text-5xl font-bold text-[#1C1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Choose the support that&apos;s right for you
            </h2>
          </motion.div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Individual Counseling */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E7E5E4] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292524] mb-3">Individual Counseling</h3>
              <p className="text-[15px] text-[#57534E] leading-relaxed mb-6">
                One-on-one sessions with qualified mental health professionals. Available in-person and via telehealth.
              </p>
              <ul className="space-y-2 mb-6">
                {['Confidential sessions', 'Flexible scheduling', 'Multiple languages', 'In-person or online'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#57534E]">
                      <CheckCircle className="h-4 w-4 text-[#6B9080] shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Button className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold rounded-lg">
                Find a Counselor
              </Button>
            </motion.div>

            {/* Card 2: Support Groups */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E7E5E4] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#E8F0EC] flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-[#6B9080]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292524] mb-3">Support Groups</h3>
              <p className="text-[15px] text-[#57534E] leading-relaxed mb-6">
                Connect with others who understand what you&apos;re going through. Led by trained facilitators in a safe environment.
              </p>
              <ul className="space-y-2 mb-6">
                {['Peer support network', 'Trained facilitators', 'Safe, confidential space', 'Ongoing sessions'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#57534E]">
                      <CheckCircle className="h-4 w-4 text-[#6B9080] shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Button
                variant="outline"
                className="w-full border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] font-semibold rounded-lg"
              >
                Join a Group
              </Button>
            </motion.div>

            {/* Card 3: Crisis Support */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E7E5E4] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292524] mb-3">Crisis Support</h3>
              <p className="text-[15px] text-[#57534E] leading-relaxed mb-6">
                24/7 emergency mental health support. If you or someone you know is in immediate danger, we&apos;re here.
              </p>
              <ul className="space-y-2 mb-6">
                {['24/7 availability', 'Trained crisis counselors', 'Immediate response', 'Free and confidential'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#57534E]">
                      <CheckCircle className="h-4 w-4 text-[#6B9080] shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Button className="w-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-lg rounded-lg animate-pulse">
                Call: 0800-MENTAL-HELP
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 3: Counselor Directory
          ════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#1C1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Counselors
            </h2>
            <p className="text-sm text-[#57534E]">{filteredCounselors.length} professionals available</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {/* Specialty Filter */}
            <div className="relative">
              <select
                value={activeSpecialty}
                onChange={(e) => setActiveSpecialty(e.target.value)}
                className="appearance-none bg-[#F5F5F4] text-[#57534E] text-sm font-medium pl-4 pr-10 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 cursor-pointer"
              >
                {specialtyFilters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8A29E] rotate-90 pointer-events-none" />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <select
                value={activeState}
                onChange={(e) => setActiveState(e.target.value)}
                className="appearance-none bg-[#F5F5F4] text-[#57534E] text-sm font-medium pl-4 pr-10 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 cursor-pointer"
              >
                {stateFilters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8A29E] rotate-90 pointer-events-none" />
            </div>

            {(activeSpecialty !== 'All Specialties' || activeState !== 'All Locations' || activeServiceType !== 'All Types' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-sm text-[#DC2626] hover:text-[#B91C1C] font-medium px-3 py-2.5"
              >
                Clear all
              </button>
            )}
          </motion.div>

          {/* Counselors Grid */}
          {filteredCounselors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounselors.map((counselor, index) => (
                <CounselorCard key={counselor.id} counselor={counselor} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-[#A8A29E] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#292524] mb-2">No counselors found</h3>
              <p className="text-[#57534E] mb-4">Try adjusting your search or filters.</p>
              <Button
                onClick={resetFilters}
                variant="outline"
                className="border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2]"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 4: Referral Process
          ════════════════════════════════════════════ */}
      <section className="bg-[#F5EDE4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-2">
              How It Works
            </p>
            <h2
              className="text-2xl lg:text-5xl font-bold text-[#1C1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Getting support is simple
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line - desktop */}
            <div className="hidden lg:block absolute top-[40px] left-[12.5%] right-[12.5%] h-0.5 bg-[#E7E5E4]" />

            {/* Connecting line - mobile */}
            <div className="lg:hidden absolute top-0 bottom-0 left-[23px] w-0.5 bg-[#E7E5E4]" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              {[
                {
                  number: '1',
                  icon: MessageCircle,
                  color: '#DC2626',
                  title: 'Reach Out',
                  body: 'Contact us via WhatsApp, our AI assistant, or complete an online assessment.',
                },
                {
                  number: '2',
                  icon: ClipboardCheck,
                  color: '#6B9080',
                  title: 'Complete Assessment',
                  body: 'Take a brief PHQ-9 screening to help us understand your needs.',
                },
                {
                  number: '3',
                  icon: Users,
                  color: '#3D8B8B',
                  title: 'Get Matched',
                  body: "We'll connect you with the most suitable counselor or support service.",
                },
                {
                  number: '4',
                  icon: Heart,
                  color: '#DC2626',
                  title: 'Begin Your Journey',
                  body: 'Start receiving professional support and access resources tailored to you.',
                },
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    custom={index * 0.2}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0"
                  >
                    {/* Number badge */}
                    <motion.div
                      custom={index * 0.2 + 0.4}
                      variants={scaleIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative z-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </motion.div>

                    <div className="lg:mt-6 lg:text-center">
                      <div className="flex items-center gap-2 mb-2 lg:justify-center">
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                        <h3 className="text-lg font-semibold text-[#292524]">{step.title}</h3>
                      </div>
                      <p className="text-[15px] text-[#57534E] leading-relaxed">{step.body}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 5: WhatsApp Support
          ════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-2">
                WhatsApp Support
              </p>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#1C1917] mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Get help through WhatsApp
              </h2>
              <p className="text-base text-[#57534E] leading-relaxed mb-6">
                Chat with our mental health support team directly on WhatsApp. No app downloads needed — just send a message and get started. Available 24/7 in multiple languages.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  'Available 24/7',
                  'Multiple languages supported',
                  'Free and confidential',
                  'Connect with real counselors',
                  'Assessment via chat',
                  'Follow-up wellness check-ins',
                ].map((feature, i) => (
                  <motion.div
                    key={feature}
                    custom={i * 0.08}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-[#6B9080] shrink-0" />
                    <span className="text-[15px] text-[#292524]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA + QR */}
              <Button
                className="h-14 px-8 text-white font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 mb-6"
                style={{
                  backgroundColor: '#25D366',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-start">
                <div className="w-[120px] h-[120px] bg-[#F5F5F4] rounded-lg flex items-center justify-center mb-2">
                  <div className="w-[100px] h-[100px] bg-white rounded border border-[#E7E5E4] flex items-center justify-center">
                    <div className="grid grid-cols-5 grid-rows-5 gap-0.5 w-16 h-16">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`${
                            [0, 1, 2, 3, 5, 6, 11, 12, 13, 17, 19, 22, 23, 24].includes(i)
                              ? 'bg-[#292524]'
                              : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#A8A29E]">Scan to start chatting</p>
              </div>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              custom={0.2}
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/whatsapp-phone.jpg"
                  alt="WhatsApp Support"
                  className="rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] max-w-[400px] w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 6: Crisis Resources
          ════════════════════════════════════════════ */}
      <section className="bg-[#991B1B] py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AlertTriangle className="h-10 w-10 text-white mx-auto mb-4" />
            <h2
              className="text-2xl lg:text-[28px] font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              If you need immediate help
            </h2>
            <p className="text-base text-white/80 max-w-xl mx-auto mb-8">
              Our crisis line is open 24 hours a day, 7 days a week. You are not alone.
            </p>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Phone,
                  label: 'Crisis Hotline',
                  value: '0800-MENTAL-HELP',
                },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp Crisis Line',
                  value: '+234-800-HELP-NOW',
                },
                {
                  icon: Mail,
                  label: 'Emergency Email',
                  value: 'crisis@redaidnigeria.org',
                },
              ].map((card, i) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.label}
                    custom={i * 0.1}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
                  >
                    <Icon className="h-6 w-6 text-white mx-auto mb-3" />
                    <p className="text-sm text-white/70 mb-1">{card.label}</p>
                    <p className="text-xl font-semibold text-white">{card.value}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 7: CTA Banner
          ════════════════════════════════════════════ */}
      <section className="bg-[#FDF8F3] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl lg:text-[32px] font-bold text-[#1C1917] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ready to take the first step?
            </h2>
            <p className="text-base text-[#57534E] mb-8 max-w-xl mx-auto">
              Start with a free, confidential mental health assessment to understand your needs and get personalized recommendations.
            </p>
            <Link to="/assessment">
              <Button className="h-14 px-8 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold rounded-lg hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all duration-250">
                Take Free Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
