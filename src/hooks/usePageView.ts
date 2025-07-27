import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
      
      // Also log for debugging
      console.log('GA4 Page View Tracked:', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    } else {
      console.log('GA4 not available or gtag not loaded');
    }
  }, [location]);
} 