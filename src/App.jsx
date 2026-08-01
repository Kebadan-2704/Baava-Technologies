import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroContent from './components/sections/HeroContent';
import PortalInfographic from './components/visuals/PortalInfographic';
import BackgroundEffects from './components/visuals/BackgroundEffects';
import CustomCursor from './components/visuals/CustomCursor';

function App() {
  // Ensure dark mode is permanently disabled
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className={`relative min-h-[100dvh] w-full bg-slate-50 text-slate-900 overflow-x-hidden flex flex-col font-sans transition-colors duration-700 bg-aurora`}>
      {/* Cinematic Film Grain */}
      <svg className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.04] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <CustomCursor />
      
      {/* Skip nav */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-950 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <BackgroundEffects />
      
      <Header />
      
      <main id="main-content" className="relative z-10 flex-1 flex items-center w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-14 py-8 md:py-0">
        <div className="w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <HeroContent />
          <PortalInfographic />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
