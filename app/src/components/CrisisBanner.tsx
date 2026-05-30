import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X } from 'lucide-react'

export default function CrisisBanner() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#991B1B] text-white"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-12 items-center justify-between">
              <div className="flex items-center gap-4">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Crisis Helpline:{' '}
                  <a href="tel:+2348001234567" className="font-semibold underline underline-offset-2 hover:text-white/90">
                    0800 123 4567
                  </a>
                </span>
                <a
                  href="tel:+2348001234567"
                  className="hidden sm:inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-xs font-semibold hover:bg-white/20 transition-colors animate-pulse-crisis"
                >
                  Get Immediate Help
                </a>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label="Dismiss crisis banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
