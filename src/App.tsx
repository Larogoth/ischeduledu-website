
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
  }, [location]);
  
  return null;
};

// Component to handle malformed Universal Link URLs
const URLFixer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  
  useEffect(() => {
    const pathname = location.pathname;
    
    // Prevent multiple processing of the same URL
    if (hasProcessed.current) {
      console.log('URLFixer - Already processed this URL, skipping');
      return;
    }
    
    // Check if this is a malformed Universal Link URL
    if (pathname.includes('data=') && pathname.includes('/import')) {
      console.log('URLFixer - Detected malformed Universal Link in React Router');
      console.log('URLFixer - Full pathname:', pathname);
      
      // Extract the data parameter from the pathname
      const dataMatch = pathname.match(/data=([^\/]+)/);
      if (dataMatch) {
        const dataParam = dataMatch[1];
        console.log('URLFixer - Extracted data param:', dataParam);
        
        // Mark as processed to prevent loops
        hasProcessed.current = true;
        
        // Construct the correct URL and navigate with a small delay
        const correctPath = `/import?data=${dataParam}`;
        console.log('URLFixer - Navigating to:', correctPath);
        
        // Use a small timeout to ensure React Router is ready
        setTimeout(() => {
          console.log('URLFixer - Executing navigation now');
          try {
            navigate(correctPath, { replace: true });
            console.log('URLFixer - Navigation completed successfully');
          } catch (error) {
            console.error('URLFixer - Navigation failed:', error);
            // Fallback: try window.location
            window.location.replace(correctPath);
          }
        }, 50);
      }
    }
  }, [location.pathname, navigate]);
  
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
