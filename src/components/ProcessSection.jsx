import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Cog, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Inbox,
    title: 'You Send',
    description: 'Share your raw documents, data files, or operational backlog — in any format. We adapt to your workflow, not the other way around.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gradientFrom: 'from-amber-500',
  },
  {
    number: '02',
    icon: Cog,
    title: 'We Process',
    description: 'Our expert team processes, organizes, validates, and structures your data — with 256-bit encryption and multi-layer quality checks.',
    color: 'text-brand-600',
    bgColor: 'bg-brand-50',
    borderColor: 'border-brand-200',
    gradientFrom: 'from-brand-500',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'You Receive',
    description: 'Get clean, organized, audit-ready deliverables. On time, every time. Securely stored and accessible through your Baava Tech Portal.',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
    gradientFrom: 'from-accent-500',
  },
];

function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-1"
    >
      <div className={`relative bg-white rounded-2xl border ${step.borderColor} p-6 md:p-8 shadow-sm h-full`}>
        {/* Step number — large, faded */}
        <div className={`absolute top-4 right-6 text-6xl md:text-7xl font-display font-black ${step.color} opacity-[0.07] select-none`}>
          {step.number}
        </div>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-5`}>
          <step.icon className={`w-6 h-6 ${step.color}`} />
        </div>

        {/* Title */}
        <h3 className="text-heading-sm md:text-heading-md text-slate-900 font-display mb-3">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-body-sm md:text-body-md text-slate-500 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function ConnectorArrow({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
      className="hidden lg:flex items-center justify-center flex-shrink-0 -mx-3"
    >
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
        <ArrowRight className="w-5 h-5 text-slate-400" />
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding relative bg-slate-50/50" aria-labelledby="process-heading">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

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
            How It Works
          </span>
          <h2 id="process-heading" className="font-display text-display-sm md:text-display-md text-brand-950 mt-4 mb-4">
            Simple. Seamless. Secure.
          </h2>
          <p className="text-body-lg text-slate-500 max-w-2xl mx-auto">
            Three steps to transform your chaotic backlog into organized, actionable deliverables.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.number}>
              <StepCard step={step} index={i} />
              {i < STEPS.length - 1 && <ConnectorArrow index={i} />}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-body-md text-slate-400 font-medium">
            That's it. No complex onboarding. No steep learning curves.{' '}
            <span className="text-brand-600 font-semibold">Just results.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
