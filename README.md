# EtOps 360

EtOps 360; kirmizi et, beyaz et, islenmis et, balik/deniz urunleri ve yan urun operasyonlarini **karkastan kasaya** izleyen web tabanli operasyon, evrak, mutabakat ve raporlama platformu iskeletidir.

Logo Tiger 3 resmi ERP omurgasi olarak kalir. EtOps 360 operasyon verisini toplar, dogrular, onaylatir ve Logo'ya kontrollu aktarim kuyrugu uretir.

## Sprint 01 ile gelenler

- Kullanici, rol ve sube yetkili giris akisi
- Karkastan kasaya Control Tower ekranı
- Katalog/kart tanimlari: sube, urun ailesi, surec, evrak tipi, fire/iade/fark nedeni
- Traceability: karkas kabul -> parcalama -> uretim -> sevkiyat -> sube kabul -> POS/fire/iade -> banka -> Logo
- Is kuyrugu, kalite kontrol, rapor tanimi ve entegrasyon kuyrugu API'leri
- Entegrasyonsuz firmalarda combodan secimli manuel evrak yaklasimi
- Mevcut operasyon tablosunda siralama, gruplama, sutun genisligi degistirme

## Teknoloji

- Backend: ASP.NET Core Minimal API
- Frontend: React + TypeScript + Vite
- UI: Recharts, Lucide React
- Baslangic veri katmani: Seeded read model
- Sonraki veri katmani: SQL Server veya PostgreSQL + EF Core migration

## Proje yapisi

```text
EtOps360/
  docs/
  scripts/
  src/
    EtOps360.Api/
    EtOps360.Application/
    EtOps360.Contracts/
    EtOps360.Domain/
    EtOps360.Infrastructure/
    web/
```

## Calistirma

Backend:

```powershell
cd C:\Users\mentis\Documents\Codex\EtOps360
dotnet restore
dotnet run --project .\src\EtOps360.Api\EtOps360.Api.csproj --launch-profile http
```

Frontend:

```powershell
cd C:\Users\mentis\Documents\Codex\EtOps360\src\web
npm install
npm run dev
```

Tarayici:

```text
http://localhost:5173
```

## Demo kullanicilar

- `merkez.planlama`
- `bolge.marmara`
- `sube.bursa12`
- `finans.pos`
- `kalite.merkez`

## Uretime gecmeden once zorunlu isler

- JWT/refresh token veya SSO + MFA
- RBAC + ABAC + object-level authorization
- SQL veri modeli, audit log ve outbox/idempotency tablolari
- Logo Tiger 3 resmi adapter/RPA/API stratejisi
- POS, banka, yemek karti ve online platform staging tablolari
- Secrets vault, SAST/DAST/dependency scanning, rate limit ve WAF
