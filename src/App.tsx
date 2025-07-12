
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
    console.log('Full URL:', window.location.href);
  }, [location]);
  
  return null;
};

// Component to handle malformed Universal Link URLs
const URLFixer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const processedURLs = useRef(new Set<string>());
  
  useEffect(() => {
    const pathname = location.pathname;
    const search = location.search;
    const fullURL = pathname + search;
    
    console.log('URLFixer - Processing URL:', fullURL);
    console.log('URLFixer - Pathname:', pathname);
    console.log('URLFixer - Search params:', search);
    
    // Check if this specific URL has already been processed
    if (processedURLs.current.has(fullURL)) {
      console.log('URLFixer - Already processed this exact URL, skipping:', fullURL);
      return;
    }
    
    // Only process malformed URLs where data parameter is in the pathname
    // Normal URLs like /import?data=xyz should be left alone
    if (pathname.includes('data=') && pathname.includes('/import') && !search) {
      console.log('URLFixer - Detected malformed Universal Link in pathname (no search params)');
      console.log('URLFixer - Full pathname:', pathname);
      
      // Extract the data parameter from the pathname
      const dataMatch = pathname.match(/data=([^\/]+)/);
      if (dataMatch) {
        const dataParam = dataMatch[1];
        console.log('URLFixer - Extracted data param:', dataParam);
        
        // Mark this URL as processed
        processedURLs.current.add(fullURL);
        
        // Construct the correct URL
        const correctPath = `/import?data=${dataParam}`;
        console.log('URLFixer - Navigating to corrected path:', correctPath);
        
        // Use immediate navigation with proper error handling
        try {
          navigate(correctPath, { replace: true });
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
    } else if (pathname === '/import' && search.includes('data=')) {
      console.log('URLFixer - Normal Universal Link detected, letting React Router handle it');
      // This is a normal Universal Link, don't interfere
    } else {
      console.log('URLFixer - Normal URL, no fixing needed:', pathname);
    }
  }, [location.pathname, location.search, navigate]);
  
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
