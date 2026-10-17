'use strict';
(() => {
  const button = document.getElementById('installApp');
  const dialog = document.getElementById('installDialog');
  const nativeButton = document.getElementById('nativeInstall');
  const help = document.getElementById('installHelp');
  const status = document.getElementById('offlineStatus');
  let prompt = null;
  let ready = false;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  function updateStatus() {
    button.hidden = standalone();
    status.textContent = !navigator.onLine ? (ready ? 'Çevrimdışısın · 50 tarif cihazında hazır.' : 'Çevrimdışısın · İlk kurulum için internet bağlantısı gerekli.') : ready ? '✓ Çevrimdışı kullanıma hazır · 50 tarif cihazında.' : 'Tarifler çevrimdışı kullanım için hazırlanıyor…';
  }
  function updateHelp() {
    nativeButton.hidden = !prompt;
    if (prompt) help.innerHTML = '<p>Aşağıdaki düğmeye dokunup tarayıcının yükleme isteğini onayla.</p>';
    else if (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) help.innerHTML = '<ol><li>Bu siteyi Safari’de aç.</li><li>Paylaş düğmesine dokun.</li><li><strong>Ana Ekrana Ekle</strong> seçeneğini seçip Ekle’ye dokun.</li></ol>';
    else help.innerHTML = '<ol><li>Siteyi Chrome veya Edge’de aç.</li><li>Tarayıcı menüsünden <strong>Uygulamayı yükle</strong> veya <strong>Ana ekrana ekle</strong> seçeneğini seç.</li><li>Onayla; Akıllı Mutfak kendi penceresinde açılır.</li></ol><p>Seçenek görünmüyorsa ilk kurulumun tamamlanmasını bekle. Yükleme desteği tarayıcıya göre değişir.</p>';
  }
  button.onclick = () => { updateHelp(); dialog.showModal(); };
  document.getElementById('closeInstall').onclick = () => dialog.close();
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  addEventListener('beforeinstallprompt', event => { event.preventDefault(); prompt = event; updateHelp(); });
  nativeButton.onclick = async () => {
    if (!prompt) return;
    const current = prompt; prompt = null; nativeButton.hidden = true;
    try { await current.prompt(); const result = await current.userChoice; if (result.outcome === 'accepted') dialog.close(); } catch { /* Manual instructions remain available. */ }
    updateHelp();
  };
  addEventListener('appinstalled', () => { prompt = null; button.hidden = true; dialog.close(); });
  addEventListener('online', updateStatus); addEventListener('offline', updateStatus);
  updateStatus();
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('./sw.js').then(async () => {
      await navigator.serviceWorker.ready;
      ready = true; updateStatus();
    }).catch(() => { status.textContent = 'Çevrimdışı hazırlık tamamlanamadı. İnternet bağlantısıyla sayfayı yenileyebilirsin.'; });
  } else status.textContent = 'Yükleme ve çevrimdışı kullanım için HTTPS ve destekleyen bir tarayıcı gerekir.';
})();
