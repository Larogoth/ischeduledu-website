
import { secureLogger } from './secureLogging';

export interface UniversalLinkConfig {
  universalLinkDomain: string;
  customScheme: string;
  fallbackUrl?: string;
  timeout?: number;
}

const DEFAULT_CONFIG: UniversalLinkConfig = {
  universalLinkDomain: 'https://ischeduledu.app',
  customScheme: 'ischededu://',
  fallbackUrl: 'https://apps.apple.com/us/app/ischeduledu/id6504114850',
  timeout: 2500
};

export class UniversalLinkHandler {
  private config: UniversalLinkConfig;

  constructor(config: Partial<UniversalLinkConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // Check if the device is iOS
  isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  // Detect if app is installed
  async detectAppInstallation(): Promise<boolean> {
    if (!this.isIOS()) {
      return false;
    }

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        secureLogger.debug('Universal Link: App detection timeout');
        resolve(false);
      }, this.config.timeout);

      const startTime = Date.now();
      let resolved = false;

      const cleanup = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
        }
      };

      // Method 1: Try custom scheme in hidden iframe
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.src = this.config.customScheme + 'detect';
      
      // Method 2: Monitor page visibility
      const handleVisibilityChange = () => {
        if (document.hidden && Date.now() - startTime < this.config.timeout! - 500) {
          secureLogger.debug('Universal Link: App opened (visibility change)');
          cleanup();
          resolve(true);
        }
      };

      const handlePageHide = () => {
        if (Date.now() - startTime < this.config.timeout! - 500) {
          secureLogger.debug('Universal Link: App opened (page hide)');
          cleanup();
          resolve(true);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('pagehide', handlePageHide);
      document.body.appendChild(iframe);

      // Cleanup after timeout
      setTimeout(() => {
        cleanup();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pagehide', handlePageHide);
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, this.config.timeout! + 100);
    });
  }

  // Open app with Universal Link + fallbacks
  async openApp(path: string = '', queryParams: Record<string, string> = {}): Promise<void> {
    if (!this.isIOS()) {
      secureLogger.debug('Universal Link: Not iOS device, opening fallback URL');
      window.open(this.config.fallbackUrl, '_blank');
      return;
    }

    // Construct URLs
    const query = new URLSearchParams(queryParams).toString();
    const universalUrl = `${this.config.universalLinkDomain}${path}${query ? '?' + query : ''}`;
    const customSchemeUrl = `${this.config.customScheme}${path.replace('/', '')}${query ? '?' + query : ''}`;

    secureLogger.debug('Universal Link: Attempting to open app', {
      universalUrl,
      customSchemeUrl
    });

    let appOpened = false;
    const startTime = Date.now();

    // Track if app opens successfully
    const trackAppOpen = () => {
      const checkVisibility = () => {
        if (document.hidden && Date.now() - startTime < 3000) {
          appOpened = true;
          secureLogger.debug('Universal Link: Successfully opened app');
        }
      };

      document.addEventListener('visibilitychange', checkVisibility);
      window.addEventListener('pagehide', checkVisibility);

      setTimeout(() => {
        document.removeEventListener('visibilitychange', checkVisibility);
        window.removeEventListener('pagehide', checkVisibility);
      }, 3000);
    };

    trackAppOpen();

    try {
      // Method 1: Universal Link
      const universalLink = document.createElement('a');
      universalLink.href = universalUrl;
      universalLink.style.display = 'none';
      document.body.appendChild(universalLink);
      universalLink.click();
      document.body.removeChild(universalLink);

      // Method 2: Custom scheme fallback after delay
      setTimeout(() => {
        if (!appOpened) {
          secureLogger.debug('Universal Link: Trying custom scheme fallback');
          const customLink = document.createElement('a');
          customLink.href = customSchemeUrl;
          customLink.style.display = 'none';
          document.body.appendChild(customLink);
          customLink.click();
          document.body.removeChild(customLink);
        }
      }, 1000);

      // Method 3: App Store fallback if nothing worked
      setTimeout(() => {
        if (!appOpened && this.config.fallbackUrl) {
          secureLogger.debug('Universal Link: Opening App Store fallback');
          window.open(this.config.fallbackUrl, '_blank');
        }
      }, 3000);

    } catch (error) {
      secureLogger.error('Universal Link: Error opening app', error);
      if (this.config.fallbackUrl) {
        window.open(this.config.fallbackUrl, '_blank');
      }
    }
  }

  // Handle import schedule specifically
  async handleScheduleImport(scheduleData: string): Promise<void> {
    await this.openApp('/import', { data: scheduleData });
  }

  // Validate AASA file accessibility
  async validateAASA(domain: string = this.config.universalLinkDomain): Promise<boolean> {
    try {
      const aasaUrl = `${domain}/.well-known/apple-app-site-association`;
      const response = await fetch(aasaUrl, { 
        method: 'HEAD',
        mode: 'no-cors' 
      });
      
      secureLogger.debug('Universal Link: AASA validation', {
        domain,
        status: response.status,
        contentType: response.headers.get('content-type')
      });

      return response.ok;
    } catch (error) {
      secureLogger.error('Universal Link: AASA validation failed', { domain, error });
      return false;
    }
  }
}

// Export singleton instance
export const universalLinkHandler = new UniversalLinkHandler();

// Helper functions for easy use
export const openAppWithSchedule = (scheduleData: string) => {
  return universalLinkHandler.handleScheduleImport(scheduleData);
};

export const openApp = (path?: string, params?: Record<string, string>) => {
  return universalLinkHandler.openApp(path, params);
};

export const detectApp = () => {
  return universalLinkHandler.detectAppInstallation();
};
