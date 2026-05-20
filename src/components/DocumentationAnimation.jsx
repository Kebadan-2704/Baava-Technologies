import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShieldCheck, ArrowDownToLine, AlertTriangle, ChevronRight, Lock, Zap, Globe } from 'lucide-react';

const FLYING_DOCS = [
  { id: 1, label: 'Engineering', color: '#26a7e0', icon: '📐' },
  { id: 2, label: 'Bookkeeping', color: '#10b981', icon: '📒' },
  { id: 3, label: 'Students', color: '#8b5cf6', icon: '🎓' },
  { id: 4, label: 'Expenses', color: '#f59e0b', icon: '💰' },
  { id: 5, label: 'HR & Payroll', color: '#ef4444', icon: '👥' },
  { id: 6, label: 'Compliance', color: '#06b6d4', icon: '📋' },
  { id: 7, label: 'Inventory', color: '#84cc16', icon: '📦' },
  { id: 8, label: 'Invoices', color: '#ec4899', icon: '🧾' },
];

const FLY_DURATION = 5;
const STAGGER_DELAY = 1.2;
const RESET_PAUSE = 4;

const MESSY_PAPERS = [
  { rotate: -25, x: -24, y: -28, color: '#ef4444', label: 'urgent' },
  { rotate: 20, x: 22, y: -18, color: '#f59e0b' },
  { rotate: -10, x: -10, y: 8, color: '#8b5cf6', label: 'draft' },
  { rotate: 14, x: 16, y: 16, color: '#10b981' },
  { rotate: -4, x: 2, y: -6, color: '#26a7e0' },
  { rotate: 8, x: -16, y: 22, color: '#ec4899' },
  { rotate: -15, x: 12, y: -24, color: '#06b6d4' },
  { rotate: 25, x: -18, y: 14, color: '#84cc16' },
];

function MessyPaper({ rotate, x, y, color, delay, label, visible }) {
  return (
    <div
      className={`absolute w-[36px] h-[46px] md:w-[54px] md:h-[68px] rounded-sm md:rounded-lg shadow-md border border-slate-200/80 overflow-hidden transition-all duration-700 animate-float-messy ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
      style={{
        '--mx': `${x}px`,
        '--my': `${y}px`,
        '--mr': `${rotate}deg`,
        animationDelay: `${delay}s`,
        background: `linear-gradient(160deg, #ffffff 0%, #fafafa 60%, ${color}08 100%)`,
      }}
    >
      <div className="h-[2px] md:h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      <div className="p-[3px] md:p-[6px] space-y-[2px] md:space-y-[3px]">
        {[85, 65, 75, 55, 70].map((w, i) => (
          <div key={i} className="h-[1.5px] md:h-[2px] rounded-full bg-slate-200/60" style={{ width: `${w}%` }} />
        ))}
      </div>
      {label && (
        <div className="px-[3px] md:px-[5px]">
          <span className="text-[4px] md:text-[5px] font-bold uppercase tracking-wider" style={{ color: `${color}cc` }}>{label}</span>
        </div>
      )}
    </div>
  );
}

function FlyingPaper({ doc, index, cycleKey, onArrived }) {
  useEffect(() => {
    const totalDelay = (FLY_DURATION + (index * STAGGER_DELAY)) * 1000;
    const t = setTimeout(() => onArrived(doc.id), totalDelay);
    return () => clearTimeout(t);
  }, [cycleKey, index, doc.id, onArrived]);

  return (
    <div
      key={`${cycleKey}-${doc.id}`}
      className="absolute z-20 top-0 bottom-0 flex items-center justify-center opacity-0 animate-fly-doc"
      style={{ animationDelay: `${index * STAGGER_DELAY}s` }}
    >
      <div className="absolute inset-0 -left-8 rounded-2xl opacity-50 -z-10"
        style={{ background: `radial-gradient(ellipse at center, ${doc.color} 0%, transparent 70%)`, width: '140%', height: '100%' }} />
      <div className="rounded-lg md:rounded-xl overflow-hidden flex items-center gap-0 min-w-[90px] md:min-w-[170px] backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, ${doc.color}12 100%)`,
          border: `1.5px solid ${doc.color}40`,
          boxShadow: `0 8px 32px -6px ${doc.color}35, 0 2px 8px rgba(0,0,0,0.06)`,
        }}
      >
        <div className="w-[3px] md:w-[5px] self-stretch flex-shrink-0 rounded-l-lg md:rounded-l-xl"
          style={{ background: `linear-gradient(180deg, ${doc.color}, ${doc.color}aa)` }} />
        <div className="flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3.5 py-1.5 md:py-2.5">
          <span className="text-xs md:text-xl drop-shadow-sm">{doc.icon}</span>
          <span className="text-[8px] md:text-xs font-extrabold text-slate-800 uppercase tracking-wider whitespace-nowrap">
            {doc.label}
          </span>
        </div>
      </div>
    </div>
  );
}

