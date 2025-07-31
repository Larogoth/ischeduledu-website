const CACHE_NAME = 'ischeduledu-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/fonts/Euclid Circular B Regular.woff2',
  '/fonts/Euclid Circular B Medium.woff2',
  '/fonts/Euclid Circular B Bold.woff2',
  '/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner-256.png',
  '/lovable-uploads/ischeduledu-saved-schedules-management-interface.png',
  '/lovable-uploads/ischeduledu-daily-notifications-setup-screen.png',
  '/lovable-uploads/ischeduledu-daily-timeline-schedule-view.png',
  '/lovable-uploads/ischeduledu-rotating-block-schedule-calendar.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip external resources and critical assets
  if (event.request.url.includes('googletagmanager.com') || 
      event.request.url.includes('google-analytics.com') ||
      event.request.url.includes('peerpush.net') ||
      event.request.url.includes('toolbox.marketingtools.apple.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch(() => {
          // Return a fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 