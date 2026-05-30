import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Assessment', path: '/assessment' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[80px] border-b border-transparent bg-white/80 backdrop-blur-[12px] transition-all duration-300 ${
        scrolled ? 'shadow-nav-scroll border-[#E7E5E4]' : ''
      }`}
    >
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.jpg"
              alt="Red Aid Nigeria"
              className="h-12 w-auto rounded-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-[15px] font-medium transition-colors duration-200 rounded-md ${
                  isActive(link.path)
                    ? 'text-[#DC2626] bg-[#FEE2E2]/50'
                    : 'text-[#292524] hover:text-[#DC2626] hover:bg-[#F5F5F4]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/2348094455221"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center rounded-lg bg-[#DC2626] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B91C1C] hover:scale-[1.02] hover:shadow-primary active:scale-[0.98] transition-all duration-250"
            >
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-md p-2 text-[#292524] hover:bg-[#F5F5F4] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[400px] bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-[80px] items-center justify-end px-4 border-b border-[#E7E5E4]">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-2 text-[#292524] hover:bg-[#F5F5F4] transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                        isActive(link.path)
                          ? 'text-[#DC2626] bg-[#FEE2E2]/50'
                          : 'text-[#292524] hover:bg-[#F5F5F4]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-[#E7E5E4]"
                >
                  <a
                    href="https://wa.me/2348094455221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-[#DC2626] px-4 py-3 text-base font-semibold text-white hover:bg-[#B91C1C] transition-colors"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
