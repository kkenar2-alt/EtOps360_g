# EtOps360 Sprint 01 Degisiklik Ozeti

## Backend

- `EtOps360.Contracts` genisletildi: katalog, rapor, kalite, traceability, is kuyrugu, entegrasyon kuyrugu DTO'lari eklendi.
- `IEtOpsReadModel` genisletildi: operation detail, catalogs, traceability, work queue, quality checks, reports, integration queue metotlari eklendi.
- `EtOpsEndpoints` genisletildi: `/api/catalogs`, `/api/traceability`, `/api/work-queue`, `/api/quality`, `/api/reports`, `/api/integration-queue` endpointleri eklendi.
- Seeded veri modeli kirmizi et disina genisletildi: beyaz et, deniz urunleri, islenmis et ve yan urunler.
- Kullanici rollerine permission listesi eklendi.

## Frontend

- Sol menu modulleri aktif calisir hale getirildi.
- Rol yetkisine gore menu gorunurlugu eklendi.
- Operasyon tablosu: sutun filtresi, gruplama, siralama, manuel sutun genisligi ve CSV export.
- Operasyon satir detay paneli eklendi.
- Karkastan kasaya timeline eklendi.
- Kartlar, kalite, rapor ve entegrasyon kuyrugu ekranlari eklendi.
- Evrak uretim formu daha fazla combo ile genisletildi.

## Kontrol

- `npm install` calistirildi.
- `npm run build` basarili tamamlandi.
- Build sonrasi `node_modules` ve `dist` temizlendi; GitHub'a yuklenmemeli.
- Backend build bu ortamda `dotnet` olmadigi icin calistirilamadi; Windows makinede `dotnet restore` ve `dotnet build` ile kontrol edilecek.
