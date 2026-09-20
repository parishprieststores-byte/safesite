// SafeSite service worker — makes the app installable and fully offline.
// Bump the version number below only if you rename or remove files (updated files are picked up automatically).
const CACHE_VERSION = 'safesite-v7';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './forms.js',
  './emergency.js',
  './lock.js',
  './manifest.json',
  './pwa.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) =>
        Promise.all(CORE.map((url) => cache.add(new Request(url, { cache: 'reload' })).catch(() => {})))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function saveCopy(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
  }
}

// Own files (pages, scripts, styles): ask the server first so updates show up straight away;
// fall back to the saved copy when offline or when the network is very slow.
function freshFirst(req, isPage) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (r) => { if (!settled && r) { settled = true; resolve(r); } };
    const fromCache = () =>
      caches.match(req, { ignoreSearch: true }).then((r) => {
        if (r || !isPage) return r;
        return caches.match('./index.html').then((x) => x || caches.match('./'));
      });

    const timer = setTimeout(() => { fromCache().then(finish); }, 4000);

    fetch(new Request(req, { cache: 'no-cache' }))
      .then((res) => {
        clearTimeout(timer);
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
        }
        finish(res);
      })
      .catch(() => {
        clearTimeout(timer);
        fromCache().then((r) => {
          if (r) finish(r);
          else if (!settled) { settled = true; resolve(Response.error()); }
        });
      });
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith('http')) return;
  if (req.headers.has('range')) return;

  if (req.mode === 'navigate') {
    event.respondWith(freshFirst(req, true));
    return;
  }

  if (new URL(req.url).origin === self.location.origin) {
    event.respondWith(freshFirst(req, false));
    return;
  }

  // Other websites (fonts, libraries): saved copy first, refresh in the background.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => { saveCopy(req, res); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
          
