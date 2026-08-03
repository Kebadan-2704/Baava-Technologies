import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Building, User, Mail, MessageSquare } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

export default function ContactModal({ isOpen, onClose }) {
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
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-alt)' }}>
              <button
                onClick={() => { onClose(); uiSounds.clickClose(); }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </button>
              <h2 className="text-xl font-bold font-display tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                Start Your Transformation
              </h2>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                Connect with our enterprise architecture team.
              </p>
            </div>

            {/* Form */}
            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                    <input type="text" placeholder="John Doe" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all focus:ring-2 ring-brand-500/50" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                    <input type="email" placeholder="john@company.com" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all focus:ring-2 ring-brand-500/50" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                  <input type="text" placeholder="Acme Corp" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all focus:ring-2 ring-brand-500/50" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Primary Interest</label>
                <select className="w-full px-3 py-2 text-sm rounded-lg outline-none transition-all focus:ring-2 ring-brand-500/50 appearance-none cursor-pointer" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                  <option>ERP Integration & Modernization</option>
                  <option>RPA & AI Automation</option>
                  <option>Technical Data Operations</option>
                  <option>BOM Lifecycle Management</option>
                  <option>Supply Chain & Procurement</option>
                </select>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold text-sm bg-brand-600 hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20"
                >
                  <Send className="w-4 h-4" />
                  Request Enterprise Demo
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
