import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, ShieldCheck, ArrowRight, ArrowDownToLine } from 'lucide-react';

export default function DocumentationAnimation() {
  const documentCount = 4;

  return (
    <div className="w-full py-2 flex flex-col items-center justify-center space-y-6 md:space-y-8 relative overflow-hidden">
      
      {/* Visual Header / Subtitle */}
      <div className="text-center z-10 flex flex-col items-center gap-2">
        <span className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-[#26a7e0] font-mono flex items-center justify-center gap-3">
          <ArrowDownToLine className="w-5 h-5 animate-bounce" />
          Document & Admin Outsourcing
        </span>
        <h3 className="text-lg md:text-xl text-slate-500 font-medium font-sans max-w-2xl">
          Outsource your high-volume document workflows securely to Bava Tech
        </h3>
      </div>

      {/* Interactive Animation Field (Scaled Up) */}
      <div className="w-full flex items-center justify-between max-w-4xl relative px-4 z-10">
        
        {/* LEFT: Client High-Volume Unorganized Stack */}
        <div className="flex flex-col items-center space-y-6 relative z-20">
          <div className="relative w-28 h-28 md:w-32 md:h-32 bg-white rounded-3xl border-2 border-slate-200 shadow-xl flex items-center justify-center group hover:border-[#26a7e0]/50 transition-colors bg-clip-padding">
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-slate-300 absolute translate-y-[-8px] translate-x-[-8px]" />
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-slate-200 absolute translate-y-[-4px] translate-x-[-4px]" />
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-[#26a7e0] z-10" />
            
            {/* Outgoing Outsource Pulse Ring */}
            <div className="absolute inset-0 rounded-3xl border-[3px] border-[#26a7e0]/30 animate-ping opacity-75" />
          </div>
          <span className="text-sm md:text-base uppercase tracking-widest text-slate-400 font-bold font-mono bg-[#fafbfc] px-2">
            Client Backlog
          </span>
        </div>

        {/* MIDDLE: Transfer Pipeline with Floating Document Sheets */}
        <div className="flex-1 h-16 md:h-20 relative flex items-center justify-center z-10">
          {/* Wave Path Guide Line (Touching both edges perfectly) */}
          <div className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#26a7e0]/60 to-transparent rounded-full" />
          <div className="absolute left-0 right-0 h-[3px] border-y border-[#26a7e0]/20" />
          
          {/* Animated Sheen Sweep across pipeline */}
          <motion.div 
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-1/4 h-[4px] bg-gradient-to-r from-transparent via-[#26a7e0] to-transparent"
          />

          {/* Outsources Flying Sheets */}
          {[...Array(documentCount)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ left: "-10%", y: 0, opacity: 0, scale: 0.8 }}
              animate={{ 
                left: ["-10%", "110%"],
                y: [0, -25, 25, 0],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1.2, 1.2, 0.8],
                rotate: [0, 60, -60, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.7,
                ease: "easeInOut"
              }}
              className="absolute z-20 bg-white border-2 border-sky-100 p-3 rounded-xl shadow-md flex items-center justify-center -translate-x-1/2"
            >
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#26a7e0]" />
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Bava Tech Safe Organized Database */}
        <div className="flex flex-col items-center space-y-6 relative z-20">
          <motion.div 
            animate={{
              boxShadow: ["0 0 0 0 rgba(38,167,224,0.3)", "0 0 0 20px rgba(38,167,224,0)", "0 0 0 0 rgba(38,167,224,0)"]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-28 h-28 md:w-32 md:h-32 bg-[#00639b] rounded-3xl shadow-2xl flex items-center justify-center border-4 border-sky-400/30 bg-clip-padding"
          >
            <Database className="w-12 h-12 md:w-16 md:h-16 text-sky-100" />
            
            {/* Green Shield Success Check */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 bg-emerald-500 border-4 border-white rounded-full p-2 shadow-xl z-20"
            >
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
          </motion.div>
          <span className="text-sm md:text-base uppercase tracking-widest text-[#00639b] font-extrabold font-mono bg-[#fafbfc] px-2">
            Bava Tech Portal
          </span>
        </div>

      </div>
    </div>
  );
}
