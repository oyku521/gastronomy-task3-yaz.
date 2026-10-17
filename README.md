# Akıllı Mutfak

50 tarif içeren, telefon ve bilgisayara uyumlu Türkçe tarif keşif sitesi.

- Malzemelere göre tam eşleşen veya en fazla bir ana malzemesi eksik tarifler.
- Tarif adı, kategori ve vegan filtreleri.
- Tarayıcıda saklanan favoriler ve malzeme seçimleri.
- Ek bağımlılık, sunucu hesabı veya API anahtarı gerektirmez.

## Yerelde çalıştırma

Depo klasöründe `python3 -m http.server 8000` komutunu çalıştırıp tarayıcıda `http://localhost:8000` adresini açın.

## GitHub Pages

Dosyaları GitHub deposunun `main` dalına gönderin. Depoda **Settings → Pages → Build and deployment → Source → GitHub Actions** seçin. `Publish website` iş akışı siteyi yayınlar; daha sonra main dalına yapılan gönderimler siteyi günceller. Canlı adres başarılı dağıtımın çıktısında görünür.

## Veriler

`data.js`, kullanıcının yüklediği HTML dosyasındaki 50 tarifi içerir. Kalori değerleri kaynak dosyadan alınan yaklaşık bilgilerdir; porsiyon ve ölçüler belirtilmediği için beslenme tavsiyesi sayılmaz. Tarif kartları malzemeleri gösterir; ayrıntılı pişirme yönergeleri içermez. Tuz, yağ ve diğer ek malzemeler ayrıca kontrol edilmelidir.

Görseller emoji tabanlı çizimlerdir. Çevrimdışı kullanım için sistem yazı tipleri kullanılır.

## Uygulama olarak yükleme (PWA)

GitHub Pages üzerinde HTTPS ile yayınlandığında site telefona veya bilgisayara kurulabilir. Android/Chrome ve bilgisayar/Edge için **Uygulamayı yükle** düğmesini veya tarayıcının yükleme menüsünü kullanın. iPhone/iPad üzerinde Safari → Paylaş → Ana Ekrana Ekle yolunu izleyin. Yükleme desteği tarayıcıya göre değişir. Bu bir PWA uygulamasıdır; APK veya App Store paketi değildir.

İlk çevrimiçi açılışta **Çevrimdışı kullanıma hazır** bildiriminin görünmesini bekleyin. Ardından 50 tarif, arama, malzeme eşleştirme ve favoriler internetsiz çalışır. Favoriler ve seçili malzemeler cihazın tarayıcı depolamasındadır; veriler silinirse kaybolur, cihazlar arasında eşitlenmez.

`manifest.webmanifest` uygulama adını, kapsamını ve ikonlarını tanımlar. `sw.js` uygulama dosyalarını tek sürüm halinde önbelleğe alır. Uygulama dosyaları değiştiğinde `sw.js` içindeki `CACHE` sürümünü de artırın. Güncelleme çevrimiçiyken alınır ve sonraki açılışta görünür. Dış font veya başka bir uzak çalışma zamanı kaynağı gerekmez.

Doğrulama: GitHub Pages alt klasörünü temsil eden bir URL'de ilk yükleme ve service worker etkinleşmesi kontrol edildi; bağlantı kesilip sayfa yeniden yüklenerek 50 tarif, arama, favoriler ve malzeme eşleştirmesi çalıştırıldı. Gerçek cihazda işletim sisteminin yükleme akışı ayrıca denenmelidir.
