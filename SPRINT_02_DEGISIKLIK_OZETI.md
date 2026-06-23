# Sprint 02 Değişiklik Özeti

## Görünür ekran değişiklikleri

- Ana kontrol ekranına Sprint 02 banner eklendi.
- Sol menüye Yetki modülü eklendi.
- Evrak merkezi ürün/stok combosu, açıklama alanı ve daha net detay akışıyla genişletildi.
- Kartlar tarafına ürün ve stok kartları eklendi.
- Tablolar mevcut yapı korunarak filtrelenebilir, gruplanabilir, CSV alınabilir ve kolon genişliği elle ayarlanabilir kaldı.

## Backend değişiklikleri

- `/api/security-model` endpoint'i eklendi.
- `SecurityModelDto`, rol matrisi, şube veri kapsamı, modül ilerleme ve guard rail kayıtları eklendi.
- Bootstrap içine `productMasters` eklendi.
- Entegrasyonsuz evrak oluşturma isteği ürün, miktar, birim ve açıklama ile genişletildi.

## İş ilkeleri

- Logo Tiger 3'e doğrudan kontrolsüz insert/update yapılmaz.
- Onaylı taslak + outbox + idempotency modeli korunur.
- Şube kullanıcısı kendi şubesine, bölge kullanıcısı kendi bölgesine, merkez kullanıcısı tüm zincire yetkilendirilir.
- Kırmızı et, beyaz et, işlenmiş et, balık/deniz ürünleri ve yan ürünler aynı katalog mantığında izlenir.
