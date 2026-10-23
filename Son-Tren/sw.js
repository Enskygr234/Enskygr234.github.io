// Çevrimdışı oynamak için basit önbellek
const SURUM = 'son-tren-v1';
const DOSYALAR = ['./', 'index.html', 'css/stil.css', 'js/oyun.js', 'js/dunya.js', 'js/karakter.js', 'js/ses.js', 'js/hikaye.js', 'js/yardimci.js',
  'lib/three.module.js', 'lib/three.core.js', 'fonts/literata.woff', 'fonts/literata-italic.woff', 'fonts/bigshoulders.woff', 'icons/icon-192.png', 'manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(SURUM).then(c => c.addAll(DOSYALAR)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(a => a !== SURUM).map(a => caches.delete(a)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(SURUM).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request)));
});
