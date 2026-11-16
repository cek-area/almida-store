// ALMIDA STORE PWA Online — no offline cache, no Firestore interception.
const VERSION = 'almida-online-v1';
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('almida-')).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' && new URL(event.request.url).origin === self.location.origin) {
    event.respondWith(fetch(event.request));
  }
});
