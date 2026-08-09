import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Settings, Activity, FileText, ChevronRight, Moon, Sun } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

const ACTIONS = [
  { id: 'contact', title: 'Book a Strategy Call', icon: Phone, shortcut: 'C' },
  { id: 'theme', title: 'Toggle Theme (Sand / Steel)', icon: Moon, shortcut: 'T' },
  { id: 'portfolio', title: 'View Case Studies', icon: Activity, shortcut: 'P' },
  { id: 'docs', title: 'Company Overview PDF', icon: FileText, shortcut: 'D' },
];

export default function CommandPalette({ setIsContactOpen, setIsPortfolioOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) uiSounds.clickOpen();
          return !prev;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        uiSounds.clickClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredActions = ACTIONS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const executeAction = (actionId) => {
    uiSounds.clickClose();
    setIsOpen(false);
    
    switch (actionId) {
      case 'contact':
        setIsContactOpen(true);
        break;
      case 'portfolio':
        setIsPortfolioOpen(true);
        break;
      case 'theme':
        const current = localStorage.getItem('baava_theme') || 'sand';
        const next = current === 'sand' ? 'steel' : 'sand';
        localStorage.setItem('baava_theme', next);
        if (next === 'steel') document.documentElement.classList.add('theme-steel');
        else document.documentElement.classList.remove('theme-steel');
        // Force re-render of components relying on theme... a simple page reload is fine here or dispatching an event
        window.dispatchEvent(new Event('storage')); // Simple way to notify ThemeSwitcher if it listened, but we'll just reload for simplicity
        window.location.reload();
        break;
      case 'docs':
        alert("Generating Company Overview PDF...");
        break;
      default:
        break;
    }
  };

  const handleKeyDownList = (e) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      uiSounds.hover();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      uiSounds.hover();
    }
    if (e.key === 'Enter' && filteredActions.length > 0) {
      e.preventDefault();
      executeAction(filteredActions[selectedIndex].id);
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      window.addEventListener('keydown', handleKeyDownList);
      return () => window.removeEventListener('keydown', handleKeyDownList);
    }
  }, [isOpen, selectedIndex, filteredActions]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Palette */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden glass-panel"
            style={{ 
              background: 'var(--color-surface-elevated)', 
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <Search className="w-5 h-5 mr-3" style={{ color: 'var(--color-text-tertiary)' }} />
              <input 
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search commands... (e.g. 'theme')"
                className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-gray-400"
                style={{ color: 'var(--color-text-primary)' }}
              />
              <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md" style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-tertiary)' }}>
                ESC
              </div>
            </div>
            
            {/* Action List */}
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  No results found for "{search}"
                </div>
              ) : (
                filteredActions.map((action, i) => {
                  const Icon = action.icon;
                  const isSelected = i === selectedIndex;
                  return (
                    <div 
                      key={action.id}
                      onClick={() => executeAction(action.id)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors"
                      style={{ 
                        background: isSelected ? 'rgba(30, 120, 236, 0.08)' : 'transparent',
                        color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color: isSelected ? 'var(--color-primary-600)' : 'var(--color-text-tertiary)' }} />
                        <span className="text-[13px] font-medium">{action.title}</span>
                      </div>
                      {isSelected && <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
