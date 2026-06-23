# EtOps 360 Gelistirme Standartlari

## Kod bolme kuralı

Tek buyuk dosya yasak. Her is alani ayrilir:

- `src/EtOps360.Domain`: saf is kavramlari, enumlar, kurallar.
- `src/EtOps360.Application`: use-case arayuzleri, servis kontratlari.
- `src/EtOps360.Contracts`: API DTO sozlesmeleri.
- `src/EtOps360.Infrastructure`: veri, entegrasyon, adapter, seeded/mock servisler.
- `src/EtOps360.Api`: endpoint ve HTTP dis siniri.
- `src/web/src/features`: frontend modul ekranlari.
- `src/web/src/components`: tekrar kullanilabilir UI parcalari.

## UI/UX ilkeleri

- Soft ve modern renkler.
- Ana ekran dağınık olmamalı; moduller solda, filtreler ustte, detaylar sagda.
- Veri tabloları icerige gore makul genislikte baslar; kullanici sutun genisligini degistirebilir.
- Tarih gibi kisa alanlar gereksiz uzun tutulmaz.
- Elle veri girisi yerine kart tabanli combo secimleri kullanilir.
- Her ozet satirdan detaya gidilir.

## Guvenlik ilkeleri

- Uretimde demo token kullanilmaz.
- Kullanici sifresi hashlenmeden saklanmaz.
- API her endpointte object-level authorization uygular.
- Kart PAN/CVV saklanmaz; PCI kapsami kucultulur.
- Secrets dosyaya yazilmaz; vault/env kullanilir.
- Tum entegrasyonlarda idempotencyKey zorunludur.
- Logo veritabanina kontrolsuz insert/update yapilmaz.

## Raporlama ilkeleri

- Her raporda tarih, sube, bolge, urun ailesi, lot ve durum filtreleri desteklenir.
- Grup secenekleri kartlardan gelir.
- CSV/Excel aktarimi rapor merkezinden yapilir.
- Rapor satirindan ilgili evrak/lot/operasyon detayina gidilir.
