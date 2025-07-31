import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useCallback, useMemo } from "react";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ImportSchedule from "./pages/ImportSchedule";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import EmergencyScheduling from "./pages/EmergencyScheduling";
import EqualTimePlanning from "./pages/EqualTimePlanning";
import ShareablePlans from "./pages/ShareablePlans";
import About from "./pages/About";
import Features from "./pages/Features";
import EmergencyScheduleGuide from "./pages/EmergencyScheduleGuide";
import RotatingScheduleGuide from "./pages/RotatingScheduleGuide";
import CustomScheduleGuide from "./pages/CustomScheduleGuide";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import StrategyReview from "./pages/StrategyReview";
import { initializeSecurity } from "./utils/securityInit";
import { usePageView } from "./hooks/usePageView";
import { useScrollToTop } from "./hooks/useScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// GitHub Pages SPA routing handler
const GithubPagesRouter = () => {
  const location = useLocation();
  
  const handleGitHubPagesRouting = useCallback(() => {
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
  }, [location]);
  
  useEffect(() => {
    // Only run on initial load
    if (window.location.search.startsWith('?/')) {
      handleGitHubPagesRouting();
    }
  }, [handleGitHubPagesRouting]);
  
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
      console.log('Import route data:', location.search);
    }
  }, [location]);
  
  return null;
};

// Optimized App component with performance improvements
const App = () => {
  usePageView();
  useScrollToTop();

  // Memoize the routes to prevent unnecessary re-renders
  const routes = useMemo(() => [
    { path: "/", element: <Index /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/import", element: <ImportSchedule /> },
    { path: "/import/:scheduleId", element: <ImportSchedule /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:postId", element: <BlogPost /> },
    { path: "/emergency-scheduling", element: <EmergencyScheduling /> },
    { path: "/equal-time-planning", element: <EqualTimePlanning /> },
    { path: "/shareable-plans", element: <ShareablePlans /> },
    { path: "/about", element: <About /> },
    { path: "/features", element: <Features /> },
    { path: "/emergency-schedule-guide", element: <EmergencyScheduleGuide /> },
    { path: "/rotating-schedule-guide", element: <RotatingScheduleGuide /> },
    { path: "/custom-schedule-guide", element: <CustomScheduleGuide /> },
    { path: "/competitor-analysis", element: <CompetitorAnalysis /> },
    { path: "/strategy-review", element: <StrategyReview /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ], []);

  // Optimize click tracking to reduce forced reflows
  const handleDownloadClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('a[href*="apps.apple.com"]')) {
      if (window.gtag) {
        window.gtag('event', 'download_click', {
          app_name: 'iSchedulEDU',
          page_location: window.location.pathname,
          link_text: target.textContent || 'Download Button',
          app_store_url: 'https://apps.apple.com/us/app/ischeduledu/id6504114850'
        });
        console.log('Download click tracked');
      }
    }
  }, []);

  useEffect(() => {
    // Initialize security features
    initializeSecurity();
    
    // Add optimized event listeners
    document.addEventListener('click', handleDownloadClick);
    
    return () => {
      document.removeEventListener('click', handleDownloadClick);
    };
  }, [handleDownloadClick]);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className="min-h-screen bg-background text-foreground">
          <GithubPagesRouter />
          <RouteDebugger />
          <TooltipProvider>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </div>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
