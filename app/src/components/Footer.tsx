import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Take Assessment', path: '/assessment' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
]

const resourceLinks = [
  { label: 'Mental Health Articles', path: '/resources' },
  { label: 'Depression Resources', path: '/resources' },
  { label: 'Stress Management', path: '/resources' },
  { label: 'Youth Mental Health', path: '/resources' },
  { label: 'Crisis Support', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Mission */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpg"
                alt="Red Aid Nigeria"
                className="h-14 w-auto rounded-md"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#A8A29E] max-w-xs">
              Red Aid Nigeria provides free, confidential mental health screening and psychosocial support to communities across Nigeria.
            </p>
            <div className="mt-6 text-[#A8A29E]">
              <span className="text-sm">For more info visit </span>
              <a href="https://redaidnigeria.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#DC2626] hover:text-white transition-colors">
                redaidnigeria.org
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A8A29E] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#A8A29E] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A8A29E] mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#A8A29E] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A8A29E] mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#DC2626] shrink-0 mt-0.5" />
                <span className="text-sm text-[#A8A29E]">
                  56 Nza St, Independence Layout, Enugu 400001, Enugu
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#DC2626] shrink-0" />
                <a href="tel:08094455221" className="text-sm text-[#A8A29E] hover:text-white transition-colors">
                  0809 445 5221
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#DC2626] shrink-0" />
                <a href="mailto:office@redaidnigeria.org" className="text-sm text-[#A8A29E] hover:text-white transition-colors">
                  office@redaidnigeria.org
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-[#A8A29E] mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg bg-[#292524] border border-[#3E3A36] px-3 py-2 text-sm text-white placeholder-[#A8A29E] focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-colors"
                />
                <button className="rounded-lg bg-[#DC2626] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B91C1C] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A8A29E]">
            2024 Red Aid Nigeria. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-[#A8A29E] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-[#A8A29E] hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-[#A8A29E] hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
