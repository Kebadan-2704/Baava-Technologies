import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EngineeringIcon, BookkeepingIcon, StudentIcon, InventoryIcon } from './ServiceIcons';

const SERVICES = [
  {
    icon: EngineeringIcon,
    title: 'Engineering Documentation',
    description: 'Hardware & electronics engineering documentation, technical drawing management, BOM processing, and compliance-ready records for your engineering teams.',
    color: '#3898f7',
    gradient: 'from-brand-500/10 to-brand-600/5',
    borderHover: 'hover:border-brand-200',
  },
  {
    icon: BookkeepingIcon,
    title: 'Bookkeeping & Invoices',
    description: 'Complete financial record management, multi-currency invoice processing, billing reconciliation, and audit-ready bookkeeping with full traceability.',
    color: '#1aae86',
    gradient: 'from-accent-500/10 to-accent-600/5',
    borderHover: 'hover:border-accent-200',
  },
  {
    icon: StudentIcon,
    title: 'Student Records',
    description: 'Student biodata management, academic documentation, enrollment processing, and institutional record-keeping with data security compliance.',
    color: '#8b5cf6',
    gradient: 'from-violet-500/10 to-violet-600/5',
    borderHover: 'hover:border-violet-200',
  },
  {
    icon: InventoryIcon,
    title: 'Inventory Management',
    description: 'Component tracking, stock-level monitoring, procurement processing, and warehouse documentation for electronics and hardware inventory.',
    color: '#84cc16',
    gradient: 'from-lime-500/10 to-lime-600/5',
    borderHover: 'hover:border-lime-200',
  },
];

function ServiceCard({ service, index }) {
  const IconComponent = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white rounded-2xl border border-slate-100 ${service.borderHover} p-6 md:p-8 shadow-sm hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 cursor-default`}
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
          <IconComponent size={64} className="w-full h-full" />
        </div>

        {/* Title */}
        <h3 className="text-heading-sm md:text-heading-md text-slate-900 mb-3 font-display">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-body-sm md:text-body-md text-slate-500 leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Learn more link */}
        <div className="flex items-center gap-1.5 text-body-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ color: service.color }}
        >
          <span>Learn more</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative" aria-labelledby="services-heading">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-overline text-brand-600 uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100">
            Our Services
          </span>
          <h2 id="services-heading" className="font-display text-display-sm md:text-display-md text-brand-950 mt-4 mb-4">
            What we fulfil for you
          </h2>
          <p className="text-body-lg text-slate-500 max-w-2xl mx-auto">
            Four core areas where we become your operational backbone — handling the work so you can focus on what matters.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
