import { motion } from 'framer-motion';
import { CORPORATE_DATA } from '../data/content';
import NumberCounter from './NumberCounter';

const Stats = () => {
  return (
    <section id="metrics" className="py-24 relative z-10 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_100%_0%,#26A7E0_0%,transparent_50%)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_0%_100%,#1A8FBF_0%,transparent_50%)] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {CORPORATE_DATA.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center md:text-left flex flex-col"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                  <NumberCounter value={stat.value} duration={2} />
                </div>
                <div className="text-sm font-bold text-[#26A7E0] mb-2 uppercase tracking-widest">{stat.label}</div>
                <div className="text-sm text-slate-400 font-medium leading-relaxed">{stat.sub}</div>
                
                {index !== CORPORATE_DATA.stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-px h-16 bg-slate-800"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
