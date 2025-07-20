
import { useState, useEffect } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { secureLogger } from '@/utils/secureLogging';

interface SmartAppBannerProps {
  onClose?: () => void;
  className?: string;
}

const SmartAppBanner = ({ onClose, className = '' }: SmartAppBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [appInstalled, setAppInstalled] = useState<boolean | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  // Detect if we're on iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  // Detect if app is installed using custom scheme
  const detectAppInstallation = async (): Promise<boolean> => {
    if (!isIOS()) {
      return false;
    }

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        secureLogger.debug('App detection timeout - app likely not installed');
        resolve(false);
      }, 2500);

      const startTime = Date.now();
      
      // Try to open the app using custom scheme
      const customSchemeUrl = 'ischededu://open';
      
      // Create hidden iframe to test custom scheme
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = customSchemeUrl;
      document.body.appendChild(iframe);

      // If the page doesn't blur/become hidden within timeout, app isn't installed
      const handleVisibilityChange = () => {
        const timeElapsed = Date.now() - startTime;
        if (document.hidden && timeElapsed < 2000) {
          secureLogger.debug('App detection success - page became hidden');
          clearTimeout(timeout);
          resolve(true);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Also check for blur events
      const handleBlur = () => {
        const timeElapsed = Date.now() - startTime;
        if (timeElapsed < 2000) {
          secureLogger.debug('App detection success - window blurred');
          clearTimeout(timeout);
          resolve(true);
        }
      };

      window.addEventListener('blur', handleBlur);

      // Cleanup
      setTimeout(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleBlur);
        document.body.removeChild(iframe);
      }, 3000);
    });
  };

  // Enhanced Universal Link handler
  const handleUniversalLink = (url: string) => {
    secureLogger.debug('Attempting Universal Link', { url });
    
    // Try Universal Link first
    const universalLink = document.createElement('a');
    universalLink.href = url;
    universalLink.click();

    // Fallback to custom scheme after short delay
    setTimeout(() => {
      const customSchemeUrl = url.replace('https://ischeduledu.app', 'ischededu://');
      secureLogger.debug('Fallback to custom scheme', { customSchemeUrl });
      
      const fallbackLink = document.createElement('a');
      fallbackLink.href = customSchemeUrl;
      fallbackLink.click();
    }, 1000);
  };

  // Check if current page has import data
  const hasImportData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('data') || window.location.pathname.includes('/import');
  };

  useEffect(() => {
    const checkAppInstallation = async () => {
      if (!isIOS()) {
        setIsVisible(false);
        setIsDetecting(false);
        return;
      }

      secureLogger.debug('Starting app detection for iOS device');
      
      try {
        const installed = await detectAppInstallation();
        setAppInstalled(installed);
        
        // Show banner if app is not installed or if we have import data
        setIsVisible(!installed || hasImportData());
        
        secureLogger.debug('App detection completed', { 
          installed, 
          hasImportData: hasImportData(),
          willShowBanner: !installed || hasImportData()
        });
      } catch (error) {
        secureLogger.error('Error during app detection', error);
        setAppInstalled(false);
        setIsVisible(true);
      } finally {
        setIsDetecting(false);
      }
    };

    // Delay detection slightly to ensure page is fully loaded
    const timer = setTimeout(checkAppInstallation, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleOpenInApp = () => {
    if (hasImportData()) {
      const currentUrl = window.location.href;
      const appUrl = currentUrl.replace(window.location.origin, 'https://ischeduledu.app');
      handleUniversalLink(appUrl);
    } else {
      handleUniversalLink('https://ischeduledu.app/');
    }
  };

  if (!isVisible || isDetecting) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-[#0FA0CE] text-white shadow-lg ${className}`}>
      <div className="flex items-center justify-between p-3 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-white rounded-lg p-1 flex-shrink-0">
            <img 
              src="/lovable-uploads/ischededu-app-logo-teacher-scheduling-software.png" 
              alt="iSchedulEDU"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">iSchedulEDU</div>
            <div className="text-xs opacity-90 truncate">
              {appInstalled ? 'Open in app for better experience' : 'Get the free iOS app'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {appInstalled ? (
            <button
              onClick={handleOpenInApp}
              className="bg-white text-[#0FA0CE] px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Open
            </button>
          ) : (
            <a
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0FA0CE] px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-gray-100 transition-colors"
            >
              <Download className="w-3 h-3" />
              Get
            </a>
          )}
          
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartAppBanner;
