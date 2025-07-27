import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ImportSchedule from "./pages/ImportSchedule";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import EmergencyScheduling from "./pages/EmergencyScheduling";
import EqualTimePlanning from "./pages/EqualTimePlanning";
import ShareablePlans from "./pages/ShareablePlans";
import { initializeSecurity } from "./utils/securityInit";
import { usePageView } from "./hooks/usePageView";

const queryClient = new QueryClient();

// GitHub Pages SPA routing handler
const GithubPagesRouter = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle GitHub Pages SPA routing on initial load
    const handleGitHubPagesRouting = () => {
      const { pathname, search, hash } = window.location;
      
      console.log('=== GITHUB PAGES ROUTER ===');
      console.log('Initial pathname:', pathname);
      console.log('Initial search:', search);
      console.log('Initial hash:', hash);
      
      // Check if we have the GitHub Pages routing format /?/
      if (search && search.startsWith('?/')) {
        console.log('Detected GitHub Pages SPA routing format');
        
        // Extract the real path from the search params
        const realPath = search.substring(2); // Remove '?/'
        let [path, ...queryParts] = realPath.split('?');
        
        console.log('Extracted path:', path);
        console.log('Extracted query parts:', queryParts);
        
        // Reconstruct the proper URL
        let newUrl = '/' + path;
        if (queryParts.length > 0) {
          newUrl += '?' + queryParts.join('?');
        }
        if (hash) {
          newUrl += hash;
        }
        
        console.log('Constructed new URL:', newUrl);
        
        // Replace the current URL without triggering a page reload
        if (newUrl !== location.pathname + location.search + location.hash) {
          console.log('Replacing URL with proper route');
          window.history.replaceState({}, '', newUrl);
          
          // Trigger a route change
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    };
    
    // Only run on initial load
    if (window.location.search.startsWith('?/')) {
      handleGitHubPagesRouting();
    }
  }, []);
  
  return null;
};

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
      
      // Log the actual data parameter if it exists
      const dataParam = new URLSearchParams(location.search).get('data');
      if (dataParam) {
        console.log('Data parameter length:', dataParam.length);
        console.log('Data parameter preview:', dataParam.substring(0, 50) + '...');
      }
    }
  }, [location]);
  
  return null;
};

const App = () => {
  // Initialize security and theme
  useEffect(() => {
    // Initialize security checks
    initializeSecurity();
    
    // Check for system/stored theme preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  usePageView();

  // Track download button clicks
  useEffect(() => {
    const trackDownloadClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a[href*="apps.apple.com"]')) {
        if (window.gtag) {
          window.gtag('event', 'download_click', {
            app_name: 'iSchedulEDU',
            page_location: window.location.pathname,
            link_text: target.textContent || 'Download Button'
          });
          console.log('Download click tracked');
        }
      }
    };

    document.addEventListener('click', trackDownloadClick);
    return () => document.removeEventListener('click', trackDownloadClick);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-b from-[#0FA0CE] via-[#1a2233] to-[#101624] dark:from-[#0FA0CE] dark:via-[#1a2233] dark:to-[#101624] text-foreground">
          <Toaster />
          <Sonner />
          <GithubPagesRouter />
          <RouteDebugger />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/import" element={<ImportSchedule />} />
            <Route path="/import/:scheduleId" element={<ImportSchedule />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/emergency-scheduling" element={<EmergencyScheduling />} />
            <Route path="/equal-time-planning" element={<EqualTimePlanning />} />
            <Route path="/shareable-plans" element={<ShareablePlans />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
