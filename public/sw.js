const CACHE_NAME = 'ischeduledu-v1';

// Install event - minimal caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache opened');
        // Only cache the main page for offline support
        return cache.addAll(['/index.html']);
      })
      .catch((error) => {
        console.log('Service Worker: Cache install failed:', error);
      })
  );
});

// Fetch event - only handle navigation requests
self.addEventListener('fetch', (event) => {
  // Only handle navigation requests (page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, serve from cache
          return caches.match('/index.html');
        })
    );
  }
  // For all other requests (images, scripts, external resources), let them pass through
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 