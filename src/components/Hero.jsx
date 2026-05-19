import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import AnimatedText from './AnimatedText';
import ParticleNetwork from './ParticleNetwork';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 bg-[#F8FAFC] overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Premium Background Design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Modern Dot Grid and Line Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1.5px,transparent_1.5px),linear-gradient(to_bottom,#e2e8f0_1.5px,transparent_1.5px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.22]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.35]"></div>
        
        {/* Soft Glowing Gradient Blobs (Animated) */}
        <motion.div 
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-brand-300/15 via-brand-200/5 to-transparent blur-[120px]"
        />
        
        <motion.div 
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-brand-400/10 via-brand-300/5 to-transparent blur-[120px]"
        />

        <motion.div 
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[15%] w-[70%] h-[60%] bg-[radial-gradient(circle_at_50%_0%,#EBF8FE_0%,transparent_70%)] opacity-90"
        />
        
        {/* Thin vertical structure lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-slate-200/40 via-slate-200/15 to-transparent"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-slate-200/40 via-slate-200/15 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-slate-200/40 via-slate-200/15 to-transparent"></div>
        
        {/* Thin horizontal structure lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200/25 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200/25 to-transparent"></div>
        
        {/* Interactive Particle Network */}
        <div className="absolute inset-0 opacity-90 z-0">
          <ParticleNetwork />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
             className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200 mb-10 shadow-sm"
           >
             <span className="relative flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
             </span>
             <span className="text-xs font-bold tracking-[0.2em] text-slate-800 uppercase">Enterprise Grade Operations</span>
           </motion.div>
           
           <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-syne font-extrabold text-slate-900 tracking-tighter leading-[1.05] max-w-5xl mb-8 relative">
             <motion.span 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="block"
             >
               The architecture
             </motion.span>
             <motion.span 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-[#1A8FBF] to-[#083F5C]"
             >
               behind scale.
             </motion.span>
           </h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
             className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium"
           >
             Baava Tech engineers and manages the critical back-office frameworks, technical support pipelines, and operational data that allow modern businesses to operate flawlessly.
           </motion.p>
           
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-col sm:flex-row items-center gap-4"
           >
             <MagneticButton as="a" href="#contact" className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold flex items-center gap-3 hover:bg-brand-500 transition-colors shadow-xl shadow-slate-900/20 group">
               Partner With Us 
               <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                 <ArrowUpRight className="w-3.5 h-3.5" />
               </div>
             </MagneticButton>
             <a href="#services" className="px-8 py-4 rounded-full text-slate-600 font-bold flex items-center gap-2 hover:text-brand-500 transition-colors group">
               View Capabilities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
           </motion.div>
        </div>

        {/* BENTO GRID (Hero Extension) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Main Feature - Left */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-brand-300 transition-colors"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-50 to-transparent rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#26A7E0] to-[#14759E] text-white flex items-center justify-center mb-12 shadow-lg shadow-brand-500/30">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-syne font-bold text-slate-900 mb-4">Enterprise Data & Administration</h3>
                <p className="text-slate-500 max-w-md text-lg leading-relaxed">Flawless execution of records management, pipeline automation, and structural compliance for high-volume B2B operations.</p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Feature - Right */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-800 relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_100%_0%,#26A7E0_0%,transparent_70%)] group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-12">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-brand-400" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#26A7E0]/10 border border-[#26A7E0]/20 text-[#26A7E0] text-xs font-bold tracking-wide">
                  99.9% UPTIME
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-syne font-bold text-white mb-3">Tech Ops</h3>
                <p className="text-slate-400 leading-relaxed">Level 1 & 2 support systems engineered to operate with maximum reliability and security.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TRUST SIGNALS BORDER / MARQUEE */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 pt-10 border-t border-slate-200/60"
        >
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Deploying and Managing World-Class Infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Fake SVG logos using Typography since we don't have real SVGs */}
            <div className="text-xl font-bold font-sans tracking-tighter text-slate-900">Zendesk</div>
            <div className="text-xl font-black font-sans tracking-tighter text-slate-900">AWS</div>
            <div className="text-xl font-bold font-serif italic tracking-tight text-slate-900">Salesforce</div>
            <div className="text-xl font-extrabold font-sans tracking-tight text-slate-900">Microsoft</div>
            <div className="text-xl font-black font-sans tracking-tight text-slate-900">SAP</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
