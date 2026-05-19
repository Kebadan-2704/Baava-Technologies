import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ScrambleText from './ScrambleText';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Metrics', href: '#metrics' },
    { name: 'Leadership', href: '#leadership' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 z-50 relative group">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.jpeg" alt="Baava Tech Logo" className="w-full h-full object-contain p-1 mix-blend-multiply" />
          </div>
          <div>
            <div className="font-syne font-bold text-xl tracking-tight text-slate-900 leading-tight">
              <ScrambleText text="BaavaTech" duration={800} />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-brand-500 font-bold leading-none mt-0.5">Corporate Services</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-500 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
          <MagneticButton as="a" href="#contact" className="ml-4 px-6 py-2.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-bold hover:bg-brand-500 hover:text-white transition-all duration-300 flex items-center gap-2 group">
            Partner With Us
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 relative text-slate-900 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-syne text-3xl font-bold text-slate-800 hover:text-brand-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="mt-8 px-8 py-4 rounded-full bg-brand-500 text-white font-medium text-lg flex items-center gap-2 shadow-lg shadow-brand-500/30"
              >
                Get in Touch
                <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
