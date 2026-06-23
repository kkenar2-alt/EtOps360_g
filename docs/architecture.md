# EtOps 360 Mimari Notu

## Ana İlke

Logo Tiger 3 resmi ERP omurgası olarak kalır. EtOps 360, operasyon verisini toplar, doğrular, onaylatır ve Logo'ya kontrollü kayıt üretir. Logo veritabanına kontrolsüz insert/update yapılmaz.

## Modüler Monolit Başlangıcı

İlk sürüm modüler monolit olarak kuruldu:

- API dış dünya sınırı.
- Contracts frontend ve backend arasındaki veri sözleşmeleri.
- Application iş akışı arayüzleri.
- Domain saf iş kavramları.
- Infrastructure veri okuma, entegrasyon ve adaptörlerin yeri.

Bu yaklaşım erken fazda hızlı geliştirir, ama banka mutabakatı, POS import, WMS/soğuk zincir gibi yoğun modüller büyüdüğünde ayrı servislere bölünebilir.

## Karkastan Kasaya Veri Zinciri

Hedef sorgulanabilir zincir:

Karkas Lot -> Parçalama Lotları -> Üretim Partisi -> Sevkiyat Partisi -> Şube Kabul -> POS Satış / Fire / İade -> Banka Tahsilatı -> Logo Muhasebe

Her hareketin taşıması gereken teknik alanlar:

- `sourceSystem`
- `sourceId`
- `idempotencyKey`
- `branchId`
- `lotId`
- `createdBy`
- `approvedBy`
- `auditHash`

## Evrak Yaklaşımı

Entegrasyon olan sistemlerde evraklar API/dosya/RPA ile gelir. Entegrasyon olmayan firmalarda kullanıcı combolardan seçim yaparak tıklama ile evrak taslağı oluşturur.

Evrak detay ekranı şu ilkeleri izler:

- Özet satıra tıklayınca detay açılır.
- Satırlar, lot ve tutar ayrıntısı gösterilir.
- Audit trail silinemez şekilde saklanır.
- Logo'ya aktarım onaylı taslaklardan yapılır.

## Güvenlik Yolu

İlk iskelet demo kimliği gösterir. Üretim öncesi zorunlu güvenlik işleri:

- SSO + MFA
- RBAC + ABAC
- Şube/bölge veri izolasyonu
- Object-level authorization
- Audit log
- Secrets vault
- Rate limit ve WAF
- SAST, DAST, dependency scanning
- PCI kapsamını küçültmek için kart PAN/CVV saklamama
