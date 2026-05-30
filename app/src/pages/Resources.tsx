import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  LayoutGrid,
  CloudRain,
  Wind,
  Coffee,
  Heart,
  Users,
  GraduationCap,
  AlertTriangle,
  Briefcase,
  ShieldAlert,
  Sun,
  Zap,
  Globe,
  FileText,
  Play,
  Headphones,
  BookOpen,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface Resource {
  id: number
  title: string
  excerpt: string
  category: string
  format: 'Article' | 'Video' | 'Audio' | 'Infographic' | 'Guide'
  duration: string
  image: string
  languages: number
  featured?: boolean
}

/* ─────────────────────────────────────────────
   Mock Data
   ───────────────────────────────────────────── */

const categories = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Depression', icon: CloudRain },
  { name: 'Anxiety', icon: Wind },
  { name: 'Stress Management', icon: Coffee },
  { name: 'Trauma Recovery', icon: Heart },
  { name: 'Family Wellbeing', icon: Users },
  { name: 'Youth Mental Health', icon: GraduationCap },
  { name: 'Substance Abuse', icon: AlertTriangle },
  { name: 'Workplace', icon: Briefcase },
  { name: 'Suicide Prevention', icon: ShieldAlert },
  { name: 'Self-Care', icon: Sun },
  { name: 'Coping Strategies', icon: Zap },
]

const categoryColors: Record<string, string> = {
  Depression: '#DC2626',
  Anxiety: '#3D8B8B',
  'Stress Management': '#D97706',
  'Trauma Recovery': '#6B9080',
  'Family Wellbeing': '#8B5CF6',
  'Youth Mental Health': '#06B6D4',
  'Substance Abuse': '#EA580C',
  Workplace: '#6366F1',
  'Suicide Prevention': '#991B1B',
  'Self-Care': '#10B981',
  'Coping Strategies': '#8B5CF6',
}

