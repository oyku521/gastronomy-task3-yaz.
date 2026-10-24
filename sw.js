'use strict';
// Bump this version whenever a cached application file changes.
const CACHE = 'akilli-mutfak-v4-pantry80';
const ROOT = new URL('./', self.location.href);
const FILES = ["./", "index.html", "style.css", "data.js", "app.js", "pwa.js", "manifest.webmanifest", "icon.svg", "icons/icon-192.png", "icons/icon-512.png", "images/breakfast.svg", "images/chia.svg", "images/dessert.svg", "images/fish.svg", "images/hero.svg", "images/main.svg", "images/pancakes.svg", "images/pasta.svg", "images/potato.svg", "images/salad.svg", "images/side.svg", "images/snack.svg", "images/soup.svg", "images/tofu.svg", "images/yogurt.svg"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES.map(file => new Request(new URL(file, ROOT), { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('akilli-mutfak-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname)) return;
  // Only serve this app's known assets. Navigation always loads the cached shell.
  const asset = event.request.mode === 'navigate' ? new URL('index.html', ROOT).href : url.href;
  if (event.request.mode !== 'navigate' && !FILES.some(file => new URL(file, ROOT).href === asset)) return;
  event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(asset)) || fetch(event.request)));
});
self.addEventListener('message', event => {
  if (event.data?.type === 'VERSION' && event.ports[0]) event.ports[0].postMessage(CACHE);
});
