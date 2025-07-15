
// Input validation and sanitization utilities
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>"\'/\\]/g, '') // Remove HTML tags and injection characters
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/data:/gi, '') // Remove data: protocols (except for our base64 data)
    .trim()
    .slice(0, 1000); // Limit input length
};

export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string' || email.length > 254) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate base64 encoded data
export const validateBase64 = (input: string): boolean => {
  if (typeof input !== 'string') {
    return false;
  }
  
  // Check length limits (prevent DoS)
  if (input.length > 100000) { // ~75KB of data max
    return false;
  }
  
  // Basic base64 pattern check
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(input);
};

// Validate URL parameters
export const validateUrlParameter = (param: string, maxLength: number = 1000): boolean => {
  if (typeof param !== 'string') {
    return false;
  }
  
  if (param.length > maxLength) {
    return false;
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /eval\(/i,
    /document\./i,
    /window\./i
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(param));
};

// Sanitize error messages to prevent information disclosure
export const sanitizeErrorMessage = (error: any): string => {
  if (!error) {
    return 'An unexpected error occurred.';
  }
  
  if (typeof error === 'string') {
    // Remove sensitive information from error messages
    return error
      .replace(/data=[^&\s]+/g, 'data=[REDACTED]')
      .replace(/token=[^&\s]+/g, 'token=[REDACTED]')
      .replace(/key=[^&\s]+/g, 'key=[REDACTED]')
      .slice(0, 200); // Limit error message length
  }
  
  if (error instanceof Error) {
    return sanitizeErrorMessage(error.message);
  }
  
  return 'An unexpected error occurred.';
};

// Enhanced rate limiting helper (client-side implementation)
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private blockedIPs: Map<string, number> = new Map();
  private maxRequests: number;
  private windowMs: number;
  private blockDuration: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000, blockDuration: number = 300000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.blockDuration = blockDuration; // 5 minutes default block
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    
    // Check if key is currently blocked
    const blockedUntil = this.blockedIPs.get(key);
    if (blockedUntil && now < blockedUntil) {
      return false;
    }
    
    // Clean up expired blocks
    if (blockedUntil && now >= blockedUntil) {
      this.blockedIPs.delete(key);
    }
    
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      // Block the key for the block duration
      this.blockedIPs.set(key, now + this.blockDuration);
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    // Clean up old entries periodically
    this.cleanupOldEntries(now);
    
    return true;
  }
  
  private cleanupOldEntries(now: number) {
    // Randomly cleanup (1% chance) to avoid performance issues
    if (Math.random() < 0.01) {
      for (const [key, requests] of this.requests.entries()) {
        const validRequests = requests.filter(time => now - time < this.windowMs);
        if (validRequests.length === 0) {
          this.requests.delete(key);
        } else {
          this.requests.set(key, validRequests);
        }
      }
    }
  }
  
  // Get user identifier for rate limiting
  getUserKey(): string {
    // Use combination of IP (if available) and user agent for fingerprinting
    const userAgent = navigator.userAgent.slice(0, 100); // Limit length
    const screenInfo = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return btoa(`${userAgent}-${screenInfo}-${timezone}`).slice(0, 32);
  }
}

export const rateLimiter = new RateLimiter();

// Additional security utilities
export const validateFormInput = (value: any, maxLength: number = 100): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  
  if (value.length > maxLength) {
    return false;
  }
  
  // Check for malicious patterns
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /%3Cscript/i, // URL encoded script
    /&#x3C;script/i // HTML entity encoded script
  ];
  
  return !maliciousPatterns.some(pattern => pattern.test(value));
};
