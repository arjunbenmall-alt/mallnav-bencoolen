/**
 * MallNav — sw.js
 * Cache-first app shell so MallNav opens instantly (and works offline)
 * once a visitor has loaded it once — the whole point of a mall wayfinding
 * PWA is that it must not depend on shaky mall wifi after first load.
 *
 * Bump CACHE_VERSION whenever any precached file changes so returning
 * visitors pick up the update instead of a stale cache.
 */
const CACHE_VERSION = "mallnav-v1";

const PRECACHE_URLS = [
  "./",
  "index.html",
  "manifest.json",
  "css/variables.css",
  "css/base.css",
  "css/components.css",
  "css/navigation.css",
  "css/animations.css",
  "js/utils.js",
  "js/storage.js",
  "js/data-embedded.js",
  "js/data-loader.js",
  "js/searchEngine.js",
  "js/routeEngine.js",
  "js/mapEngine.js",
  "js/animationEngine.js",
  "js/navigationEngine.js",
  "js/uiComponents.js",
  "js/app.js",
  "data/floors.json",
  "data/tenants.json",
  "data/facilities.json",
  "data/navpoints.json",
  "data/qrpoints.json",
  "assets/svg/floor1.svg",
  "assets/svg/floor2.svg",
  "assets/svg/floor3.svg",
  "assets/icons/icon.svg",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
