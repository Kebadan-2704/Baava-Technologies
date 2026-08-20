import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uiSounds } from '../../utils/sounds';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Play startup sound
    setTimeout(() => {
      uiSounds.clickOpen(); // Or a custom boot sound if available
    }, 200);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 2000); // Increased from 800ms to 2000ms to allow animations to play
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
        >
          {/* Animated Logo Image */}
          <motion.div 
            className="relative mb-12 md:mb-16"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/logo-transparent.webp" alt="Baava Tech" width="250" height="56" fetchPriority="high" className="h-32 md:h-48 w-auto object-contain relative z-10" />
            
            {/* Background Glow */}
            <motion.div 
              className="absolute inset-0 rounded-full blur-2xl -z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.4, scale: 1.5 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              style={{ background: 'rgba(236, 72, 153, 0.4)' }} // Pink glow
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base font-bold tracking-[0.4em] uppercase" style={{ color: 'var(--color-text-secondary)' }}>
                Initializing
              </span>
              <div className="flex gap-1.5">
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary-500)' }} />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary-500)' }} />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary-500)' }} />
              </div>
            </div>
            {/* Fast loading bar */}
            <div className="w-64 md:w-96 h-1 md:h-1.5 rounded-full overflow-hidden mt-2" style={{ background: 'var(--color-border)' }}>
              <motion.div 
                className="h-full bg-gradient-to-r"
                style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-500), var(--color-accent-500))' }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "circInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
