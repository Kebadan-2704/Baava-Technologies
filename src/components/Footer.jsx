import React from 'react';
import { Globe } from 'lucide-react';

const FOOTER_LINKS = [
  {
    heading: 'Services',
    links: [
      { label: 'Engineering Docs', href: '#services' },
      { label: 'Bookkeeping', href: '#services' },
      { label: 'Student Records', href: '#services' },
      { label: 'Inventory', href: '#services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'How It Works', href: '#process' },
      { label: 'Why Choose Us', href: '#why-us' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative bg-white border-t border-slate-100" role="contentinfo">
      <div className="container-width py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block"
              aria-label="Baava Tech — Back to top"
            >
              <img
                src="/logo.png"
                alt="Baava Tech Logo"
                className="h-9 w-auto object-contain"
                width="144"
                height="36"
              />
            </a>
            <p className="mt-4 text-body-sm text-slate-500 max-w-xs leading-relaxed">
              Your dedicated fulfilment partner for enterprise back-office operations. Seamless support across borders.
            </p>
            <div className="flex items-center gap-2 mt-4 text-body-sm text-slate-400">
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span>Karur, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading} className="md:col-span-3 lg:col-span-2">
              <h3 className="text-overline text-slate-900 uppercase tracking-wider mb-4">
                {group.heading}
              </h3>
              <ul className="space-y-3" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-body-sm text-slate-500 hover:text-brand-600 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-overline text-slate-900 uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <a
              href="mailto:Info@baavatech.com"
              className="text-body-sm text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              Info@baavatech.com
            </a>
            <p className="mt-3 text-body-sm text-slate-400">
              LM/315, TNHB, Gandhigramam,
              <br />
              Thanthoni, Karur 639004
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-slate-400">
            &copy; {new Date().getFullYear()} Baava Tech Private Limited. All rights reserved.
          </p>
          <p className="text-caption text-slate-400">
            Enterprise Secure Workflows • CIN Registered
          </p>
        </div>
      </div>
    </footer>
  );
}
