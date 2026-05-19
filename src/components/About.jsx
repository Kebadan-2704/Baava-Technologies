import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CORPORATE_DATA } from '../data/content';

const About = () => {
  const points = [
    "Enterprise-grade administrative compliance",
    "Scalable back-office data processing",
    "Secure B2B service delivery models",
    "Dedicated level 1 & 2 technical support"
  ];

  return (
    <section id="about" className="py-32 relative z-10 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-slate-900/20">
              <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2326A7E0\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#26A7E0]/40 to-transparent rounded-full blur-[80px] -mr-40 -mt-40 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#26A7E0]"></span>
                  <span className="text-xs font-bold tracking-widest text-white uppercase">Corporate Profile</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-syne font-bold text-white mb-6 leading-tight">
                  Based in Karur.<br/>
                  <span className="text-[#26A7E0]">Scaling Globally.</span>
                </h3>
              </div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <div className="text-xs font-bold text-[#26A7E0] uppercase tracking-wider mb-2">Incorporated</div>
                  <div className="text-xl font-bold text-white">{CORPORATE_DATA.registry.incorporationDate.split(',')[1]}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <div className="text-xs font-bold text-[#26A7E0] uppercase tracking-wider mb-2">Industry</div>
                  <div className="text-xl font-bold text-white">B2B Support</div>
                </div>
                <div className="col-span-2 bg-white p-6 rounded-2xl">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Registry CIN</div>
                  <div className="text-lg font-mono font-bold text-slate-900">{CORPORATE_DATA.registry.cin}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-syne text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 leading-[1.1] tracking-tight">
              We structure the backbone of <span className="text-[#26A7E0]">modern enterprises.</span>
            </h2>
            
            <p className="text-xl text-slate-500 leading-relaxed mb-10">
              Baava Tech Private Limited is an outsourced business support and administrative technology firm. We operate at the intersection of process management and digital infrastructure.
            </p>
            
            <div className="space-y-4 mb-12">
              {points.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#26A7E0]" />
                  </div>
                  <p className="text-lg text-slate-700 font-medium">{point}</p>
                </motion.div>
              ))}
            </div>
            
            <a href="#leadership" className="inline-flex items-center gap-2 text-[#26A7E0] font-bold text-lg hover:text-slate-900 transition-colors group">
              Meet our leadership 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
