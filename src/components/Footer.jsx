import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-white">
                <img src="/logo.jpeg" alt="Baava Tech Logo" className="w-full h-full object-contain p-0.5 mix-blend-multiply" />
              </div>
              <div>
                <div className="font-syne font-bold text-lg text-slate-900 leading-tight">Baava<span className="text-brand-500">Tech</span></div>
              </div>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Baava Tech Private Limited is an outsourced business support and administrative technology firm, providing robust B2B operations management from Karur, Tamil Nadu.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Capabilities</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-sm text-slate-500 hover:text-brand-500 transition-colors">Back-Office Administration</a></li>
              <li><a href="#services" className="text-sm text-slate-500 hover:text-brand-500 transition-colors">B2B Digital Infrastructure</a></li>
              <li><a href="#services" className="text-sm text-slate-500 hover:text-brand-500 transition-colors">Data Management</a></li>
              <li><a href="#services" className="text-sm text-slate-500 hover:text-brand-500 transition-colors">Tech Support Ops</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Corporate Info</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-slate-400 block mb-1">CIN</span> <span className="text-sm text-slate-600 font-medium">U82990TN2024PTC166573</span></li>
              <li><span className="text-sm text-slate-400 block mb-1">NIC Code</span> <span className="text-sm text-slate-600 font-medium">82990</span></li>
              <li><span className="text-sm text-slate-400 block mb-1">Established</span> <span className="text-sm text-slate-600 font-medium">Jan 07, 2024</span></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Baava Tech Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-brand-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
