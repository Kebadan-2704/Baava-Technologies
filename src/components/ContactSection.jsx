import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight, Check, Copy } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('Info@baavatech.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600/30 to-transparent" />

      {/* Glow accents */}
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[60%] bg-brand-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[50%] bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-width relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-overline text-brand-300 uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              Get Started
            </span>
            <h2 id="contact-heading" className="font-display text-display-sm md:text-display-md text-white mt-4 mb-4">
              Ready to offload your back-office?
            </h2>
            <p className="text-body-lg text-brand-200/80 max-w-xl mx-auto mb-10">
              Drop us a line. We'll get back to you within 24 hours to discuss how we can become your fulfilment partner.
            </p>
          </motion.div>

          {/* Email CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex flex-col items-center gap-4"
          >
            {/* Main email button */}
            <a
              href="mailto:Info@baavatech.com"
              className="group relative inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-10 md:py-5 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-brand-600" />
              </div>
              <div className="text-left">
                <div className="text-heading-sm md:text-heading-md text-brand-950 font-display">
                  Info@baavatech.com
                </div>
                <div className="text-body-sm text-slate-400 mt-0.5">
                  Click to send us an email
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-2" />
            </a>

            {/* Copy button */}
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-300 ${
                copied
                  ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                  : 'bg-white/5 text-brand-200/80 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied to clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy email address
                </>
              )}
            </button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-2 text-brand-300/60"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-body-sm font-medium">Karur, Tamil Nadu, India • Operations Center</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
