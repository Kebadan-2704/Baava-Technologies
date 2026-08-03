import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Check, Clock } from 'lucide-react';
import ThemeSwitcher from '../ThemeSwitcher';

export default function Header() {
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live Local Time Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('Info@baavatech.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 w-full"
      role="banner"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-16 py-3 md:py-4">
        {/* Logo + Tag */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative overflow-hidden rounded-lg">
            <img src="/logo.png" alt="Baava Tech Logo" className="h-9 md:h-11 w-auto object-contain transition-all duration-500" width="160" height="40" />
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg">
              <div className="absolute top-0 bottom-0 w-[250%] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine-sweep mix-blend-overlay" />
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center border-l pl-4 transition-colors duration-500" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors duration-500" style={{ color: 'var(--color-text-primary)' }}>Engineering & Automation Partner</span>
            <span className="text-[8px] uppercase tracking-[0.15em] mt-0.5 transition-colors duration-500" style={{ color: 'var(--color-text-tertiary)' }}>Digital Transformation & Technical Operations</span>
          </div>
        </div>

        {/* Right: Theme + Email + Status */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Email */}
          <motion.a
            data-magnetic
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:Info@baavatech.com"
            onClick={handleCopyEmail}
            title="Click to copy email"
            className="group flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300"
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
            <span className={`text-[11px] md:text-xs font-bold transition-colors ${copied ? 'text-accent-600' : ''}`} style={copied ? undefined : { color: 'var(--color-text-secondary)' }}>
              {copied ? 'Copied!' : 'Info@baavatech.com'}
            </span>
            {!copied && <ArrowUpRight className="w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--color-text-tertiary)' }} />}
          </motion.a>

          {/* Status badge with Live Clock */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full cursor-default transition-all duration-500" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border-subtle)' }}>
            <div className="relative flex items-center justify-center w-2 h-2">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50" />
              <div className="relative w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)' }}>
              Operational <span className="text-[10px] font-normal" style={{ color: 'var(--color-border)' }}>|</span> {timeStr}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