// Sparkle flash on arrival
function ArrivalSparkle({ count }) {
  if (count === 0) return null;
  return (
    <motion.div
      key={count}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute inset-0 bg-white pointer-events-none z-30"
    />
  );
}

// Animated counter
function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { 
        setCount(target); 
        clearInterval(interval); 
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target]);
  return <span>{count.toLocaleString()}+</span>;
}

export default function DocumentationAnimation() {
  const [cycleKey, setCycleKey] = useState(0);
  const [arrivedIds, setArrivedIds] = useState(new Set());

  const handleArrived = useCallback((docId) => {
    setArrivedIds((prev) => new Set(prev).add(docId));
  }, []);

  useEffect(() => {
    if (arrivedIds.size === FLYING_DOCS.length) {
      const t = setTimeout(() => { setArrivedIds(new Set()); setCycleKey(k => k + 1); }, RESET_PAUSE * 1000);
      return () => clearTimeout(t);
    }
  }, [arrivedIds.size]);

  const allArrived = arrivedIds.size === FLYING_DOCS.length;
  const progress = (arrivedIds.size / FLYING_DOCS.length) * 100;
  // How many messy papers remain (shrink pile as docs arrive)
  const remainingPapers = Math.max(0, MESSY_PAPERS.length - arrivedIds.size);

  return (
    <div className="w-full py-1 flex flex-col items-center justify-center space-y-1 md:space-y-4 relative overflow-hidden">

        {/* Title Section */}
        <div className="flex flex-col items-center space-y-1 md:space-y-3 z-20 mb-3 md:mb-12">
          <div className="flex items-center gap-1.5 md:gap-3">
            <ArrowDownToLine className="w-4 h-4 md:w-6 md:h-6 text-[#26a7e0] animate-bounce" />
            <h1 className="text-[10px] md:text-base font-black tracking-[0.1em] md:tracking-[0.3em] uppercase animate-text-shimmer">
              Document & Admin Outsourcing
            </h1>
          </div>
          <p className="text-[11px] md:text-xl font-bold text-slate-500 max-w-2xl text-center leading-relaxed px-4 md:px-0">
            Outsource your high-volume document workflows securely to Bava Tech
          </p>
        </div>

      {/* Animation Field */}
      <div className="w-full flex items-center justify-between max-w-5xl relative px-1 md:px-8 z-10">

        {/* LEFT: Inbox */}
        <div className="flex flex-col items-center space-y-1 md:space-y-2 relative z-20 flex-shrink-0">
          <div className="relative w-[90px] h-[100px] md:w-[155px] md:h-[165px] flex items-center justify-center">
            <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-amber-100/50 blur-md" />
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-white to-amber-50/80 border-2 border-dashed border-amber-300/50 shadow-inner" />

            {MESSY_PAPERS.map((p, i) => (
              <MessyPaper key={i} {...p} delay={i * 0.3} visible={i < remainingPapers} />
            ))}

            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-2.5 -right-2.5 z-30">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-40 animate-ping" />
                <div className="relative bg-gradient-to-br from-amber-400 to-amber-500 rounded-full p-1.5 shadow-lg border-[3px] border-white">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="text-center">
            <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-amber-600 font-bold font-mono">Client Backlog</span>
            <p className="text-[7px] md:text-[9px] text-slate-400 mt-0 md:mt-0.5">Unorganized</p>
          </div>
        </div>

        {/* Dotted connector: Left → Pipeline */}
        <svg className="absolute left-[12%] md:left-[14%] top-1/2 -translate-y-1/2 w-[8%] h-10 md:h-16 z-0" viewBox="0 0 80 60" fill="none">
          <motion.path d="M0,30 Q40,5 80,30" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none"
            animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </svg>

        {/* MIDDLE: Pipeline */}
        <div className="flex-1 h-12 md:h-32 relative flex items-center justify-center z-10 mx-2 md:mx-6">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
            <div className="absolute -inset-y-3 left-0 right-0 bg-gradient-to-r from-amber-200/15 via-[#26a7e0]/12 to-emerald-200/15 rounded-full blur-sm" />
            <div className="h-[1.5px] bg-gradient-to-r from-amber-300/50 via-[#26a7e0]/60 to-emerald-400/50 rounded-full" />
            <div className="h-[3px] my-[4px] bg-gradient-to-r from-amber-100/15 via-[#26a7e0]/12 to-emerald-100/15 rounded-full" />
            <div className="h-[1.5px] bg-gradient-to-r from-amber-300/50 via-[#26a7e0]/60 to-emerald-400/50 rounded-full" />
          </div>

          <motion.div animate={{ x: ["-10vw", "50vw"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-[25%] h-5 rounded-full bg-gradient-to-r from-transparent via-[#26a7e0]/20 to-transparent blur-[2px]" 
            style={{ willChange: 'transform' }}
          />

          {[15, 35, 55, 75, 92].map((pos, i) => (
            <div key={pos} 
              className="absolute top-1/2 -translate-y-1/2 animate-pulse-chevron" 
              style={{ left: `${pos}%`, animationDelay: `${i * 0.3}s` }}>
              <ChevronRight className="w-3.5 h-3.5 text-[#26a7e0]/35" />
            </div>
          ))}

          {FLYING_DOCS.map((doc, index) => (
            <FlyingPaper key={`${cycleKey}-${doc.id}`} doc={doc} index={index} cycleKey={cycleKey} onArrived={handleArrived} />
          ))}
        </div>

        {/* Dotted connector: Pipeline → Server */}
        <svg className="absolute right-[12%] md:right-[14%] top-1/2 -translate-y-1/2 w-[8%] h-10 md:h-16 z-0" viewBox="0 0 80 60" fill="none">
          <motion.path d="M0,30 Q40,55 80,30" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" fill="none"
            animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </svg>

        {/* RIGHT: Server */}
        <div className="flex flex-col items-center space-y-1 md:space-y-2 relative z-50 flex-shrink-0">
          <div className="relative">
            <AnimatePresence>
              {allArrived && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="absolute -inset-2 md:-inset-3 rounded-2xl md:rounded-3xl bg-emerald-400/15 blur-lg" />
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                boxShadow: allArrived
                  ? ["0 0 0 0 rgba(16,185,129,0.3)", "0 0 0 14px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"]
                  : ["0 0 0 0 rgba(38,167,224,0.2)", "0 0 0 12px rgba(38,167,224,0)", "0 0 0 0 rgba(38,167,224,0)"],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[100px] h-[125px] md:w-[165px] md:h-[220px] rounded-xl md:rounded-2xl shadow-2xl flex flex-col items-center border overflow-hidden transition-colors duration-700"
              style={{
                background: allArrived ? 'linear-gradient(145deg, #065f46 0%, #064e3b 100%)' : 'linear-gradient(145deg, #00639b 0%, #003f6b 100%)',
                borderColor: allArrived ? 'rgba(16,185,129,0.3)' : 'rgba(56,189,248,0.2)',
              }}
            >
              {/* Sparkle burst on each arrival */}
              <ArrivalSparkle count={arrivedIds.size} />

              <div className="w-full px-4 pt-2 flex items-center gap-1.5 opacity-30">
                <div className="h-[2px] flex-1 bg-white/60 rounded" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                <div className="h-[2px] flex-1 bg-white/60 rounded" />
              </div>

              <div className="flex-1 w-full px-1.5 md:px-2 py-1 flex flex-col gap-[2px] md:gap-[3px] items-center overflow-hidden">
                <AnimatePresence>
                  {FLYING_DOCS.filter(d => arrivedIds.has(d.id)).slice(-5).map(doc => (
                    <motion.div key={doc.id}
                      initial={{ opacity: 0, scale: 0.3, x: -30, y: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      transition={{ type: "spring", stiffness: 150, damping: 14 }}
                      className="flex items-center gap-1 md:gap-1.5 px-1 md:px-2 py-[2px] md:py-[3px] rounded md:rounded-lg text-[6px] md:text-[9px] font-bold text-white uppercase tracking-wider whitespace-nowrap w-full justify-center shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${doc.color}ee, ${doc.color}bb)`, boxShadow: `0 2px 8px ${doc.color}30` }}
                    >
                      <span className="text-[7px] md:text-[10px]">{doc.icon}</span>
                      <span className="drop-shadow-sm">{doc.label}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {arrivedIds.size === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-1 opacity-40">
                    <Database className="w-6 h-6 md:w-11 md:h-11 text-white/50" />
                    <span className="text-[5px] md:text-[7px] text-white/40 uppercase tracking-widest font-mono">Awaiting</span>
                  </div>
                )}
              </div>

              <div className="w-full px-2 md:px-3 pb-1.5 md:pb-2">
                <div className="w-full h-[2px] md:h-[3px] rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: allArrived ? 'linear-gradient(90deg, #34d399, #6ee7b7)' : 'linear-gradient(90deg, #26a7e0, #67d4ff)' }}
                    animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
                </div>
              </div>

              <div className="w-full px-4 pb-1.5 flex items-center gap-1.5 opacity-20">
                <div className="h-[1.5px] flex-1 bg-white/60 rounded" /><div className="h-[1.5px] flex-1 bg-white/60 rounded" />
              </div>
            </motion.div>

            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2.5 -right-2.5 z-20">
              <div className="relative">
                {allArrived && <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-60 animate-ping" />}
                <div className="relative rounded-full p-1.5 shadow-xl border-[3px] border-white transition-colors duration-500"
                  style={{ background: allArrived ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}>
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-sm" />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="text-center">
            <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-[#00639b] font-extrabold font-mono">Bava Tech Portal</span>
            <AnimatePresence mode="wait">
              {allArrived ? (
                <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[7px] md:text-[9px] text-emerald-500 font-bold mt-0 md:mt-0.5">✓ All Securely Organized</motion.p>
              ) : (
                <motion.p key="prog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[7px] md:text-[9px] text-sky-400 font-medium mt-0 md:mt-0.5 tabular-nums">Receiving {arrivedIds.size}/{FLYING_DOCS.length}</motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Trust badges + Counter row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
        className="flex items-center justify-center gap-1.5 md:gap-5 z-10 flex-wrap mt-2 md:mt-0">
        <div className="flex items-center gap-1 md:gap-1.5 text-[8px] md:text-[10px] text-slate-400 font-medium">
          <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-500" /><span>256-bit Encrypted</span>
        </div>
        <div className="w-[3px] h-[3px] rounded-full bg-slate-300" />
        <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-medium">
          <Zap className="w-3 h-3 text-amber-500" /><span>99.9% Uptime</span>
        </div>
        <div className="w-[3px] h-[3px] rounded-full bg-slate-300" />
        <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-medium">
          <Globe className="w-3 h-3 text-[#26a7e0]" /><span>Global Access</span>
        </div>
        <div className="w-[3px] h-[3px] rounded-full bg-slate-300" />
        <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-[#26a7e0] font-bold">
          <span>📄</span><span><AnimatedCounter target={10000} /> Documents Processed</span>
        </div>
      </motion.div>
    </div>
  );
}
