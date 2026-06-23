# EtOps 360

EtOps 360; kirmizi et, beyaz et, islenmis et, deniz urunleri ve yan urun operasyonlarini **karkastan kasaya** izleyen web tabanli operasyon, evrak, mutabakat ve raporlama platformu iskeletidir.

Logo Tiger 3 resmi ERP omurgasi olarak kalir. EtOps 360 operasyon verisini toplar, dogrular, onaylatir ve Logo'ya kontrollu aktarim kuyrugu uretir. Logo veritabanina kontrolsuz insert/update yapilmaz.

## Kapsam

- Kullanici, rol ve sube yetkili giris akisi
- Karkas kabul, parcalama, uretim ve randiman zinciri
- Sube siparis onerisi, onay, fire ve iade hareketleri
- WMS/FEFO, soguk zincir ve sube kabul farklari
- Entegrasyonsuz firmalar icin combodan secimli manuel evrak uretimi
- Evrak detay, satir, lot, tutar ve audit trail gorunumu
- POS, yemek karti, online odeme ve banka mutabakati
- Logo Tiger 3 aktarim kuyrugu ve idempotency temeli
- HACCP/CCP/OPRP kalite kontrol ve blokaj iskeleti
- Esnek raporlama: filtre, gruplama, sutun filtreleri, CSV aktarimi
- Kart tabanli tanimlar: sube, bolge, urun ailesi, surec, evrak tipi, fire nedeni, partner, birim

## Teknoloji

- Backend: ASP.NET Core Minimal API, .NET SDK
- Frontend: React + TypeScript + Vite
- Grafik/UI: Recharts, Lucide React
- Baslangic veri katmani: Seeded read model
- Sonraki veri katmani: SQL Server veya PostgreSQL + EF Core migration

## Proje yapisi

```text
EtOps360/
  docs/
    architecture.md
    module-roadmap.md
    SPRINT-01-BASLANGIC.md
    DEVELOPMENT-STANDARDS.md
    INSTALL-WINDOWS.md
  scripts/
    bootstrap-windows.ps1
  src/
    EtOps360.Api/
    EtOps360.Application/
    EtOps360.Contracts/
    EtOps360.Domain/
    EtOps360.Infrastructure/
    web/
```

## Windows'ta calistirma

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

- `merkez.planlama` - tum subeler, operasyon, rapor, kart ve entegrasyon kuyrugu
- `bolge.marmara` - Bursa 12 bolge yetkisi
- `sube.bursa12` - sadece Bursa 12 sube yetkisi
- `finans.pos` - POS/banka mutabakati ve entegrasyon kuyrugu
- `kalite.merkez` - kalite, blokaj ve rapor yetkisi

## Gelistirme kontrolu

Frontend build:

```powershell
cd src\web
npm run build
```

GitHub'a guncelleme:

```powershell
git add .
git commit -m "EtOps360 sprint 01 guncellemesi"
git push
```

## Uretime gecmeden once zorunlu isler

- Gercek kimlik dogrulama: JWT/refresh token veya SSO + MFA
- RBAC + ABAC + object-level authorization
- SQL veri modeli, audit log ve outbox/idempotency tablolari
- Logo Tiger 3 resmi adapter/RPA/API stratejisi
- POS, banka, yemek karti ve online platform staging tablolari
- SAST, DAST, dependency scanning, rate limit, WAF
- Secrets vault, ortam bazli konfigurasyon ve log maskeleme
