import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroContent from './components/sections/HeroContent';
import PortalInfographic from './components/visuals/PortalInfographic';
import BackgroundEffects from './components/visuals/BackgroundEffects';
import CustomCursor from './components/visuals/CustomCursor';
import CookieConsent from './components/ui/CookieConsent';
import Preloader from './components/ui/Preloader';
import CommandPalette from './components/ui/CommandPalette';
import LiveIntelligence from './components/sections/LiveIntelligence';
import LiveChatWidget from './components/ui/LiveChatWidget';
import LiveActivityTicker from './components/ui/LiveActivityTicker';

function App() {
  const [activeService, setActiveService] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="relative min-h-[100dvh] lg:h-[100dvh] w-full overflow-x-hidden lg:overflow-hidden flex flex-col font-sans transition-colors duration-700 bg-mesh" style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
      {!appReady && <Preloader onComplete={() => setAppReady(true)} />}
      
      {/* Film Grain */}
      <svg className="pointer-events-none fixed inset-0 z-30 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <CustomCursor />
      
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-steel-950 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <BackgroundEffects />
      
      <Header setIsContactOpen={setIsContactOpen} />
      
      <main id="main-content" className="relative z-10 flex-1 flex items-start lg:items-center justify-center w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 lg:h-[calc(100vh-80px)] min-h-0">
        <div className="w-full h-auto lg:h-full max-h-none lg:max-h-[850px] flex flex-col gap-4 lg:gap-2 pb-8 lg:pb-0">
          <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 auto-rows-auto lg:grid-rows-12 gap-4 min-h-0">
            
            {/* Main Content Cell (Left on Desktop, Top on Mobile) */}
            <div className="col-span-1 lg:col-span-5 lg:row-span-12 flex flex-col justify-between p-6 lg:p-8 rounded-2xl glass-panel relative overflow-hidden" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
              <HeroContent 
                activeService={activeService} 
                setActiveService={setActiveService} 
                isContactOpen={isContactOpen}
                setIsContactOpen={setIsContactOpen}
                isPortfolioOpen={isPortfolioOpen}
                setIsPortfolioOpen={setIsPortfolioOpen}
              />
            </div>

            {/* Interactive Visual Cell (Right on Desktop, Bottom on Mobile) */}
            <div className="col-span-1 lg:col-span-7 lg:row-span-9 rounded-2xl glass-panel relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-0" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
              <PortalInfographic activeService={activeService} />
            </div>

            {/* Live Intelligence Cell (Bottom Right on Desktop) */}
            <div className="col-span-1 lg:col-span-7 lg:row-span-3 rounded-2xl glass-panel relative overflow-hidden min-h-[300px] lg:min-h-0" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
              <LiveIntelligence />
            </div>
          </div>
          
          <LiveActivityTicker />
        </div>
      </main>
      
      <CookieConsent />
      <LiveChatWidget />
      <CommandPalette setIsContactOpen={setIsContactOpen} setIsPortfolioOpen={setIsPortfolioOpen} />
    </div>
  );
}

export default App;
