
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ImportSchedule from "./pages/ImportSchedule";

const queryClient = new QueryClient();

// Debug component to log route changes
const RouteDebugger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('=== ROUTE DEBUG ===');
    console.log('Current pathname:', location.pathname);
    console.log('Current search:', location.search);
    console.log('Current hash:', location.hash);
    console.log('Full location object:', location);
    
    // Additional debugging for import routes
    if (location.pathname.includes('import') || location.search.includes('data')) {
      console.log('=== IMPORT ROUTE DETECTED ===');
      console.log('Pathname includes import?', location.pathname.includes('import'));
      console.log('Search includes data?', location.search.includes('data'));
      console.log('Search params:', new URLSearchParams(location.search).get('data') ? 'DATA FOUND' : 'NO DATA');
    }
  }, [location]);
  
  return null;
};

// Component to handle malformed Universal Link URLs
const URLFixer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const processedURLs = useRef(new Set<string>());
  const navigationAttempts = useRef(0);
  
  useEffect(() => {
    const pathname = location.pathname;
    const fullURL = pathname + location.search;
    
    console.log('=== URLFixer EFFECT ===');
    console.log('Current pathname:', pathname);
    console.log('Current search:', location.search);
    console.log('Navigation attempts so far:', navigationAttempts.current);
    
    // Check if this specific URL has already been processed
    if (processedURLs.current.has(fullURL)) {
      console.log('URLFixer - Already processed this exact URL, skipping:', fullURL);
      return;
    }
    
    // Prevent infinite navigation loops
    if (navigationAttempts.current > 3) {
      console.error('URLFixer - Too many navigation attempts, stopping to prevent infinite loop');
      return;
    }
    
    // Check if this is a malformed Universal Link URL
    if (pathname.includes('data=') && pathname.includes('/import')) {
      console.log('URLFixer - Detected malformed Universal Link in React Router');
      console.log('URLFixer - Full pathname:', pathname);
      console.log('URLFixer - Processing URL:', fullURL);
      
      // Extract the data parameter from the pathname
      const dataMatch = pathname.match(/data=([^\/]+)/);
      if (dataMatch) {
        const dataParam = dataMatch[1];
        console.log('URLFixer - Extracted data param:', dataParam);
        console.log('URLFixer - Data param length:', dataParam.length);
        
        // Mark this URL as processed
        processedURLs.current.add(fullURL);
        navigationAttempts.current += 1;
        
        // Construct the correct URL
        const correctPath = `/import?data=${dataParam}`;
        console.log('URLFixer - Navigating to:', correctPath);
        console.log('URLFixer - Target URL length:', correctPath.length);
        
        // Use immediate navigation with proper error handling
        try {
          console.log('URLFixer - Executing navigation now');
          
          // Try different navigation methods
          console.log('URLFixer - Using navigate with replace=true');
          navigate(correctPath, { replace: true });
          
          // Set a timeout to check if navigation succeeded
          setTimeout(() => {
            console.log('URLFixer - Post-navigation check');
            console.log('URLFixer - Current location after navigation:', window.location.pathname, window.location.search);
            
            if (window.location.pathname === '/' && !window.location.search) {
              console.error('URLFixer - Navigation failed, trying window.location method');
              // Try direct window.location as fallback
              const fullTargetUrl = window.location.origin + correctPath;
              console.log('URLFixer - Using window.location.href:', fullTargetUrl);
              window.location.href = fullTargetUrl;
            } else {
              console.log('URLFixer - Navigation appears successful');
            }
          }, 100);
          
          console.log('URLFixer - Navigation completed successfully');
        } catch (error) {
          console.error('URLFixer - Navigation failed:', error);
          // Fallback: try window.location
          console.log('URLFixer - Attempting window.location fallback');
          window.location.replace(correctPath);
        }
      } else {
        console.error('URLFixer - Could not extract data parameter from:', pathname);
      }
    } else {
      console.log('URLFixer - Normal URL, no fixing needed:', pathname);
    }
  }, [location.pathname, location.search, navigate]);
  
  return null;
};

// Add a component to debug route matching
const RouteMatchDebugger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('=== ROUTE MATCH DEBUG ===');
    
    // Check which route should match
    const pathname = location.pathname;
    const search = location.search;
    
    if (pathname === '/') {
      console.log('Route Match: Index page');
    } else if (pathname === '/faq') {
      console.log('Route Match: FAQ page');
    } else if (pathname === '/privacy-policy') {
      console.log('Route Match: Privacy Policy page');
    } else if (pathname === '/import') {
      console.log('Route Match: Import Schedule page');
      console.log('Search params available:', search ? 'YES' : 'NO');
    } else if (pathname.startsWith('/import/')) {
      console.log('Route Match: Import Schedule with ID');
    } else {
      console.log('Route Match: Should redirect to home (catch-all)');
      console.log('Unmatched pathname:', pathname);
    }
  }, [location]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteDebugger />
        <URLFixer />
        <RouteMatchDebugger />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/import" element={<ImportSchedule />} />
          <Route path="/import/:scheduleId" element={<ImportSchedule />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
