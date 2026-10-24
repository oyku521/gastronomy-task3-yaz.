'use strict';
// Bump this version whenever a cached application file changes.
const CACHE = 'akilli-mutfak-v6-recipe-art';
const ROOT = new URL('./', self.location.href);
const FILES = ["./", "index.html", "style.css", "data.js", "app.js", "pwa.js", "manifest.webmanifest", "icon.svg", "icons/icon-192.png", "icons/icon-512.png", "images/breakfast.svg", "images/chia.svg", "images/dessert.svg", "images/fish.svg", "images/hero.svg", "images/main.svg", "images/pancakes.svg", "images/pasta.svg", "images/potato.svg", "images/salad.svg", "images/side.svg", "images/snack.svg", "images/soup.svg", "images/tofu.svg", "images/yogurt.svg", "images/recipes/r001.svg", "images/recipes/r002.svg", "images/recipes/r003.svg", "images/recipes/r004.svg", "images/recipes/r005.svg", "images/recipes/r006.svg", "images/recipes/r007.svg", "images/recipes/r008.svg", "images/recipes/r011.svg", "images/recipes/r012.svg", "images/recipes/r013.svg", "images/recipes/r014.svg", "images/recipes/r015.svg", "images/recipes/r016.svg", "images/recipes/r017.svg", "images/recipes/r018.svg", "images/recipes/r019.svg", "images/recipes/r020.svg", "images/recipes/r021.svg", "images/recipes/r023.svg", "images/recipes/r024.svg", "images/recipes/r025.svg", "images/recipes/r026.svg", "images/recipes/r027.svg", "images/recipes/r028.svg", "images/recipes/r029.svg", "images/recipes/r030.svg", "images/recipes/r031.svg", "images/recipes/r032.svg", "images/recipes/r033.svg", "images/recipes/r034.svg", "images/recipes/r035.svg", "images/recipes/r036.svg", "images/recipes/r037.svg", "images/recipes/r038.svg", "images/recipes/r039.svg", "images/recipes/r040.svg", "images/recipes/r041.svg", "images/recipes/r042.svg", "images/recipes/r043.svg", "images/recipes/r044.svg", "images/recipes/r045.svg", "images/recipes/r046.svg", "images/recipes/r047.svg", "images/recipes/r048.svg", "images/recipes/r049.svg", "images/recipes/r050.svg", "images/recipes/r053.svg", "images/recipes/r054.svg", "images/recipes/r055.svg", "images/recipes/r056.svg", "images/recipes/r057.svg", "images/recipes/r058.svg", "images/recipes/r059.svg", "images/recipes/r060.svg", "images/recipes/r061.svg", "images/recipes/r063.svg", "images/recipes/r064.svg", "images/recipes/r065.svg", "images/recipes/r066.svg", "images/recipes/r067.svg", "images/recipes/r068.svg", "images/recipes/r069.svg", "images/recipes/r071.svg", "images/recipes/r072.svg", "images/recipes/r073.svg", "images/recipes/r074.svg", "images/recipes/r075.svg", "images/recipes/r076.svg", "images/recipes/r077.svg", "images/recipes/r078.svg", "images/recipes/r079.svg", "images/recipes/r080.svg", "images/recipes/r081.svg", "images/recipes/r082.svg", "images/recipes/r083.svg", "images/recipes/r084.svg", "images/recipes/r085.svg", "images/recipes/r086.svg", "images/recipes/r087.svg"];
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
