'use strict';
// Bump this version whenever a cached application file changes.
const CACHE = 'akilli-mutfak-v2';
const ROOT = new URL('./', self.location.href);
const FILES = ['./', 'index.html', 'style.css', 'data.js', 'app.js', 'pwa.js', 'manifest.webmanifest', 'icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
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
