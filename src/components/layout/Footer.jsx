import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Zap, Globe, FileText, Lock } from 'lucide-react';

export default function Footer() {
  const footerRef = React.useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-20px" });

  return (
    <motion.footer
      ref={footerRef}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 w-full mt-auto"
      role="contentinfo"
    >
      {/* Top border gradient */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent-600" />
              <span className="text-[10px] md:text-xs text-slate-500 font-semibold transition-colors">256-bit Encrypted</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] md:text-xs text-slate-500 font-semibold transition-colors">99.9% Uptime</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-500" />
              <span className="text-[10px] md:text-xs text-slate-500 font-semibold transition-colors">Global Access</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              <span className="text-[10px] md:text-xs text-brand-700 font-bold transition-colors">
                10,000+ Documents
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-wide uppercase text-center md:text-right transition-colors">
            © {new Date().getFullYear()} Baava Tech • Karur, TN, India
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
