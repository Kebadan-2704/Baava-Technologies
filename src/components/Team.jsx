import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { CORPORATE_DATA } from '../data/content';

const Team = () => {
  return (
    <section id="leadership" className="py-32 relative z-10 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-syne text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
            >
              Executive <span className="text-[#26A7E0]">Leadership.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 leading-relaxed"
            >
              Our founding directors bring decades of combined experience in operational scaling, back-office optimization, and strategic enterprise compliance.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORPORATE_DATA.leadership.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
            >
              {/* Decorative hover gradient */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-full blur-3xl -mr-20 -mt-20`}></div>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-8 relative z-10">
                <div className={`w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl font-syne font-bold text-white bg-gradient-to-br ${member.gradient} shadow-lg shadow-brand-500/20`}>
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-syne text-3xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[#26A7E0] text-sm font-bold tracking-wide uppercase">
                    {member.role}
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-slate-500 leading-relaxed mb-10 relative z-10">
                {member.desc}
              </p>
              
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between relative z-10">
                <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-[#26A7E0] transition-colors font-medium">
                  <Mail className="w-5 h-5" />
                  <span>Contact Director</span>
                </a>
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#26A7E0] group-hover:text-white group-hover:border-[#26A7E0] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
