import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Initialize GA conditionally based on consent and env var
export const initAnalytics = () => {
  const consent = localStorage.getItem('baava_cookie_consent');
  const gaId = import.meta.env.VITE_GA4_ID;
  
  if (consent === 'accepted' && gaId && !window.gaLoaded) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag; // attach to window so it can be called elsewhere
    gtag('js', new Date());
    gtag('config', gaId);
    window.gaLoaded = true;
  }
};

// Check on initial load
initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
