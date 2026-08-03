import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Volume2, VolumeX } from 'lucide-react';
import { uiSounds } from '../utils/sounds';

const THEMES = [
  {
    id: 'sand',
    label: 'Sand / Beige',
    preview: 'linear-gradient(135deg, #f5f3f0, #eae7e2)',
    dot: '#ddd8d0',
    vars: {
      '--color-surface': '#faf9f7',
      '--color-surface-alt': '#f5f3f0',
      '--color-surface-warm': '#eae7e2',
      '--color-surface-elevated': '#ffffff',
      '--color-border': '#ddd8d0',
      '--color-border-subtle': '#eae7e2',
      '--color-text-primary': '#22272f',
      '--color-text-secondary': '#515e7b',
      '--color-text-tertiary': '#8593ae',
    },
  },
  {
    id: 'silver',
    label: 'Silver White',
    preview: 'linear-gradient(135deg, #f0f2f5, #e4e7ec)',
    dot: '#d0d5dd',
    vars: {
      '--color-surface': '#f5f6f8',
      '--color-surface-alt': '#eef0f4',
      '--color-surface-warm': '#e4e7ec',
      '--color-surface-elevated': '#ffffff',
      '--color-border': '#d0d5dd',
      '--color-border-subtle': '#e4e7ec',
      '--color-text-primary': '#1a1f2e',
      '--color-text-secondary': '#475569',
      '--color-text-tertiary': '#94a3b8',
    },
  },
  {
    id: 'steel',
    label: 'Steel Blue',
    preview: 'linear-gradient(135deg, #1e2430, #252d3a)',
    dot: '#3a4255',
    vars: {
      '--color-surface': '#1a2030',
      '--color-surface-alt': '#212838',
      '--color-surface-warm': '#2a3244',
      '--color-surface-elevated': '#252d3e',
      '--color-border': '#3a4255',
      '--color-border-subtle': '#2e3648',
      '--color-text-primary': '#e8eaf0',
      '--color-text-secondary': '#94a3b8',
      '--color-text-tertiary': '#64748b',
    },
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState('sand');
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const theme = THEMES.find(t => t.id === activeTheme);
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    if (activeTheme === 'steel') {
      root.classList.add('theme-steel');
    } else {
      root.classList.remove('theme-steel');
    }
  }, [activeTheme]);

  const toggleSound = () => {
    const isNowEnabled = uiSounds.toggle();
    setSoundEnabled(isNowEnabled);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sound Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSound}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
        style={{
          background: soundEnabled ? 'rgba(14, 141, 109, 0.08)' : 'var(--color-surface-alt)',
          border: `1px solid ${soundEnabled ? 'rgba(14, 141, 109, 0.2)' : 'var(--color-border-subtle)'}`,
        }}
        aria-label={soundEnabled ? "Disable UI sounds" : "Enable UI sounds"}
        title={soundEnabled ? "Sound ON" : "Sound OFF"}
      >
        {soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5" style={{ color: '#0e8d6d' }} />
        ) : (
          <VolumeX className="w-3.5 h-3.5" style={{ color: 'var(--color-text-tertiary)' }} />
        )}
      </motion.button>

      {/* Theme Toggle */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            uiSounds.hover();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer"
          style={{
            background: isOpen ? 'rgba(30, 120, 236, 0.08)' : 'var(--color-surface-alt)',
            border: `1px solid ${isOpen ? 'rgba(30, 120, 236, 0.2)' : 'var(--color-border-subtle)'}`,
          }}
          aria-label="Switch color theme"
          aria-expanded={isOpen}
        >
          <Palette className="w-3.5 h-3.5" style={{ color: 'var(--color-text-secondary)' }} />
          <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline" style={{ color: 'var(--color-text-secondary)' }}>
            Theme
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-[198]" onClick={() => setIsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-full mt-2 z-[199] w-[200px] rounded-xl p-2 shadow-xl"
                style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}
              >
                <p className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                  Compare Themes
                </p>
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onMouseEnter={() => uiSounds.hover()}
                    onClick={() => { 
                      setActiveTheme(theme.id); 
                      setIsOpen(false);
                      uiSounds.switchTheme();
                    }}
                    className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all duration-200 text-left group"
                    style={{ background: activeTheme === theme.id ? 'rgba(30, 120, 236, 0.06)' : 'transparent' }}
                  >
                    <div
                      className="w-6 h-6 rounded-md flex-shrink-0 ring-2 transition-all duration-200"
                      style={{
                        background: theme.preview,
                        ringColor: activeTheme === theme.id ? '#1e78ec' : 'transparent',
                        border: `1px solid ${theme.dot}`,
                      }}
                    />
                    <div>
                      <span
                        className="text-[11px] font-semibold block transition-colors"
                        style={{ color: activeTheme === theme.id ? '#1e78ec' : 'var(--color-text-primary)' }}
                      >
                        {theme.label}
                      </span>
                    </div>
                    {activeTheme === theme.id && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
