import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { CORPORATE_DATA } from '../data/content';
import MagneticButton from './MagneticButton';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulated API Call for Enterprise Backend
    setTimeout(() => {
      setFormState('success');
      // Here you would integrate EmailJS, Supabase, or your custom backend
      // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target, 'PUBLIC_KEY')
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative z-10 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Left Column: Copy & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#26A7E0] animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-slate-800 uppercase">Initiate Engagement</span>
            </div>
            
            <h2 className="font-syne text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1]">
              Ready to scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26A7E0] to-[#083F5C]">operations?</span>
            </h2>
            
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg">
              Connect with our deployment team to discuss how Baava Tech can restructure your back-office and technical pipelines. All inquiries are handled with strict NDA compliance.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#26A7E0]/10 group-hover:border-[#26A7E0]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#26A7E0]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Corporate Email</h4>
                  <a href={`mailto:${CORPORATE_DATA.registry.email}`} className="text-xl font-medium text-slate-900 hover:text-[#26A7E0] transition-colors">
                    {CORPORATE_DATA.registry.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#26A7E0]/10 group-hover:border-[#26A7E0]/20 transition-colors">
                  <MapPin className="w-6 h-6 text-[#26A7E0]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Headquarters</h4>
                  <p className="text-xl font-medium text-slate-900 max-w-xs leading-relaxed">
                    {CORPORATE_DATA.registry.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-4">
               <ShieldCheck className="w-10 h-10 text-brand-500 flex-shrink-0" />
               <div>
                 <h4 className="text-sm font-bold text-slate-900 mb-1">Enterprise Data Compliance</h4>
                 <p className="text-sm text-slate-500 leading-relaxed">All correspondence and data sharing adheres strictly to enterprise-grade security protocols.</p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white rounded-[2rem] p-10 md:p-12 border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_100%_0%,#EBF8FE_0%,transparent_60%)] pointer-events-none"></div>
              
              {formState === 'success' ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                    className="w-24 h-24 rounded-full bg-[#26A7E0]/10 flex items-center justify-center mb-8"
                  >
                    <ShieldCheck className="w-12 h-12 text-[#26A7E0]" />
                  </motion.div>
                  <h3 className="font-syne text-3xl font-bold text-slate-900 mb-4">Request Received</h3>
                  <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
                    Your inquiry has been securely routed to our operations directors. Expect a response within 1 business day.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-[#26A7E0] font-bold hover:text-slate-900 transition-colors flex items-center gap-2"
                  >
                    Submit another inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <Lock className="w-3.5 h-3.5" /> Secure SSL Connection
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-900">First Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#26A7E0] focus:bg-white focus:ring-4 focus:ring-[#26A7E0]/10 transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-900">Last Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Doe" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#26A7E0] focus:bg-white focus:ring-4 focus:ring-[#26A7E0]/10 transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-900">Corporate Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="john@enterprise.com" 
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#26A7E0] focus:bg-white focus:ring-4 focus:ring-[#26A7E0]/10 transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-900">Company / Organization</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Enterprise LLC" 
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#26A7E0] focus:bg-white focus:ring-4 focus:ring-[#26A7E0]/10 transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-900">Engagement Scope</label>
                    <textarea 
                      required 
                      rows="4" 
                      placeholder="Briefly describe your operational bottlenecks..." 
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#26A7E0] focus:bg-white focus:ring-4 focus:ring-[#26A7E0]/10 transition-all text-slate-900 font-medium placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>
                  
                  <MagneticButton 
                    as="button"
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="mt-4 w-full py-5 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-[#26A7E0] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 group shadow-lg shadow-slate-900/10"
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        Submit Inquiry 
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <Send className="w-3.5 h-3.5" />
                        </div>
                      </span>
                    )}
                  </MagneticButton>
                  
                  <p className="text-center text-xs font-medium text-slate-400 mt-2">
                    By submitting, you agree to our strict data privacy and NDA protocols.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
