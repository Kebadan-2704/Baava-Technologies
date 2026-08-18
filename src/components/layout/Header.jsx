import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Check, Sparkles } from 'lucide-react';


export default function Header({ setIsContactOpen }) {
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live Local Time Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const tzCity = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]?.replace('_', ' ') || '';
      setTimeStr(`${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} ${tzCity}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('info@baavatech.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 w-full pt-4"
      role="banner"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full glass-panel shadow-2xl">
        {/* Logo + Tag */}
        <div className="flex flex-col items-start justify-center min-w-0">
          <div className="relative overflow-hidden rounded-lg flex-shrink-0">
            {/* Standard Logo */}
            <img 
              src="/logo-transparent.png" 
              alt="Baava Tech Logo" 
              className="h-10 md:h-12 lg:h-14 w-auto object-contain" 
            />
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg">
              <div className="absolute top-0 bottom-0 w-[250%] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine-sweep mix-blend-overlay" />
            </div>
          </div>
          <span className="hidden lg:block text-[11px] font-bold uppercase tracking-[0.15em] mt-1 whitespace-nowrap transition-colors duration-500" style={{ color: 'var(--color-text-tertiary)' }}>
            Digital Transformation & Technical Operations
          </span>
        </div>

        {/* Right: Theme + Email + Status */}
        <div className="flex items-center gap-2 md:gap-3">


          {/* Email - Removed href to fix double action (mailto + copy) */}
          <motion.button
            data-magnetic
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyEmail}
            title="Click to copy email"
            className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full transition-all duration-300"
            style={copied
              ? { background: 'rgba(14,141,109,0.08)', border: '1px solid rgba(14,141,109,0.2)' }
              : { background: 'var(--color-surface-alt)', border: '1px solid var(--color-border-subtle)' }
            }
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-accent-600" />
            ) : (
              <Mail className="w-3.5 h-3.5" style={{ color: 'var(--color-text-tertiary)' }} />
            )}
            <span className={`hidden sm:inline text-[12px] md:text-sm font-bold transition-colors ${copied ? 'text-accent-600' : ''}`} style={copied ? undefined : { color: 'var(--color-text-secondary)' }}>
              {copied ? 'Copied!' : 'info@baavatech.com'}
            </span>
            {!copied && <ArrowUpRight className="w-3.5 h-3.5 hidden sm:block transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--color-text-tertiary)' }} />}
          </motion.button>



          <motion.button
            data-magnetic
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactOpen && setIsContactOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[12px] md:text-sm transition-all duration-300"
            style={{ 
              background: 'var(--color-primary-600)', 
              color: 'white',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.35)'
            }}
          >
            <span>Book Call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* Status badge with Live Clock & WBE */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-md cursor-default border transition-all duration-300 hover:shadow-sm" style={{ background: 'var(--color-surface-elevated)', borderColor: 'var(--color-border-subtle)' }}>
            <div className="flex items-center gap-2" title="System Nominal">
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                Nominal
              </span>
            </div>
            
            <div className="w-[1px] h-3" style={{ background: 'var(--color-border-subtle)' }} />
            
            <span className="text-[11px] font-mono font-medium tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              {timeStr}
            </span>

            <div className="w-[1px] h-3" style={{ background: 'var(--color-border-subtle)' }} />

            <div className="flex items-center gap-1.5" title="Women's Business Enterprise (Woman-Founded)">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent-600">WBE</span>
              <Sparkles className="w-3 h-3 text-accent-500 opacity-80" />
            </div>
          </div>
        </div>
        </div>
      </div>
    </motion.header>
  );
}
