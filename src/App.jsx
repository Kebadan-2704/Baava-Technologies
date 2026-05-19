import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Stats = lazy(() => import('./components/Stats'));
const Team = lazy(() => import('./components/Team'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          lenis.scrollTo(target, { offset: -80 });
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const Loader = () => (
    <div className="flex items-center justify-center py-32 min-h-screen bg-white">
      <div className="w-8 h-8 rounded-full border-2 border-brand-200 border-t-brand-500 animate-spin"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Hero />
          <About />
          <Services />
          <Stats />
          <Team />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
