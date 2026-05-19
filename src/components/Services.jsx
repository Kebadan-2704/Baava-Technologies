import { motion } from 'framer-motion';
import { Database, Network, Headset, FolderSync, ShieldCheck, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Services = () => {
  const services = [
    {
      icon: <FolderSync className="w-8 h-8 text-[#26A7E0]" />,
      title: "Back-Office Administration",
      desc: "Comprehensive outsourced administrative support. We handle data management, records processing, complex documentation, and workflow automation.",
      colSpan: "md:col-span-2",
      bg: "bg-white",
      text: "text-slate-900",
      descText: "text-slate-500",
      border: "border-slate-200"
    },
    {
      icon: <Network className="w-8 h-8 text-[#1A8FBF]" />,
      title: "B2B Digital Infrastructure",
      desc: "Building and managing the digital backbone of your business—enterprise systems, inter-company portals, and integrated platforms.",
      colSpan: "md:col-span-1",
      bg: "bg-white",
      text: "text-slate-900",
      descText: "text-slate-500",
      border: "border-slate-200"
    },
    {
      icon: <Database className="w-8 h-8 text-brand-300" />,
      title: "Data Management",
      desc: "Structured data entry, cleansing, migration, and analytics support to turn raw information into actionable business intelligence.",
      colSpan: "md:col-span-1",
      bg: "bg-slate-900",
      text: "text-white",
      descText: "text-slate-400",
      border: "border-slate-800"
    },
    {
      icon: <Headset className="w-8 h-8 text-[#26A7E0]" />,
      title: "Technical Support Operations",
      desc: "First and second-level IT support, helpdesk management, and operational troubleshooting for enterprises requiring scalable tech assistance.",
      colSpan: "md:col-span-1",
      bg: "bg-white",
      text: "text-slate-900",
      descText: "text-slate-500",
      border: "border-slate-200"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#1A8FBF]" />,
      title: "Process Compliance",
      desc: "Ensuring procedural adherence and operational compliance across vendor management, procurement, and HR administrative pipelines.",
      colSpan: "md:col-span-1",
      bg: "bg-white",
      text: "text-slate-900",
      descText: "text-slate-500",
      border: "border-slate-200"
    }
  ];

  return (
    <section id="services" className="py-32 relative z-10 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-syne text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
            >
              Operational excellence <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26A7E0] to-[#083F5C]">delivered as a service.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 leading-relaxed"
            >
              We manage the administrative and technical complexities so your enterprise can remain singularly focused on growth and market execution.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <MagneticButton as="a" href="#contact" className="hidden md:flex px-8 py-4 rounded-full bg-slate-50 text-slate-900 font-bold border border-slate-200 shadow-sm hover:border-[#26A7E0] hover:text-[#26A7E0] transition-colors items-center gap-2 group">
              Discuss Implementation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[2rem] p-10 border ${service.border} ${service.bg} shadow-lg shadow-slate-200/20 group hover:-translate-y-1 transition-transform duration-500 flex flex-col h-full ${service.colSpan}`}
            >
              <div className="mb-12">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.bg === 'bg-white' ? 'bg-slate-50 border border-slate-100' : 'bg-slate-800 border border-slate-700'}`}>
                  {service.icon}
                </div>
                <h3 className={`font-syne text-2xl font-bold mb-4 ${service.text}`}>{service.title}</h3>
                <p className={`text-lg leading-relaxed ${service.descText}`}>{service.desc}</p>
              </div>
              
              <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-bold text-brand-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
