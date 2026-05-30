import { Phone, X, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CrisisAlertProps {
  onDismiss?: () => void;
}

export default function CrisisAlert({ onDismiss }: CrisisAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="relative mx-4 mb-4 overflow-hidden rounded-xl border-2 border-[#DC2626] bg-[#991B1B] p-4 shadow-lg"
    >
      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-[#DC2626]"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white">
            If you are in immediate danger, please get help now
          </h4>
          <p className="mt-1 text-sm text-white/80">
            Call our 24/7 crisis line: <strong className="text-white">0809 445 5221</strong>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="tel:0809 445 5221"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#991B1B] hover:bg-white/90 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Now
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Emergency: 112
            </a>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="shrink-0 rounded-md p-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss crisis alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
