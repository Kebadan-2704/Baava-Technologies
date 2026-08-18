import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle, ChevronRight, Star } from 'lucide-react';

export default function LiveIntelligence() {
  const credentials = [
    { label: "Women-Led Enterprise", desc: "Driving inclusive innovation in tech" },
    { label: "ISO 27001", desc: "Information Security Management" },
    { label: "SOC 2 Type II", desc: "Enterprise Data Compliance" },
    { label: "GDPR Ready", desc: "Data Protection Standard" }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start relative overflow-hidden bg-surface">
      <div className="flex items-center justify-between mb-2 px-1 flex-shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent-600" />
          <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-tertiary)' }}>Trust & Credentials</p>
        </div>
      </div>

      <div className="relative flex-1 rounded-xl bg-white border shadow-sm p-4 md:p-5 flex flex-col justify-start overflow-hidden" style={{ borderColor: 'var(--color-border-subtle)' }}>
        
        {/* The Introduction */}
        <div className="mb-4 pb-3 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <h3 className="text-[14px] font-bold flex items-center gap-2 mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
            Enterprise-Grade Security
          </h3>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Your operational data is protected by bank-level security protocols and strict access controls. We are committed to maintaining the highest industry standards.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 flex-1 justify-start overflow-y-auto pr-2 scrollbar-hide"
        >
          {credentials.map((cred, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-2.5 rounded-lg border bg-surface-alt relative overflow-hidden"
              style={{ borderColor: 'var(--color-border-subtle)' }}
            >
              {cred.label === "Women-Led Enterprise" && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
              )}
              {cred.label === "Women-Led Enterprise" ? (
                <Star className="w-4 h-4 text-purple-500 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0" />
              )}
              <div className="flex flex-col relative z-10">
                <span className="text-[12px] font-bold text-text-primary">{cred.label}</span>
                <span className="text-[11px] text-text-tertiary">{cred.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-2 text-right flex-shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60" style={{ color: 'var(--color-text-tertiary)' }}>Est. 2024 • India</span>
      </div>
    </div>
  );
}
