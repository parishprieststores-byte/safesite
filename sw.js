// SafeSite service worker — makes the app installable and fully offline.
// After you upload a new index.html, change v4 to v5 (and so on) so phones refresh their saved copy.
const CACHE_VERSION = 'safesite-v4';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './forms.js',
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

// Page loads: use the network when it answers quickly, otherwise the saved copy.
function pageRequest(req) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (r) => { if (!settled && r) { settled = true; resolve(r); } };
    const fromCache = () =>
      caches.match(req, { ignoreSearch: true })
        .then((r) => r || caches.match('./index.html'))
        .then((r) => r || caches.match('./'));

    const timer = setTimeout(() => { fromCache().then(finish); }, 4000);

    fetch(req)
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
    event.respondWith(pageRequest(req));
    return;
  }

  // Everything else (own files, fonts, libraries): saved copy first, refresh in the background.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => { saveCopy(req, res); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
