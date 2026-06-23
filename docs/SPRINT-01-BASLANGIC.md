# Sprint 01 - EtOps 360 Baslangic Uygulama Plani

Bu sprintte proje demo iskeletinden moduler, buyumeye hazir bir operasyon kontrol uygulamasina cevrilmeye baslandi.

## Yapilanlar

- Control Tower endpoint grubu eklendi: katalog, traceability, is kuyrugu, kalite, rapor tanimi ve entegrasyon kuyrugu.
- Frontend ana ekrana karkastan kasaya kontrol kulesi eklendi.
- Kirmizi et disina beyaz et, islenmis et, deniz urunleri ve yan urun aileleri eklendi.
- Entegrasyon olmayan firmalar icin combodan evrak uretme yaklasimi korundu.
- Logo ve banka aktarimlarinda idempotency anahtari fikri ekranda gorunur hale getirildi.

## Sonraki sprint

1. SQL Server/PostgreSQL veri modeli ve EF Core migration.
2. JWT/SSO/MFA, RBAC, ABAC ve object-level authorization.
3. Audit log, auditHash ve outbox/idempotency tablolari.
4. Logo Tiger 3 adapter ve POS/banka/yemek karti staging tablolari.
5. Excel/CSV import, kolon eslestirme ve hata satiri raporu.
