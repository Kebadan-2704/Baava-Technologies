import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Building, User, Mail, MessageSquare, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzgkdl'; // Replace with your Formspree form ID

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
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
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', message: '' });
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => { onClose(); uiSounds.clickClose(); }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-alt)' }}>
              <button
                onClick={() => { onClose(); uiSounds.clickClose(); }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                aria-label="Close contact form"
              >
                <X className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </button>
              <h2 id="contact-modal-title" className="text-xl font-bold font-display tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                Book a Strategy Call
              </h2>
              <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                Connect with our enterprise architecture team. We'll respond within 24 hours.
              </p>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <div className="p-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-accent-500 mb-4" />
                </motion.div>
                <h3 className="text-lg font-bold font-display mb-2" style={{ color: 'var(--color-text-primary)' }}>Request Received!</h3>
                <p className="text-[13px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  Our team will review your request and reach out within 24 hours to schedule your strategy call.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { onClose(); uiSounds.clickClose(); }}
                  className="px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors"
                  style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                >
                  Close
                </motion.button>
              </div>
            ) : (
              /* Form */
              <form className="p-6 space-y-4" onSubmit={handleSubmit} noValidate>
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-[12px] text-red-700 font-medium">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Work Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                    <input 
                      id="contact-email"
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com" 
                      className={`w-full pl-9 pr-3 py-2 text-[13px] rounded-lg outline-none transition-all focus:ring-2 ${errors.email ? 'ring-2 ring-red-400' : 'ring-brand-500/50'}`}
                      style={{ background: 'var(--color-surface)', border: `1px solid ${errors.email ? '#f87171' : 'var(--color-border)'}`, color: 'var(--color-text-primary)' }} 
                      required
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                    <textarea 
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your operations challenge..."
                      className="w-full pl-9 pr-3 py-2 text-[13px] rounded-lg outline-none transition-all focus:ring-2 ring-brand-500/50 resize-none"
                      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold text-[13px] bg-brand-600 hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Get Your Custom Operations Assessment
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
