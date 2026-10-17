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

Görseller emoji tabanlı çizimlerdir. Google Fonts erişimi olmadığında sistem yazı tipleri kullanılır.
