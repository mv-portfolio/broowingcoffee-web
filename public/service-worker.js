const CACHE = 'version@0.0.1';
const CACHE_URL = ['index.html', 'offline.html'];

const { window, caches } = self;

//install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log('cached opened');
      return cache.addAll(CACHE_URL);
    })
  );
});

//Listen for request
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then(() => {
//       return fetch(event.request).catch((err) => caches.match('offline.html'));
//     })
//   );
// });

//Activate the SW
self.addEventListener('activate', (event) => {
  const cachesWhitelist = [];
  cachesWhitelist.push(CACHE);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cachesWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
