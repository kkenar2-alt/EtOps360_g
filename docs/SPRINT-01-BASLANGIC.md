# Sprint 01 - EtOps 360 Baslangic Uygulama Plani

Bu sprintte proje demo iskeletinden, moduler ve buyumeye hazir bir operasyon kontrol uygulamasina cevrilmeye baslandi.

## Yapilan mimari kararlar

- Backend: ASP.NET Core Minimal API, moduler monolit.
- Frontend: React + TypeScript + Vite.
- ERP omurgasi: Logo Tiger 3 resmi sistem olarak kalir; EtOps 360 sadece dogrulanmis ve onaylanmis taslaklari aktarim kuyruguna alir.
- Veri zinciri: Karkas kabul -> parcalama -> uretim partisi -> sevkiyat -> sube kabul -> POS satis/fire/iade -> banka tahsilati -> Logo muhasebe.
- Baslangic veri katmani: Seeded read model. Sonraki sprintte SQL Server/PostgreSQL ve migration yapisi eklenecek.

## Bu paketle gelenler

- Yetkili kullanici ve sube secimli giris iskeleti.
- Rol bazli menu gorunurlugu.
- Karkastan kasaya timeline ekrani.
- Operasyon tablosunda siralama, sutun filtresi, gruplama, sutun genisligi degistirme ve CSV disari aktarma.
- Operasyon satir detay paneli.
- Manuel evrak olusturma akisi; evrak tipi, sube, neden, partner ve birim combolari.
- Kart tanimlari ekrani.
- Kalite/HACCP kontrol ekrani.
- Rapor merkezi iskeleti.
- Logo/banka robotu aktarim kuyrugu ekrani.

## Sonraki sprint

1. Gercek SQL veritabani ve EF Core entity modeli.
2. Kimlik dogrulama: JWT + refresh token + password hash veya SSO adaptoru.
3. RBAC/ABAC: sube, bolge, departman ve evrak nesnesi seviyesinde yetki.
4. Audit log: silinemez olay izleri, auditHash ve idempotencyKey.
5. Logo Tiger 3 adapter contractlari ve outbox tablosu.
6. POS/banka/yemek karti import staging tablolari.
7. Excel/CSV yukleme, kolon eslestirme ve hata satiri raporu.
8. Unit/integration test projeleri.
