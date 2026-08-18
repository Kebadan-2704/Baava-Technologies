import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Building, User, Mail, MessageSquare, Phone, CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzgkdl'; // Replace with your Formspree form ID

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    service: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        uiSounds.clickClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.company.trim()) newErrors.company = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', service: '', email: '', phone: '', message: '' });
        uiSounds.clickOpen();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            onClick={() => { onClose(); uiSounds.clickClose(); }}
            className="absolute inset-0 bg-steel-950/40"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[24px] shadow-2xl flex flex-col max-h-[90vh]"
            style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            {/* Header */}
            <div className="relative p-6 md:p-8 pb-6 border-b flex-shrink-0 overflow-hidden" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <button
                onClick={() => { onClose(); uiSounds.clickClose(); }}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors z-20"
                aria-label="Close contact form"
              >
                <X className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
              </button>
              
              <div className="relative z-10 flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 border border-brand-500/20">
                  <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">Secure Intake Protocol</span>
              </div>
              
              <h2 id="contact-modal-title" className="relative z-10 text-2xl md:text-3xl font-bold font-display tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Initiate Architecture Review
              </h2>
              <p className="relative z-10 text-[13px] md:text-sm max-w-md leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Connect directly with our engineering team. We analyze your operational parameters and respond within our 24-hour SLA.
              </p>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <div className="p-10 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h3 className="text-xl font-bold font-display mb-3" style={{ color: 'var(--color-text-primary)' }}>Transmission Successful</h3>
                <p className="text-[14px] mb-8 max-w-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Your parameters have been logged. An architect will review your data and initiate contact shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onClose(); uiSounds.clickClose(); }}
                  className="px-8 py-3 rounded-xl text-[13px] font-bold transition-colors shadow-sm"
                  style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                >
                  Close Session
                </motion.button>
              </div>
            ) : (
              /* Form */
              <form className="p-6 md:p-8 space-y-5 overflow-y-auto scrollbar-hide flex-1" onSubmit={handleSubmit} noValidate>
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-[13px] text-red-700 font-medium">Connection failed. Please verify your network or email us directly at info@baavatech.com.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group space-y-2">
                    <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-widest transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }}>Primary Contact *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }} />
                      <input 
                        id="contact-name"
                        name="name"
                        type="text" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Connor" 
                        className={`w-full pl-10 pr-4 py-2.5 text-[14px] font-medium rounded-xl outline-none transition-all focus:ring-2 focus:ring-offset-1 ${errors.name ? 'ring-2 ring-red-400' : 'ring-brand-500/40 focus:ring-brand-500/80'}`}
                        style={{ background: 'var(--color-surface-alt)', border: `1px solid ${errors.name ? '#f87171' : 'var(--color-border-subtle)'}`, color: 'var(--color-text-primary)' }} 
                        required
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label htmlFor="contact-company" className="text-[10px] font-bold uppercase tracking-widest transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }}>Organization *</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3 w-4 h-4 transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }} />
                      <input 
                        id="contact-company"
                        name="company"
                        type="text" 
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Cyberdyne Systems" 
                        className={`w-full pl-10 pr-4 py-2.5 text-[14px] font-medium rounded-xl outline-none transition-all focus:ring-2 focus:ring-offset-1 ${errors.company ? 'ring-2 ring-red-400' : 'ring-brand-500/40 focus:ring-brand-500/80'}`}
                        style={{ background: 'var(--color-surface-alt)', border: `1px solid ${errors.company ? '#f87171' : 'var(--color-border-subtle)'}`, color: 'var(--color-text-primary)' }} 
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group space-y-2">
                    <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-widest transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }}>Work Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }} />
                      <input 
                        id="contact-email"
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@cyberdyne.com" 
                        className={`w-full pl-10 pr-4 py-2.5 text-[14px] font-medium rounded-xl outline-none transition-all focus:ring-2 focus:ring-offset-1 ${errors.email ? 'ring-2 ring-red-400' : 'ring-brand-500/40 focus:ring-brand-500/80'}`}
                        style={{ background: 'var(--color-surface-alt)', border: `1px solid ${errors.email ? '#f87171' : 'var(--color-border-subtle)'}`, color: 'var(--color-text-primary)' }} 
                        required
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-widest transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }}>Direct Line (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }} />
                      <input 
                        id="contact-phone"
                        name="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000" 
                        className="w-full pl-10 pr-4 py-2.5 text-[14px] font-medium rounded-xl outline-none transition-all focus:ring-2 focus:ring-offset-1 ring-brand-500/40 focus:ring-brand-500/80"
                        style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-primary)' }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="group space-y-2">
                  <label htmlFor="contact-service" className="text-[10px] font-bold uppercase tracking-widest transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }}>Target Operation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3 w-4 h-4 transition-colors group-focus-within:text-brand-600 z-10" style={{ color: 'var(--color-text-tertiary)' }} />
                    <select 
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2.5 text-[14px] font-medium rounded-xl outline-none transition-all focus:ring-2 focus:ring-offset-1 ring-brand-500/40 focus:ring-brand-500/80 appearance-none relative z-0"
                      style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-primary)' }}
                    >
                      <option value="">General Architecture Inquiry</option>
                      <option value="ERP Integration">ERP Integration & Sync</option>
                      <option value="Automation (RPA & AI)">RPA & Workflow Automation</option>
                      <option value="Technical Data Entry">High-Fidelity Data Entry</option>
                      <option value="Baseline Customer Technical Support">L1/L2 Technical Support</option>
                      <option value="Supply Chain & Procurement">Supply Chain Optimization</option>
                      <option value="Document Management">Enterprise Document Management</option>
                      <option value="BOM Lifecycle Management">BOM Lifecycle Tracking</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-tertiary)' }}/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group space-y-2">
                  <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }}>Operational Parameters</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 transition-colors group-focus-within:text-brand-600" style={{ color: 'var(--color-text-tertiary)' }} />
                    <textarea 
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Detail your current bottlenecks, target outcomes, or existing systems..."
                      className="w-full pl-10 pr-4 py-3 text-[14px] font-medium rounded-xl outline-none transition-all focus:ring-2 focus:ring-offset-1 ring-brand-500/40 focus:ring-brand-500/80 resize-none"
                      style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-primary)' }}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-[14px] transition-all overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'var(--color-primary-600)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine-sweep" />
                    {status === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Data...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Transmit Request
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
