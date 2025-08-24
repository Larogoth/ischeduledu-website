import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, lazy, Suspense, useState } from "react";
import Index from "./pages/Index";
import ImportSchedule from "./pages/ImportSchedule";

// Lazy load non-critical pages to reduce initial bundle size
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const EmergencyScheduling = lazy(() => import("./pages/EmergencyScheduling"));
const EqualTimePlanning = lazy(() => import("./pages/EqualTimePlanning"));
const ShareablePlans = lazy(() => import("./pages/ShareablePlans"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const EmergencyScheduleGuide = lazy(() => import("./pages/EmergencyScheduleGuide"));
const RotatingScheduleGuide = lazy(() => import("./pages/RotatingScheduleGuide"));
const CustomScheduleGuide = lazy(() => import("./pages/CustomScheduleGuide"));
const CompetitorAnalysis = lazy(() => import("./pages/CompetitorAnalysis"));
const StrategyReview = lazy(() => import("./pages/StrategyReview"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-[#0FA0CE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-foreground/60">Loading...</p>
    </div>
  </div>
);
import { initializeSecurity } from "./utils/securityInit";
import { usePageView } from "./hooks/usePageView";
import { useScrollToTop } from "./hooks/useScrollToTop";
import StickyNavigation from "./components/home/StickyNavigation";

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
  const [isInApp, setIsInApp] = useState(false);

  // Initialize security and theme - optimized to reduce forced reflows
  useEffect(() => {
    // Batch DOM operations to reduce reflows
    const initApp = () => {
      // Initialize security checks
      initializeSecurity();
      
      // Check for system/stored theme preference
      const savedTheme = localStorage.getItem("theme")
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add("dark")
      }
    };

    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(initApp);
  }, [])

  // Detect if viewing within iSchedulEDU app
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isInAppView = userAgent.includes('ischeduledu') || 
                       userAgent.includes('wkwebview') ||
                       window.location.search.includes('inapp=true');
    
    setIsInApp(isInAppView);
  }, []);

  // SEO Meta Tag Handler - Ensure proper canonical URLs
  useEffect(() => {
    const updateCanonicalUrl = () => {
      const currentPath = window.location.pathname;
      const baseUrl = 'https://ischeduledu.app';
      
      // Remove trailing slash for consistency
      const cleanPath = currentPath.endsWith('/') && currentPath !== '/' 
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      const canonicalUrl = baseUrl + cleanPath;
      
      // Update or create canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
      
      // Update og:url meta tag
      let ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (!ogUrlMeta) {
        ogUrlMeta = document.createElement('meta');
        ogUrlMeta.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrlMeta);
      }
      ogUrlMeta.setAttribute('content', canonicalUrl);
    };

    // Update canonical URL on route changes
    updateCanonicalUrl();
    
    // Listen for route changes
    const handleRouteChange = () => {
      setTimeout(updateCanonicalUrl, 100);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  usePageView();
  useScrollToTop();

  // Track download button clicks
  useEffect(() => {
    const trackDownloadClick = (event: MouseEvent) => {
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
    };

    document.addEventListener('click', trackDownloadClick);
    return () => document.removeEventListener('click', trackDownloadClick);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-b from-[#0FA0CE] via-[#1a2233] to-[#101624] dark:from-[#0FA0CE] dark:via-[#1a2233] dark:to-[#101624] text-foreground">
            {/* Only show navigation if not in app */}
            {!isInApp && <StickyNavigation />}
            <Toaster />
            <Sonner />
            <GithubPagesRouter />
            <RouteDebugger />
            <Suspense fallback={<PageLoader />}>
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
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/emergency-schedule-guide" element={<EmergencyScheduleGuide />} />
                <Route path="/rotating-schedule-guide" element={<RotatingScheduleGuide />} />
                <Route path="/custom-schedule-guide" element={<CustomScheduleGuide />} />
                <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                <Route path="/strategy-review" element={<StrategyReview />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
