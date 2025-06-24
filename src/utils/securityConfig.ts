
// Security configuration and headers
export const SECURITY_CONFIG = {
  // Content Security Policy
  CSP_HEADER: `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://toolbox.marketingtools.apple.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https: blob:;
    font-src 'self' data:;
    connect-src 'self' https://bfwojaofxczxxfxlfvqf.supabase.co wss://bfwojaofxczxxfxlfvqf.supabase.co;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s+/g, ' ').trim(),

  // Security headers configuration
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },

  // Session configuration
  SESSION_CONFIG: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict' as const,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
};

// Helper function to apply security configurations (for future use with a backend)
export const applySecurityHeaders = (headers: Record<string, string>) => {
  return {
    ...headers,
    ...SECURITY_CONFIG.SECURITY_HEADERS,
    'Content-Security-Policy': SECURITY_CONFIG.CSP_HEADER,
  };
};
