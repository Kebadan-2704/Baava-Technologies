import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, Globe, FileText } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const TRUST_ITEMS = [
  {
    icon: Lock,
    label: '256-bit Encrypted',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
  },
  {
    icon: Zap,
    label: '99.9% Uptime',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Globe,
    label: 'Global Access',
    color: 'text-brand-600',
    bgColor: 'bg-brand-50',
  },
  {
    icon: FileText,
    stat: true,
    target: 10000,
    suffix: '+',
    label: 'Documents Processed',
    color: 'text-brand-700',
    bgColor: 'bg-brand-50',
  },
];

export default function TrustBar() {
  return (
    <section className="relative py-6 md:py-8 border-y border-slate-100 bg-slate-50/50" aria-label="Trust indicators">
      <div className="container-width">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 md:gap-3"
            >
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 md:w-[18px] md:h-[18px] ${item.color}`} />
              </div>
              <div>
                {item.stat ? (
                  <span className={`text-body-sm md:text-body-md font-bold ${item.color}`}>
                    <AnimatedCounter target={item.target} suffix={item.suffix} /> {item.label}
                  </span>
                ) : (
                  <span className="text-body-sm md:text-body-md font-semibold text-slate-600">
                    {item.label}
                  </span>
                )}
              </div>

              {/* Separator dot — hidden on last item */}
              {i < TRUST_ITEMS.length - 1 && (
                <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-300 ml-4 md:ml-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
