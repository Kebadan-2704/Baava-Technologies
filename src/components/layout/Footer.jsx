import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock, Zap, Globe, FileText, Users, Clock } from 'lucide-react';

/* Animated counter that ticks up on mount */
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    // Delay start for visual impact
    setTimeout(() => requestAnimationFrame(animate), 600);
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-display font-black">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  {
    icon: FileText,
    value: 10000,
    suffix: '+',
    label: 'Documents',
    color: '#1e78ec',
    bg: 'rgba(30, 120, 236, 0.06)',
  },
  {
    icon: Zap,
    value: 99,
    suffix: '.9%',
    label: 'Uptime',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.06)',
  },
  {
    icon: Lock,
    value: 256,
    suffix: '-bit',
    label: 'Encrypted',
    color: '#0e8d6d',
    bg: 'rgba(14, 141, 109, 0.06)',
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Operations',
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.06)',
  },
  {
    icon: Globe,
    value: 5,
    suffix: '+',
    label: 'Countries',
    color: '#1e78ec',
    bg: 'rgba(30, 120, 236, 0.06)',
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Engineers',
    color: '#0e8d6d',
    bg: 'rgba(14, 141, 109, 0.06)',
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10px" });

  return (
    <motion.footer
      ref={footerRef}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 w-full mt-auto"
      role="contentinfo"
    >
      {/* Animated gradient top border */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-brand-400/40 to-transparent animate-gradient-shift" style={{ backgroundSize: '200% 100%' }} />
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-14 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Animated Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 lg:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 group"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: stat.bg }}
                >
                  <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[12px] md:text-[13px] font-black tabular-nums transition-colors" style={{ color: stat.color }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000 + i * 200} />
                  </span>
                  <span className="text-[8px] md:text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                    {stat.label}
                  </span>
                </div>

                {/* Separator dot */}
                {i < STATS.length - 1 && (
                  <div className="hidden lg:block w-0.5 h-0.5 rounded-full ml-1 md:ml-2" style={{ background: 'var(--color-border)' }} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[8px] md:text-[9px] font-medium tracking-wide uppercase transition-colors whitespace-nowrap" style={{ color: 'var(--color-text-tertiary)' }}>
            © {new Date().getFullYear()} Baava Tech Pvt Ltd
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
