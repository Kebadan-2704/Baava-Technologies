import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const PortalInfographic = memo(() => {
  const [arrivedIds, setArrivedIds] = useState(new Set());
  const [cycleKey, setCycleKey] = useState(0);

  const SERVICES = [
    { id: 1, label: 'Engineering', icon: '⚙️', color: '#3898f7' },
    { id: 2, label: 'Bookkeeping', icon: '💵', color: '#1aae86' },
    { id: 3, label: 'Students', icon: '🎓', color: '#8b5cf6' },
    { id: 4, label: 'Inventory', icon: '📦', color: '#84cc16' },
  ];

  const handleArrived = useCallback((id) => {
    setArrivedIds(prev => new Set(prev).add(id));
  }, []);

  // Auto-cycle
  useEffect(() => {
    const delays = SERVICES.map((_, i) => 
      setTimeout(() => handleArrived(SERVICES[i].id), 1200 + i * 1100)
    );
    return () => delays.forEach(clearTimeout);
  }, [cycleKey, handleArrived]);

  useEffect(() => {
    if (arrivedIds.size === SERVICES.length) {
      const t = setTimeout(() => {
        setArrivedIds(new Set());
        setCycleKey(k => k + 1);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [arrivedIds.size]);

  const allArrived = arrivedIds.size === SERVICES.length;
  const progress = (arrivedIds.size / SERVICES.length) * 100;

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="flex-1 min-w-0 w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] flex items-center justify-center relative perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[80%] bg-gradient-to-br from-brand-200/15 via-transparent to-accent-200/10 rounded-full blur-[60px]" />
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full max-h-full relative z-10"
      >
        {/* ── The Infographic SVG Flow ── */}
        <svg viewBox="0 0 900 420" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ transform: 'translateZ(20px)' }}>
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#3898f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1aae86" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3898f7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3898f7" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1aae86" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1aae86" stopOpacity="0.02" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <path id="pathLeft" d="M190 210 C240 210, 260 190, 310 190" />
            <path id="pathRight" d="M600 210 C640 210, 660 175, 700 175" />
          </defs>

          {/* ─── LEFT: Client Backlog (Messy Papers Illustration) ─── */}
          <g transform="translate(40, 120)">
            <rect x="0" y="0" width="140" height="170" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
            <rect x="0" y="0" width="140" height="170" rx="16" fill="url(#blueGlow)" />
            
            <motion.g 
              transform="translate(25, 20)"
              whileHover={{ scale: 1.06, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="cursor-pointer"
            >
              <rect x="12" y="-8" width="65" height="80" rx="4" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6" transform="rotate(12, 45, 30)" />
              <rect x="-5" y="-4" width="65" height="80" rx="4" fill="#fef9c3" stroke="#facc15" strokeWidth="0.8" opacity="0.7" transform="rotate(-8, 30, 35)" />
              <rect x="8" y="2" width="65" height="80" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.85" transform="rotate(5, 40, 40)" />
              <rect x="2" y="8" width="65" height="80" rx="4" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="10" y="18" width="35" height="3" rx="1.5" fill="#cbd5e1" />
              <rect x="10" y="26" width="48" height="3" rx="1.5" fill="#e2e8f0" />
              <rect x="10" y="34" width="40" height="3" rx="1.5" fill="#e2e8f0" />
              <rect x="10" y="42" width="30" height="3" rx="1.5" fill="#f1f5f9" />
              <rect x="10" y="50" width="44" height="3" rx="1.5" fill="#f1f5f9" />
              <circle cx="58" cy="18" r="8" fill="#f59e0b" opacity="0.9" />
              <text x="58" y="22" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">!</text>
            </motion.g>
            
            <text x="70" y="138" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400e" letterSpacing="0.1em" fontFamily="Inter, sans-serif">CLIENT BACKLOG</text>
            <text x="70" y="152" textAnchor="middle" fontSize="7.5" fill="#b45309" opacity="0.6" fontFamily="Inter, sans-serif">Unorganized</text>
          </g>

          {/* ─── FLOW PATH: Left → Center ─── */}
          <g>
            <use href="#pathLeft" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 4" />
            <circle r="4" fill="#f59e0b" filter="url(#softGlow)">
              <animateMotion dur="1.8s" repeatCount="indefinite">
                <mpath href="#pathLeft" />
              </animateMotion>
            </circle>
            <circle r="2" fill="white">
              <animateMotion dur="1.8s" repeatCount="indefinite">
                <mpath href="#pathLeft" />
              </animateMotion>
            </circle>
          </g>

          {/* ─── CENTER: The Processing Hub ─── */}
          <g transform="translate(310, 60)">
            <rect x="0" y="0" width="280" height="300" rx="24" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
            <rect x="0" y="0" width="280" height="44" rx="24" fill="#152c54" />
            <rect x="0" y="24" width="280" height="20" fill="#152c54" />
            <circle cx="20" cy="22" r="3.5" fill="#ef4444" opacity="0.8" />
            <circle cx="32" cy="22" r="3.5" fill="#fbbf24" opacity="0.8" />
            <circle cx="44" cy="22" r="3.5" fill="#22c55e" opacity="0.8" />
            <text x="140" y="27" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" opacity="0.8" letterSpacing="0.12em" fontFamily="Inter, sans-serif">BAAVA TECH PORTAL</text>

            <rect x="16" y="56" width="248" height="180" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text x="36" y="76" fontSize="7" fontWeight="700" fill="#64748b" letterSpacing="0.08em" fontFamily="Inter, sans-serif">INCOMING DOCUMENTS</text>
            
            {SERVICES.map((svc, i) => {
              const arrived = arrivedIds.has(svc.id);
              const yPos = 86 + i * 36;
              return (
                <motion.g 
                  key={svc.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="cursor-pointer"
                >
                  <rect x="28" y={yPos} width="224" height="28" rx="8" 
                    fill={arrived ? `${svc.color}12` : '#f1f5f9'} 
                    stroke={arrived ? `${svc.color}40` : '#e2e8f0'} 
                    strokeWidth="1"
                    style={{ transition: 'all 0.5s ease' }}
                  />
                  {arrived ? (
                    <>
                      <rect x="28" y={yPos} width="4" height="28" rx="8" fill={svc.color} opacity="0.8" />
                      <text x="44" y={yPos + 18} fontSize="13">{svc.icon}</text>
                      <text x="62" y={yPos + 18} fontSize="9" fontWeight="700" fill="#334155" fontFamily="Inter, sans-serif">{svc.label}</text>
                      <circle cx="234" cy={yPos + 14} r="8" fill={svc.color} opacity="0.15" />
                      <text x="234" y={yPos + 18} textAnchor="middle" fontSize="10" fill={svc.color}>✓</text>
                    </>
                  ) : (
                    <>
                      <rect x="40" y={yPos + 10} width="60" height="3" rx="1.5" fill="#e2e8f0" />
                      <rect x="40" y={yPos + 16} width="40" height="3" rx="1.5" fill="#f1f5f9" />
                      <circle cx="234" cy={yPos + 14} r="4" fill="#e2e8f0">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </motion.g>
              );
            })}

            <rect x="28" y="246" width="224" height="6" rx="3" fill="#f1f5f9" />
            <rect x="28" y="246" width={`${(progress / 100) * 224}`} height="6" rx="3" 
              fill={allArrived ? '#1aae86' : '#3898f7'}
              style={{ transition: 'width 0.6s ease, fill 0.5s ease' }}
            />
            
            <text x="140" y="270" textAnchor="middle" fontSize="8" fontWeight="600" 
              fill={allArrived ? '#1aae86' : '#3898f7'} fontFamily="Inter, sans-serif">
              {allArrived ? '✓ All Documents Organized & Secured' : `Processing ${arrivedIds.size} of ${SERVICES.length} categories...`}
            </text>

            <g transform="translate(242, -12)">
              <circle r="16" fill={allArrived ? '#1aae86' : '#3898f7'} style={{ transition: 'fill 0.5s ease' }} />
              <circle r="16" fill="none" stroke="white" strokeWidth="3" />
              <text x="0" y="5" textAnchor="middle" fontSize="14" fill="white">🛡️</text>
              {allArrived && (
                <circle r="20" fill="none" stroke="#1aae86" strokeWidth="2" opacity="0.4">
                  <animate attributeName="r" values="16;24;16" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          </g>

          {/* ─── FLOW PATH: Center → Right ─── */}
          <g>
            <use href="#pathRight" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 4" />
            <circle r="4" fill="#1aae86" filter="url(#softGlow)">
              <animateMotion dur="1.8s" repeatCount="indefinite">
                <mpath href="#pathRight" />
              </animateMotion>
            </circle>
            <circle r="2" fill="white">
              <animateMotion dur="1.8s" repeatCount="indefinite">
                <mpath href="#pathRight" />
              </animateMotion>
            </circle>
          </g>

          {/* ─── RIGHT: Organized Output ─── */}
          <g transform="translate(700, 80)">
            <rect x="0" y="0" width="170" height="260" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
            <rect x="0" y="0" width="170" height="260" rx="16" fill="url(#greenGlow)" />
            
            {SERVICES.map((svc, i) => {
              const yPos = 18 + i * 56;
              const isActive = arrivedIds.has(svc.id);
              return (
                <motion.g 
                  key={`out-${svc.id}`} 
                  initial={{ opacity: isActive ? 1 : 0.25 }}
                  animate={{ opacity: isActive ? 1 : 0.25 }}
                  whileHover={{ scale: 1.04, x: 5, opacity: 1 }}
                  className="cursor-pointer"
                >
                  <rect x="14" y={yPos} width="142" height="44" rx="10" fill={`${svc.color}08`} stroke={`${svc.color}30`} strokeWidth="1" />
                  <rect x="14" y={yPos} width="5" height="44" rx="10" fill={svc.color} opacity="0.6" />
                  <text x="34" y={yPos + 20} fontSize="14">{svc.icon}</text>
                  <text x="54" y={yPos + 19} fontSize="8.5" fontWeight="700" fill="#334155" fontFamily="Inter, sans-serif">{svc.label}</text>
                  <text x="54" y={yPos + 32} fontSize="6.5" fill="#64748b" fontFamily="Inter, sans-serif">Organized & Secured</text>
                  {isActive && (
                    <g transform={`translate(140, ${yPos + 16})`}>
                      <circle r="6" fill={svc.color} opacity="0.15" />
                      <text x="0" y="4" textAnchor="middle" fontSize="8" fill={svc.color}>✓</text>
                    </g>
                  )}
                </motion.g>
              );
            })}
          </g>

          {/* ─── Flow Labels ─── */}
          <text x="235" y="165" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#b45309" opacity="0.6" letterSpacing="0.08em" fontFamily="Inter, sans-serif">YOU SEND</text>
          <text x="655" y="165" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0e8d6d" opacity="0.6" letterSpacing="0.08em" fontFamily="Inter, sans-serif">YOU RECEIVE</text>

          {/* ─── Bottom Process Label ─── */}
          <g transform="translate(310, 385)">
            <rect x="0" y="0" width="280" height="28" rx="14" fill="#152c54" opacity="0.05" />
            <text x="140" y="18" textAnchor="middle" fontSize="8" fontWeight="700" fill="#152c54" opacity="0.5" letterSpacing="0.15em" fontFamily="Inter, sans-serif">
              YOU SEND → WE PROCESS → YOU RECEIVE
            </text>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
});

export default PortalInfographic;