const allResources: Resource[] = [
  {
    id: 1,
    title: 'Understanding Depression: A Comprehensive Guide for Nigerians',
    excerpt: 'Depression affects millions of people worldwide, yet many in our communities don\'t recognize the signs. This guide explains what depression is, how to identify it, and where to find help.',
    category: 'Depression',
    format: 'Article',
    duration: '15 min read',
    image: '/resource-article-1.jpg',
    languages: 12,
    featured: true,
  },
  {
    id: 2,
    title: '5 Quick Stress Relief Techniques for Busy Professionals',
    excerpt: 'Learn practical, evidence-based techniques to manage stress in the moment — from deep breathing to progressive muscle relaxation.',
    category: 'Stress Management',
    format: 'Video',
    duration: '8 min',
    image: '/resource-article-2.jpg',
    languages: 8,
    featured: true,
  },
  {
    id: 3,
    title: 'Supporting Your Teen\'s Mental Health: A Parent\'s Guide',
    excerpt: 'Adolescence can be challenging. This audio guide helps Nigerian parents recognize warning signs and support their teenagers through difficult times.',
    category: 'Youth Mental Health',
    format: 'Audio',
    duration: '12 min',
    image: '/resource-article-3.jpg',
    languages: 6,
    featured: true,
  },
  {
    id: 4,
    title: 'Anxiety Coping Strategies That Actually Work',
    excerpt: 'A practical guide with actionable strategies for managing anxiety, from cognitive techniques to lifestyle changes rooted in Nigerian culture.',
    category: 'Anxiety',
    format: 'Guide',
    duration: '10 min read',
    image: '/resource-article-1.jpg',
    languages: 10,
  },
  {
    id: 5,
    title: 'Building Emotional Resilience in Challenging Times',
    excerpt: 'Discover how to build inner strength and bounce back from adversity with these evidence-based resilience practices.',
    category: 'Self-Care',
    format: 'Article',
    duration: '8 min read',
    image: '/resource-article-2.jpg',
    languages: 9,
  },
  {
    id: 6,
    title: 'Trauma Healing: First Steps Toward Recovery',
    excerpt: 'An introduction to understanding trauma, its effects on the mind and body, and the first steps toward healing and recovery.',
    category: 'Trauma Recovery',
    format: 'Video',
    duration: '15 min',
    image: '/resource-article-3.jpg',
    languages: 7,
  },
  {
    id: 7,
    title: 'Family Communication Guide: Talking About Mental Health',
    excerpt: 'Breaking the silence around mental health within Nigerian families. Learn how to start important conversations with loved ones.',
    category: 'Family Wellbeing',
    format: 'Guide',
    duration: '12 min read',
    image: '/resource-article-1.jpg',
    languages: 11,
  },
  {
    id: 8,
    title: 'Recognizing the Signs of Substance Abuse',
    excerpt: 'Learn to identify early warning signs of substance abuse and understand how to approach someone who may need help.',
    category: 'Substance Abuse',
    format: 'Article',
    duration: '10 min read',
    image: '/resource-article-2.jpg',
    languages: 8,
  },
  {
    id: 9,
    title: 'Workplace Mental Health: Creating a Supportive Environment',
    excerpt: 'A guide for employers and employees on fostering mentally healthy workplaces in the Nigerian context.',
    category: 'Workplace',
    format: 'Video',
    duration: '10 min',
    image: '/resource-article-3.jpg',
    languages: 6,
  },
  {
    id: 10,
    title: 'Suicide Prevention: How to Help Someone in Crisis',
    excerpt: 'Critical information on recognizing suicidal ideation and providing immediate support to someone in crisis.',
    category: 'Suicide Prevention',
    format: 'Article',
    duration: '7 min read',
    image: '/resource-article-1.jpg',
    languages: 14,
  },
  {
    id: 11,
    title: 'Mindfulness for Beginners: A 10-Minute Daily Practice',
    excerpt: 'An audio-guided introduction to mindfulness meditation tailored for beginners in the Nigerian context.',
    category: 'Self-Care',
    format: 'Audio',
    duration: '20 min',
    image: '/resource-article-2.jpg',
    languages: 5,
  },
  {
    id: 12,
    title: 'Sleep and Mental Health: What You Need to Know',
    excerpt: 'Understanding the vital connection between quality sleep and mental wellbeing, with practical tips for better rest.',
    category: 'Self-Care',
    format: 'Article',
    duration: '6 min read',
    image: '/resource-article-3.jpg',
    languages: 10,
  },
  {
    id: 13,
    title: 'Coping with Loss and Grief in Nigerian Communities',
    excerpt: 'Navigating grief through cultural lenses — understanding loss and finding support within community and tradition.',
    category: 'Coping Strategies',
    format: 'Video',
    duration: '18 min',
    image: '/resource-article-1.jpg',
    languages: 9,
  },
  {
    id: 14,
    title: 'Understanding Panic Attacks and How to Manage Them',
    excerpt: 'Learn to recognize panic attack symptoms and discover effective grounding techniques to regain control.',
    category: 'Anxiety',
    format: 'Infographic',
    duration: '5 min read',
    image: '/resource-article-2.jpg',
    languages: 8,
  },
  {
    id: 15,
    title: 'Mental Health for New Mothers: Postpartum Wellness',
    excerpt: 'A compassionate guide for new mothers experiencing postpartum challenges, with resources and support options.',
    category: 'Family Wellbeing',
    format: 'Article',
    duration: '11 min read',
    image: '/resource-article-3.jpg',
    languages: 7,
  },
]

const languagesList = [
  'English',
  'Hausa',
  'Yoruba',
  'Igbo',
  'Fulfulde',
  'Kanuri',
  'Tiv',
  'Edo',
  'Efik',
  'Ibibio',
  'More languages...',
]

const formatFilters = ['All Formats', 'Articles', 'Videos', 'Audio', 'Infographics', 'Guides']

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

