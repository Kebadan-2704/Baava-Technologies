import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TICKER_EVENTS = [
  "Baava Tech • Founded 2024",
  "Trusted by 5+ Countries Globally",
  "Over 50+ Engineers and Domain Experts",
  "99.9% Data Extraction Accuracy",
  "10,000+ Documents Processed Successfully",
  "Secure 256-bit Encryption standard",
];

export default function LiveActivityTicker() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    // Rotate the ticker text every 4 seconds
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % TICKER_EVENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-1 mt-2 mb-[-8px]">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-alt border" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-warm)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <div className="relative overflow-hidden h-4 w-[280px] md:w-[320px] flex items-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentEventIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute text-[10px] md:text-[11px] font-medium tracking-wide whitespace-nowrap"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {TICKER_EVENTS[currentEventIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
