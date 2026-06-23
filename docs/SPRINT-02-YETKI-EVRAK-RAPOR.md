# Sprint 02 - Yetki, Evrak ve Rapor Omurgası

Bu sprintin hedefi, kullanıcının ekranda doğrudan fark edeceği kontrol kulesi genişlemesini üretmektir.

## Ekranda gelenler

- Kontrol ekranında Sprint 02 vurgulu görünür banner.
- Yetki modülü: rol matrisi, şube veri izolasyonu, modül tamamlanma durumu ve guard rail listesi.
- Evrak merkezi: ürün/stok, şube, partner, neden, miktar, birim ve açıklama seçimleriyle entegre olmayan firmalar için baştan sona taslak üretim.
- Ürün kartları: kırmızı et, beyaz et, işlenmiş et, balık/deniz ürünleri ve yan ürünler aynı katalog modelinde.
- Rapor tabloları: mevcut filtreleme, gruplama, CSV ve kolon genişliği ayarları korunur.

## Teknik değişiklikler

- `EtOpsBootstrapDto.productMasters` eklendi.
- `/api/security-model` endpoint'i eklendi.
- `SecurityWorkspace` frontend modülü eklendi.
- `ModuleId` içine `security` eklendi.
- Merkez planlama profilinde güvenlik, kalite ve mutabakat yetkileri genişletildi.

## Sonraki sprint için temel

- SQL Server veri modeli.
- Audit log ve object-level authorization.
- Logo outbox tablosu.
- Banka/POS dosya import parser iskeleti.
- Evrak onay aksiyonları.