function FormatIcon({ format }: { format: Resource['format'] }) {
  switch (format) {
    case 'Article':
      return <FileText className="h-4 w-4" />
    case 'Video':
      return <Play className="h-4 w-4" />
    case 'Audio':
      return <Headphones className="h-4 w-4" />
    case 'Guide':
      return <BookOpen className="h-4 w-4" />
    case 'Infographic':
      return <LayoutGrid className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const catColor = categoryColors[resource.category] || '#DC2626'

  return (
    <motion.div
      custom={index * 0.08}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-[#FEE2E2] transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: catColor }}
          >
            {resource.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-[#292524] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#DC2626] transition-colors duration-200">
          {resource.title}
        </h3>
        <p className="text-sm text-[#57534E] leading-relaxed mb-4 line-clamp-2">
          {resource.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[#A8A29E] mb-4">
          <span className="flex items-center gap-1">
            <FormatIcon format={resource.format} />
            <span>{resource.format}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#A8A29E]" />
          <span>{resource.duration}</span>
          <span className="w-1 h-1 rounded-full bg-[#A8A29E]" />
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <span>{resource.languages} languages</span>
          </span>
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] hover:text-[#B91C1C] text-sm font-medium"
        >
          {resource.format === 'Video' ? 'Watch Now' : resource.format === 'Audio' ? 'Listen Now' : 'Read More'}
        </Button>
      </div>
    </motion.div>
  )
}

function FeaturedCardLarge({ resource }: { resource: Resource }) {
  const catColor = categoryColors[resource.category] || '#DC2626'

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-[#FEE2E2] transition-all duration-300 cursor-pointer lg:col-span-2"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: catColor }}
          >
            {resource.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-[#1C1917] text-xl lg:text-2xl leading-snug mb-3 group-hover:text-[#DC2626] transition-colors duration-200">
          {resource.title}
        </h3>
        <p className="text-base text-[#57534E] leading-relaxed mb-4 max-w-xl">
          {resource.excerpt}
        </p>
        <div className="flex items-center gap-3 text-sm text-[#A8A29E]">
          <span className="flex items-center gap-1">
            <FormatIcon format={resource.format} />
            <span>{resource.format}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#A8A29E]" />
          <span>{resource.duration}</span>
          <span className="w-1 h-1 rounded-full bg-[#A8A29E]" />
          <span className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>Available in {resource.languages} languages</span>
          </span>
        </div>
        <div className="mt-5">
          <Button className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-6 py-2.5 rounded-lg hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all duration-250">
            Read Article
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedCardSmall({ resource, index }: { resource: Resource; index: number }) {
  const catColor = categoryColors[resource.category] || '#DC2626'

  return (
    <motion.div
      custom={index * 0.15}
      variants={slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-[#FEE2E2] transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: catColor }}
          >
            {resource.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#292524] text-base leading-snug mb-3 group-hover:text-[#DC2626] transition-colors duration-200 line-clamp-2">
          {resource.title}
        </h3>
        <div className="mt-auto flex items-center gap-3 text-xs text-[#A8A29E]">
          <span className="flex items-center gap-1">
            <FormatIcon format={resource.format} />
            <span>{resource.format}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#A8A29E]" />
          <span>{resource.duration}</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFormat, setActiveFormat] = useState('All Formats')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [, setCurrentPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(9)
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  const featuredResources = allResources.filter((r) => r.featured)

  // Filter logic
  const filteredResources = allResources.filter((resource) => {
    const matchesCategory = activeCategory === 'All' || resource.category === activeCategory
    const matchesFormat = activeFormat === 'All Formats' || resource.format === activeFormat.slice(0, -1) || (activeFormat === 'Infographics' && resource.format === 'Infographic')
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesFormat && matchesSearch
  })

  const paginatedResources = filteredResources.slice(0, visibleCount)
  const hasMore = visibleCount < filteredResources.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9)
  }

  return (
    <div className="min-h-[100dvh]">
      {/* ════════════════════════════════════════════
          Section 1: Page Hero
          ════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center min-h-[45dvh] pt-[72px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.8), rgba(28,25,23,0.6)), url(/resources-hero.jpg)`,
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-16 lg:py-24">
          {/* Overline */}
          <motion.p
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-4"
          >
            Learning &amp; Resource Center
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
            Knowledge for better mental health
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-[#A8A29E] max-w-[600px] mx-auto mb-8"
          >
            Explore our collection of evidence-based articles, guides, videos, and audio resources — available in 100+ languages.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            custom={0.6}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="max-w-[600px] mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A8A29E]" />
              <Input
                type="text"
                placeholder="Search articles, videos, guides..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setVisibleCount(9)
                }}
                className="w-full h-14 pl-14 pr-5 rounded-[28px] bg-white text-[#292524] placeholder:text-[#A8A29E] text-base shadow-[0_4px_16px_rgba(0,0,0,0.1)] focus:shadow-[0_4px_24px_rgba(0,0,0,0.15)] focus:border-[#DC2626] focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)] transition-all duration-200 border-0"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 2: Category Navigation
          ════════════════════════════════════════════ */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={categoryScrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.name
              return (
                <motion.button
                  key={cat.name}
                  custom={i * 0.05}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onClick={() => {
                    setActiveCategory(cat.name)
                    setCurrentPage(1)
                    setVisibleCount(9)
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-[#F5F5F4] text-[#57534E] hover:bg-[#E7E5E4]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 3: Featured Resources
          ════════════════════════════════════════════ */}
      <section className="bg-[#FDF8F3] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[13px] font-semibold tracking-[0.1em] text-[#DC2626] uppercase mb-2">
              Featured
            </p>
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#1C1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Recommended for you
            </h2>
          </motion.div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Large featured card */}
            <FeaturedCardLarge resource={featuredResources[0]} />

            {/* Two stacked cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeaturedCardSmall resource={featuredResources[1]} index={0} />
              <FeaturedCardSmall resource={featuredResources[2]} index={1} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 4: Resource Grid
          ════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#1C1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              All Resources
            </h2>
          </motion.div>

          {/* Format & Language Filters */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {formatFilters.map((format) => (
              <button
                key={format}
                onClick={() => {
                  setActiveFormat(format)
                  setVisibleCount(9)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFormat === format
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-[#F5F5F4] text-[#57534E] hover:bg-[#E7E5E4]'
                }`}
              >
                {format}
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-sm text-[#57534E] mb-6">
              {filteredResources.length} result{filteredResources.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
            </p>
          )}

          {/* Resource Grid */}
          {filteredResources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedResources.map((resource, index) => (
                  <ResourceCard key={resource.id} resource={resource} index={index} />
                ))}
              </div>

              {/* Load More / Pagination */}
              {hasMore && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-12 text-center"
                >
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] px-8 py-3 text-base font-semibold rounded-lg"
                  >
                    Load More Resources
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-[#A8A29E] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#292524] mb-2">No resources found</h3>
              <p className="text-[#57534E]">Try adjusting your search or filters.</p>
              <Button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveFormat('All Formats')
                  setSearchQuery('')
                }}
                variant="outline"
                className="mt-4 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2]"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 5: Language Banner
          ════════════════════════════════════════════ */}
      <section className="bg-[#DC2626] py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Globe className="h-10 w-10 text-white mx-auto mb-4" />
            <h2
              className="text-2xl lg:text-[28px] font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Resources in your language
            </h2>
            <p className="text-base text-white/80 max-w-xl mx-auto mb-8">
              Browse our multilingual library. Select your preferred language to see available resources.
            </p>

            {/* Language Selector */}
            <motion.div
              custom={0.3}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
            >
              <div className="relative w-full sm:w-64">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 rounded-lg bg-white text-[#DC2626] font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {languagesList.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#DC2626] pointer-events-none" />
              </div>
              <Button className="w-full sm:w-auto h-12 px-6 bg-white text-[#DC2626] hover:bg-white/90 font-semibold rounded-lg">
                Browse in {selectedLanguage}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 6: Newsletter / CTA Banner
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
              Get resources delivered to your inbox
            </h2>
            <p className="text-base text-[#57534E] mb-8 max-w-xl mx-auto">
              Subscribe to receive weekly mental health resources, tips, and updates — curated for the Nigerian community.
            </p>

            {/* Email signup */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-14 px-5 rounded-lg bg-white border border-[#E7E5E4] text-[#292524] placeholder:text-[#A8A29E] focus:border-[#DC2626] focus:ring-[3px] focus:ring-[rgba(220,38,38,0.1)] flex-1"
              />
              <Button className="h-14 px-6 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold rounded-lg hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all duration-250">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-[#A8A29E] mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA Banner: Personalized Support
          ════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
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
              Need personalized support?
            </h2>
            <p className="text-base text-[#57534E] mb-8 max-w-xl mx-auto">
              Our AI assistant and counseling network are here to help you on your mental health journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/assessment">
                <Button className="h-14 px-8 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold rounded-lg hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] active:scale-[0.98] transition-all duration-250">
                  Take Assessment
                </Button>
              </Link>
              <Link to="/ai-assistant">
                <Button
                  variant="outline"
                  className="h-14 px-8 border-2 border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] font-semibold rounded-lg"
                >
                  Chat with AI
                </Button>
              </Link>
              <Link to="/find-support">
                <Button
                  variant="ghost"
                  className="h-14 px-8 text-[#292524] hover:bg-[#F5F5F4] font-medium rounded-lg"
                >
                  Find a Counselor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
