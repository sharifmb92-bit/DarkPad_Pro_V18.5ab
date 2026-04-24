const CACHE_NAME = 'darkpad-pro-v18';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación: Guarda los archivos básicos en la memoria del móvil
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpia versiones antiguas si las hubiera
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Estrategia de carga: Intenta red primero, si falla usa el caché (offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
