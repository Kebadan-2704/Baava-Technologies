import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const TICKER_MESSAGES = [
  { text: 'Processing BOM revision v3.2...', color: '#84cc16' },
  { text: 'ERP data sync — 2,847 records updated', color: '#ec4899' },
  { text: 'RPA workflow completed — 12 invoices processed', color: '#0e8d6d' },
  { text: 'Technical data validated — 99.97% accuracy', color: '#515e7b' },
  { text: 'Support ticket #4891 resolved — SLA met', color: '#8b5cf6' },
  { text: 'Supply chain PO #7823 — vendor confirmed', color: '#f59e0b' },
  { text: 'Document v4.1 archived — compliance verified', color: '#ec4899' },
];

const MacroHub = memo(({ activeService }) => {
  const [arrivedIds, setArrivedIds] = useState(new Set());
  const [cycleKey, setCycleKey] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);

  const SERVICES = [
    { id: 'erp', label: 'ERP Integration', icon: '⚙️', color: '#ec4899' },
    { id: 'rpa', label: 'Automation', icon: '🤖', color: '#0e8d6d' },
    { id: 'data', label: 'Data Entry', icon: '📋', color: '#515e7b' },
    { id: 'support', label: 'Tech Support', icon: '🎧', color: '#8b5cf6' },
    { id: 'supply', label: 'Supply Chain', icon: '🔗', color: '#f59e0b' },
    { id: 'docs', label: 'Doc Mgmt', icon: '📁', color: '#ec4899' },
    { id: 'bom', label: 'BOM Lifecycle', icon: '🔧', color: '#84cc16' },
  ];

  const handleArrived = useCallback((id) => {
    setArrivedIds(prev => new Set(prev).add(id));
  }, []);

  useEffect(() => {
    const delays = SERVICES.map((_, i) => 
      setTimeout(() => handleArrived(SERVICES[i].id), 800 + i * 650)
    );
    return () => delays.forEach(clearTimeout);
  }, [cycleKey, handleArrived]);

  useEffect(() => {
    if (arrivedIds.size === SERVICES.length) {
      const t = setTimeout(() => {
        setArrivedIds(new Set());
        setCycleKey(k => k + 1);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [arrivedIds.size]);

  // Live operations ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(i => (i + 1) % TICKER_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const allArrived = arrivedIds.size === SERVICES.length;
  const progress = (arrivedIds.size / SERVICES.length) * 100;

  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="flex-1 min-w-0 w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[520px] flex items-center justify-center relative perspective-[1200px] lg:pl-8 xl:pl-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[80%] bg-gradient-to-br from-brand-200/8 via-transparent to-steel-200/6 rounded-full blur-[60px]" />
      </div>
      {/* Pulsing corner glow */}
      <div className="absolute top-[10%] right-[5%] w-16 h-16 rounded-full blur-2xl pointer-events-none animate-gentle-pulse" style={{ background: 'rgba(236, 72, 153, 0.12)' }} />
      <div className="absolute bottom-[15%] left-[8%] w-12 h-12 rounded-full blur-xl pointer-events-none animate-gentle-pulse" style={{ background: 'rgba(14, 141, 109, 0.1)', animationDelay: '1.5s' }} />

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full max-h-full relative z-10"
      >
        <svg viewBox="0 0 920 440" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ transform: 'translateZ(20px)' }}>
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0e8d6d" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e8d6d" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0e8d6d" stopOpacity="0.01" />
            </linearGradient>
            {/* Animated gradient for hub border */}
            <linearGradient id="hubBorderGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5">
                <animate attributeName="stop-color" values="#ec4899;#0e8d6d;#f59e0b;#ec4899" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#0e8d6d" stopOpacity="0.3">
                <animate attributeName="stop-color" values="#0e8d6d;#f59e0b;#ec4899;#0e8d6d" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5">
                <animate attributeName="stop-color" values="#f59e0b;#ec4899;#0e8d6d;#f59e0b" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="borderGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <path id="pathLeft" d="M175 220 C220 220, 240 200, 280 200" />
            <path id="pathRight" d="M620 220 C660 220, 680 185, 720 185" />
          </defs>

          {/* ── LEFT: Incoming Tasks ── */}
          <g transform="translate(30, 115)">
            <rect x="0" y="0" width="135" height="200" rx="14" fill="#faf9f7" stroke="#ddd8d0" strokeWidth="1.2" />
            <rect x="0" y="0" width="135" height="200" rx="14" fill="url(#blueGlow)" />
            
            <motion.g 
              transform="translate(22, 16)"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="cursor-pointer"
            >
              <rect x="10" y="-6" width="60" height="70" rx="3" fill="#f5f3f0" stroke="#ddd8d0" strokeWidth="0.7" opacity="0.5" transform="rotate(10, 40, 28)" />
              <rect x="-4" y="-2" width="60" height="70" rx="3" fill="#faf9f7" stroke="#ddd8d0" strokeWidth="0.7" opacity="0.6" transform="rotate(-6, 28, 32)" />
              <rect x="6" y="4" width="60" height="70" rx="3" fill="#fff" stroke="#d5dae3" strokeWidth="0.7" opacity="0.8" transform="rotate(4, 36, 36)" />
              <rect x="0" y="8" width="60" height="70" rx="3" fill="#fff" stroke="#b0b9cb" strokeWidth="0.9" />
              <rect x="8" y="16" width="30" height="2.5" rx="1" fill="#b0b9cb" />
              <rect x="8" y="22" width="42" height="2.5" rx="1" fill="#d5dae3" />
              <rect x="8" y="28" width="35" height="2.5" rx="1" fill="#d5dae3" />
              <rect x="8" y="34" width="25" height="2.5" rx="1" fill="#eceef2" />
              <rect x="8" y="40" width="38" height="2.5" rx="1" fill="#eceef2" />
              <circle cx="52" cy="16" r="7" fill="#f59e0b" opacity="0.9" />
              <text x="52" y="20" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">!</text>
            </motion.g>
            
            <text x="67" y="165" textAnchor="middle" fontSize="11" fontWeight="800" fill="#515e7b" letterSpacing="0.1em" fontFamily="Inter, sans-serif">INCOMING</text>
            <text x="67" y="178" textAnchor="middle" fontSize="9" fill="#8593ae" fontFamily="Inter, sans-serif">Your Unstructured Inputs</text>
          </g>

          {/* ── FLOW: Left → Center ── */}
          <g>
            <use href="#pathLeft" stroke="#d5dae3" strokeWidth="1.5" strokeDasharray="5 3" />
            <circle r="3.5" fill="#f59e0b" filter="url(#softGlow)">
              <animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#pathLeft" /></animateMotion>
            </circle>
            <circle r="1.5" fill="white">
              <animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#pathLeft" /></animateMotion>
            </circle>
          </g>

          {/* ── CENTER: Operations Hub ── */}
          <g transform="translate(280, 30)">
            {/* Animated glowing border */}
            <rect x="-2" y="-2" width="344" height="384" rx="22" fill="none" stroke="url(#hubBorderGrad)" strokeWidth="3" filter="url(#borderGlow)" opacity="0.6" />
            <rect x="0" y="0" width="340" height="380" rx="20" fill="#faf9f7" stroke="#d5dae3" strokeWidth="1.2" />
            {/* Title bar */}
            <rect x="0" y="0" width="340" height="38" rx="20" fill="#22272f" />
            <rect x="0" y="20" width="340" height="18" fill="#22272f" />
            <circle cx="18" cy="19" r="3" fill="#ef4444" opacity="0.8" />
            <circle cx="28" cy="19" r="3" fill="#fbbf24" opacity="0.8" />
            <circle cx="38" cy="19" r="3" fill="#22c55e" opacity="0.8" />
            <text x="170" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" opacity="0.85" letterSpacing="0.12em" fontFamily="Inter, sans-serif">BAAVA TECH OPERATIONS HUB</text>

            {/* Inner panel */}
            <rect x="14" y="48" width="312" height="275" rx="10" fill="#f5f3f0" stroke="#ddd8d0" strokeWidth="0.8" />
            <text x="32" y="66" fontSize="9" fontWeight="700" fill="#515e7b" letterSpacing="0.07em" fontFamily="Inter, sans-serif">ACTIVE OPERATIONS</text>
            
            {/* 7 Service rows — compact */}
            {SERVICES.map((svc, i) => {
              const arrived = arrivedIds.has(svc.id) || activeService === svc.id;
              const isForcedActive = activeService === svc.id;
              const yPos = 74 + i * 33;
              return (
                <motion.g 
                  key={svc.id}
                  animate={isForcedActive ? { scale: 1.02, x: 5 } : { scale: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="cursor-pointer"
                >
                  <rect x="24" y={yPos} width="280" height="26" rx="7"
                    fill={arrived ? `${svc.color}10` : '#eae7e2'} 
                    stroke={arrived ? `${svc.color}35` : '#ddd8d0'} 
                    strokeWidth="0.8"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  {arrived ? (
                    <>
                      <rect x="24" y={yPos} width="3.5" height="26" rx="7" fill={svc.color} opacity="0.75" />
                      <text x="38" y={yPos + 17} fontSize="14">{svc.icon}</text>
                      <text x="54" y={yPos + 17} fontSize="11" fontWeight="700" fill="#333a48" fontFamily="Inter, sans-serif">{svc.label}</text>
                      <circle cx="290" cy={yPos + 13} r="7" fill={svc.color} opacity="0.12" />
                      <text x="290" y={yPos + 16.5} textAnchor="middle" fontSize="11" fill={svc.color}>✓</text>
                    </>
                  ) : (
                    <>
                      <rect x="36" y={yPos + 9} width="55" height="2.5" rx="1" fill="#d5dae3" />
                      <rect x="36" y={yPos + 14} width="35" height="2.5" rx="1" fill="#eceef2" />
                      <circle cx="290" cy={yPos + 13} r="3.5" fill="#d5dae3">
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </motion.g>
              );
            })}

            {/* Progress bar */}
            <rect x="24" y="310" width="280" height="5" rx="2.5" fill="#eae7e2" />
            <rect x="24" y="310" width={`${(progress / 100) * 280}`} height="5" rx="2.5" 
              fill={allArrived ? '#0e8d6d' : '#ec4899'}
              style={{ transition: 'width 0.5s ease, fill 0.4s ease' }}
            />
            
            <text x="170" y="332" textAnchor="middle" fontSize="10" fontWeight="600" 
              fill={allArrived ? '#0e8d6d' : TICKER_MESSAGES[tickerIndex].color} fontFamily="Inter, sans-serif"
              style={{ transition: 'fill 0.4s ease' }}
            >
              {allArrived ? '✓ All Operations Complete & Secured' : TICKER_MESSAGES[tickerIndex].text}
            </text>

            {/* Shield badge */}
            <g transform="translate(306, -10)">
              <circle r="14" fill={allArrived ? '#0e8d6d' : '#ec4899'} style={{ transition: 'fill 0.4s ease' }} />
              <circle r="14" fill="none" stroke="white" strokeWidth="2.5" />
              <text x="0" y="5" textAnchor="middle" fontSize="16" fill="white">🛡️</text>
              {allArrived && (
                <circle r="18" fill="none" stroke="#0e8d6d" strokeWidth="1.5" opacity="0.4">
                  <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          </g>

          {/* ── FLOW: Center → Right ── */}
          <g>
            <use href="#pathRight" stroke="#d5dae3" strokeWidth="1.5" strokeDasharray="5 3" />
            <circle r="3.5" fill="#0e8d6d" filter="url(#softGlow)">
              <animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#pathRight" /></animateMotion>
            </circle>
            <circle r="1.5" fill="white">
              <animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#pathRight" /></animateMotion>
            </circle>
          </g>

          {/* ── RIGHT: Structured Output ── */}
          <g transform="translate(720, 60)">
            <rect x="0" y="0" width="170" height="320" rx="14" fill="#faf9f7" stroke="#d5dae3" strokeWidth="1.2" />
            <rect x="0" y="0" width="170" height="320" rx="14" fill="url(#greenGlow)" />
            
            {SERVICES.map((svc, i) => {
              const yPos = 12 + i * 42;
              const isActive = arrivedIds.has(svc.id) || activeService === svc.id;
              const isForcedActive = activeService === svc.id;
              return (
                <motion.g 
                  key={`out-${svc.id}`} 
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: isActive ? 1 : 0.2, scale: isForcedActive ? 1.03 : 1, x: isForcedActive ? 4 : 0 }}
                  className="cursor-pointer"
                >
                  <rect x="12" y={yPos} width="146" height="34" rx="8" fill={`${svc.color}06`} stroke={`${svc.color}25`} strokeWidth="0.8" />
                  <rect x="12" y={yPos} width="4" height="34" rx="8" fill={svc.color} opacity="0.5" />
                  <text x="28" y={yPos + 15} fontSize="14">{svc.icon}</text>
                  <text x="44" y={yPos + 14} fontSize="10.5" fontWeight="700" fill="#333a48" fontFamily="Inter, sans-serif">{svc.label}</text>
                  <text x="44" y={yPos + 25} fontSize="8" fill="#515e7b" fontFamily="Inter, sans-serif">Processed & Audit-Ready</text>
                  {isActive && (
                    <g transform={`translate(144, ${yPos + 12})`}>
                      <circle r="5" fill={svc.color} opacity="0.12" />
                      <text x="0" y="3.5" textAnchor="middle" fontSize="10" fill={svc.color}>✓</text>
                    </g>
                  )}
                </motion.g>
              );
            })}
          </g>

          {/* ── Flow Labels ── */}
          <text x="215" y="175" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b" opacity="0.55" letterSpacing="0.08em" fontFamily="Inter, sans-serif">YOU SUBMIT</text>
          <text x="675" y="175" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0e8d6d" opacity="0.55" letterSpacing="0.08em" fontFamily="Inter, sans-serif">YOU RECEIVE</text>

          {/* ── Bottom Label ── */}
          <g transform="translate(280, 415)">
            <rect x="0" y="0" width="340" height="22" rx="11" fill="#22272f" opacity="0.04" />
            <text x="170" y="15" textAnchor="middle" fontSize="9" fontWeight="700" fill="#22272f" opacity="0.45" letterSpacing="0.14em" fontFamily="Inter, sans-serif">
              YOU SUBMIT → WE OPERATE → YOU RECEIVE
            </text>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
});

export default MacroHub;
