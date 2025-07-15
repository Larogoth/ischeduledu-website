// Security initialization for GitHub Pages
import { secureLogger } from './secureLogging';
import { rateLimiter } from './security';

export const initializeSecurity = () => {
  // Basic domain validation
  const allowedDomains = [
    'ischeduledu.app',
    'localhost',
    '127.0.0.1',
    'lovableproject.com'
  ];
  
  const currentDomain = window.location.hostname;
  const isDomainValid = allowedDomains.some(domain => 
    currentDomain === domain || currentDomain.endsWith('.' + domain)
  );
  
  if (!isDomainValid) {
    secureLogger.warn('Potential domain spoofing detected', { domain: currentDomain });
  }
  
  // Check for suspicious referrers
  const referrer = document.referrer;
  if (referrer) {
    const suspiciousPatterns = [
      /malware/i,
      /phishing/i,
      /suspicious/i,
      /\.tk$/,
      /\.ml$/,
      /\.ga$/,
      /\.cf$/
    ];
    
    const isSuspiciousReferrer = suspiciousPatterns.some(pattern => pattern.test(referrer));
    if (isSuspiciousReferrer) {
      secureLogger.warn('Suspicious referrer detected', { referrer });
    }
  }
  
  // Verify HTTPS
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    secureLogger.warn('Non-HTTPS connection detected');
  }
  
  // Initialize rate limiting key
  const userKey = rateLimiter.getUserKey();
  secureLogger.debug('Security initialized', { 
    domain: currentDomain, 
    https: window.location.protocol === 'https:',
    userKey: userKey.slice(0, 8) + '...' // Only log first 8 chars
  });
  
  // Disable right-click and developer tools in production
  if (window.location.hostname === 'ischeduledu.app') {
    // Disable context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    
    // Disable common developer tool shortcuts
    document.addEventListener('keydown', (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    });
  }
  
  // Check for obvious automation/bot indicators
  const checkForAutomation = () => {
    // Check for common automation indicators
    const automationIndicators = [
      'webdriver' in window,
      'callPhantom' in window,
      'phantom' in window,
      '_phantom' in window,
      navigator.webdriver === true
    ];
    
    if (automationIndicators.some(indicator => indicator)) {
      secureLogger.warn('Potential automation detected');
    }
  };
  
  // Run automation check after a delay
  setTimeout(checkForAutomation, 1000);
  
  return {
    isDomainValid,
    userKey,
    isHttps: window.location.protocol === 'https:'
  };
}; 