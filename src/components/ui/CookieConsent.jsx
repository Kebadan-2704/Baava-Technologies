import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds if not accepted previously
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('baava_cookie_consent');
      if (!consent) {
        setIsVisible(true);
        uiSounds.clickOpen(); // Subtle entrance sound
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('baava_cookie_consent', 'accepted');
    setIsVisible(false);
    uiSounds.clickClose();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[9999] max-w-sm"
        >
          <div 
            className="p-4 rounded-xl shadow-2xl flex flex-col gap-3 relative overflow-hidden"
            style={{ 
              background: 'var(--color-surface-elevated)', 
              border: '1px solid var(--color-border)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-500/10">
                <Cookie className="w-4 h-4 text-brand-600" />
              </div>
              <div>
                <h4 className="text-[12px] font-bold tracking-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  We value your privacy
                </h4>
                <p className="text-[11px] leading-relaxed pr-4" style={{ color: 'var(--color-text-secondary)' }}>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                </p>
              </div>
              <button 
                onClick={() => {
                  localStorage.setItem('baava_cookie_consent', 'declined');
                  setIsVisible(false);
                  uiSounds.clickClose();
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close cookie consent"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAccept}
                className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-white transition-colors"
                style={{ background: 'var(--color-brand)' }}
              >
                Accept All
              </motion.button>
              <button
                onClick={() => {
                  localStorage.setItem('baava_cookie_consent', 'declined');
                  setIsVisible(false);
                  uiSounds.clickClose();
                }}
                className="flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors"
                style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-secondary)' }}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
