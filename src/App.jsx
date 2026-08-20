import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroContent from './components/sections/HeroContent';
import PortalInfographic from './components/visuals/PortalInfographic';
import BackgroundEffects from './components/visuals/BackgroundEffects';
import CustomCursor from './components/visuals/CustomCursor';
import CookieConsent from './components/ui/CookieConsent';
import Preloader from './components/ui/Preloader';
import LiveChatWidget from './components/ui/LiveChatWidget';
import ContactModal from './components/ui/ContactModal';
import PortfolioModal from './components/ui/PortfolioModal';

function App() {
  const [activeService, setActiveService] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    document.documentElement.classList.remove('theme-steel', 'dark');
    
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath !== '/') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-surface text-center">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl mb-8 text-text-secondary">Page not found.</p>
        <a href="/" className="px-6 py-3 rounded-full font-semibold text-white shadow-md transition-all hover:shadow-lg" style={{ background: 'var(--color-primary-500)' }}>
          Return Home
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] lg:h-[100dvh] w-full overflow-x-hidden lg:overflow-hidden flex flex-col font-sans transition-colors duration-700 bg-mesh" style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
      {!appReady && <Preloader onComplete={() => setAppReady(true)} />}

      <CustomCursor />
      
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-steel-950 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <BackgroundEffects />
      
      <Header setIsContactOpen={setIsContactOpen} />
      
      <main id="main-content" className="relative z-10 flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto px-0 lg:px-6 py-0 lg:py-6 lg:h-[calc(100vh-80px)] min-h-0 gap-6">
        
        {/* Left Sidebar (35%) - Fixed structure */}
        <div className="w-full lg:w-[38%] h-auto lg:h-full max-h-none flex flex-col gap-4 lg:gap-6 z-20 px-4 sm:px-6 lg:px-0">
          
          {/* Main Hero Content */}
          <div className="flex-1 flex flex-col p-6 lg:p-8 rounded-2xl glass-panel relative overflow-hidden" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
            <HeroContent 
              activeService={activeService} 
              setActiveService={setActiveService} 
              isContactOpen={isContactOpen}
              setIsContactOpen={setIsContactOpen}
              isPortfolioOpen={isPortfolioOpen}
              setIsPortfolioOpen={setIsPortfolioOpen}
            />
          </div>

        </div>

        {/* Right Stage (65%) - Interactive Canvas */}
        <div className="flex-1 h-[500px] lg:h-full relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0 mb-8 lg:mb-0">
          <div className="w-full h-full rounded-2xl glass-panel relative overflow-hidden flex items-center justify-center" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
            <PortalInfographic activeService={activeService} />
          </div>
        </div>
        
      </main>
      
      <CookieConsent />
      <LiveChatWidget />
      
      {/* Global Modals rendered outside filtered containers */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <PortfolioModal isOpen={isPortfolioOpen} onClose={() => setIsPortfolioOpen(false)} />
    </div>
  );
}

export default App;
