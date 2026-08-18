import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock, Zap, Globe, FileText, Users, Clock, ExternalLink } from 'lucide-react';

/* Animated counter that ticks up when visible */
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    setTimeout(() => requestAnimationFrame(animate), 300);
  }, [isInView, target, duration]);

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
  const [uptime, setUptime] = useState(99);
  const [isPingSuccess, setIsPingSuccess] = useState(true);

  useEffect(() => {
    // Real-Time Uptime Check Simulation (pings own origin)
    const checkUptime = async () => {
      try {
        const start = performance.now();
        await fetch(window.location.href, { method: 'HEAD', cache: 'no-cache' });
        const latency = performance.now() - start;
        setIsPingSuccess(true);
        // Simulate minor fluctuation
        setUptime(prev => prev >= 99.9 ? 99.9 : prev + 0.1);
      } catch (e) {
        setIsPingSuccess(false);
        setUptime(98);
      }
    };
    const interval = setInterval(checkUptime, 30000);
    checkUptime();
    return () => clearInterval(interval);
  }, []);

  const dynamicStats = STATS.map(s => s.label === 'Uptime' ? { ...s, value: uptime, color: isPingSuccess ? '#0e8d6d' : '#ef4444' } : s);

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
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-5">
            {dynamicStats.map((stat, i) => (
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
                  <span className="text-[14px] md:text-[15px] font-black tabular-nums transition-colors" style={{ color: stat.color }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000 + i * 200} />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
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

          {/* Footer Links + Copyright */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 md:gap-4 mt-4 md:mt-0">
            {/* Phone Number */}
            <a href="tel:+919876543210" className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors hover:bg-black/5">
              <span className="text-[12px] font-bold" style={{ color: 'var(--color-text-secondary)' }}>+91 98765 43210</span>
            </a>

            <span className="text-[12px]" style={{ color: 'var(--color-border)' }}>|</span>

            {/* Founder Links */}
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/in/veerankandasamy" target="_blank" rel="noopener noreferrer" className="text-[12px] font-medium hover:text-primary-600 transition-colors flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
                Veeran Kandasamy <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[12px]" style={{ color: 'var(--color-border)' }}>·</span>
              <a href="https://linkedin.com/in/rohinirangasamy" target="_blank" rel="noopener noreferrer" className="text-[12px] font-medium hover:text-primary-600 transition-colors flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
                Rohini Rangasamy <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <span className="hidden md:inline text-[12px]" style={{ color: 'var(--color-border)' }}>|</span>

            {/* Legal links */}
            <div className="flex items-center gap-3">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[12px] font-medium tracking-wide transition-colors hover:text-primary-600" style={{ color: 'var(--color-text-tertiary)' }}>
                Privacy Policy
              </a>
              <span className="text-[12px]" style={{ color: 'var(--color-border)' }}>·</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[12px] font-medium tracking-wide transition-colors hover:text-primary-600" style={{ color: 'var(--color-text-tertiary)' }}>
                Terms of Service
              </a>
            </div>

            <span className="hidden lg:inline text-[12px]" style={{ color: 'var(--color-border)' }}>|</span>

            {/* Copyright */}
            <p className="text-[12px] font-medium tracking-wide uppercase transition-colors whitespace-nowrap" style={{ color: 'var(--color-text-tertiary)' }}>
              © {new Date().getFullYear()} Baava Tech Pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
