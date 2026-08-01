import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Check } from 'lucide-react';

export default function Header() {
  const [copied, setCopied] = useState(false);

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
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 md:py-6">
        {/* Logo + Tag */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative overflow-hidden rounded-lg">
            <img src="/logo.png" alt="Baava Tech Logo" className="h-10 md:h-12 w-auto object-contain transition-all duration-500" width="160" height="40" />
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg">
              <div className="absolute top-0 bottom-0 w-[250%] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine-sweep mix-blend-overlay" />
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center border-l border-slate-200 pl-4 transition-colors duration-500">
            <span className="text-[10px] font-extrabold text-brand-950 uppercase tracking-[0.12em] transition-colors duration-500">Fulfilment Partner</span>
            <span className="text-[8px] text-slate-400 uppercase tracking-[0.15em] mt-0.5 transition-colors duration-500">Seamless Support Across Borders</span>
          </div>
        </div>

        {/* Right: Email + Status */}
        <div className="flex items-center gap-4 md:gap-6">
          <motion.a
            data-magnetic
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:Info@baavatech.com"
            onClick={handleCopyEmail}
            title="Click to copy email"
            className={`group flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 ${
              copied
                ? 'bg-accent-50 border border-accent-200 shadow-glow-teal'
                : 'glass-panel hover:bg-white/60 hover:border-brand-200 hover:shadow-md'
            }`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-accent-600" />
            ) : (
              <Mail className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            )}
            <span className={`text-xs md:text-sm font-bold transition-colors ${copied ? 'text-accent-600' : 'text-slate-600 group-hover:text-brand-700'}`}>
              {copied ? 'Copied!' : 'Info@baavatech.com'}
            </span>
            {!copied && <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          </motion.a>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2 glass-panel px-4 py-2 rounded-full cursor-default">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50" />
              <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operational</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
