import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, BarChart3, Headphones, TrendingUp } from 'lucide-react';

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: 'Not a Vendor. A Partner.',
    description: 'We integrate with your workflow, understand your business, and treat your operations as our own.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: '256-bit encryption, role-based access controls, and audit trails. Your data is safer with us than on your desktop.',
  },
  {
    icon: Clock,
    title: 'Reliable Turnaround',
    description: 'Consistent delivery timelines with 99.9% uptime. We don\'t miss deadlines because your business can\'t afford it.',
  },
  {
    icon: BarChart3,
    title: 'Scalable Operations',
    description: 'Start with 10 documents or 10,000. Our systems and team scale seamlessly with your business growth.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'A real person who knows your account. Not a chatbot. Not a ticket system. A partner who picks up the phone.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    description: 'We don\'t just maintain — we optimize. Monthly reviews, process suggestions, and proactive quality improvements.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden" aria-labelledby="why-us-heading">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-gradient-to-bl from-brand-50/60 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-gradient-to-tr from-accent-50/40 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="container-width relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-overline text-brand-600 uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100">
            Why Choose Us
          </span>
          <h2 id="why-us-heading" className="font-display text-display-sm md:text-display-md text-brand-950 mt-4 mb-4">
            Why businesses choose Baava Tech
          </h2>
          <p className="text-body-lg text-slate-500 max-w-2xl mx-auto">
            We're not the cheapest option. We're the one you won't regret choosing.
          </p>
        </motion.div>

        {/* Grid of differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-card transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center mb-4 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-brand-600" />
              </div>

              {/* Title */}
              <h3 className="text-heading-sm text-slate-900 font-display mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-body-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-block max-w-3xl mx-auto px-8 py-6 md:px-12 md:py-8 rounded-2xl bg-gradient-to-r from-brand-950 to-brand-900 text-white shadow-xl">
            <p className="text-heading-sm md:text-heading-lg font-display leading-snug">
              "We don't just support your operations.{' '}
              <span className="text-brand-300">We become an extension of your team.</span>"
            </p>
            <p className="mt-3 text-body-sm text-brand-300/80 font-medium">
              — The Baava Tech Promise
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
