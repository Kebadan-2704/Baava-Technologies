import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TICKER_EVENTS = [
  "Document batch #4,821 processed • 3s ago",
  "ERP sync completed • 12s ago",
  "Support ticket #8992 resolved via AI • 1m ago",
  "Invoice extraction accuracy at 99.8% • 2m ago",
  "New vendor onboarding automated • 4m ago",
  "Legacy database migration running • 6m ago",
  "Supply chain analytics updated • 8m ago",
];

export default function LiveActivityTicker() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    // Rotate the ticker text every 4 seconds
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % TICKER_EVENTS.length);
    }, 4000);
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
