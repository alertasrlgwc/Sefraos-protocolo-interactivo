const CACHE_NAME = 'sefraos-protocolo-v1';
const BASE = '/Sefraos-protocolo-interactivo/';
const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'sefraos_icon_192.png',
  BASE + 'sefraos_icon_512.png'
];

// Instalación: guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activación: limpia cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: sirve desde caché si está disponible (funciona offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match(BASE + 'index.html'));
    })
  );
});
