# EtOps360 GitHub Yükleme Notu

Bu paket GitHub'a yükleme için temizlenmiştir. `bin`, `obj`, `node_modules` ve `dist` klasörleri paketten çıkarıldı.

## CMD ile yükleme

Proje klasöründe CMD veya PowerShell açın:

```bat
git init
git branch -M main
git remote add origin https://github.com/kkenar2-alt/etops3601.git
git add .
git commit -m "ilk proje yukleme"
git push -u origin main
```

Eğer `remote origin already exists` hatası alırsanız:

```bat
git remote set-url origin https://github.com/kkenar2-alt/etops3601.git
git push -u origin main
```

## Çalıştırma

Backend:

```bat
dotnet run --project .\src\EtOps360.Api\EtOps360.Api.csproj --launch-profile http
```

Frontend:

```bat
cd src\web
npm install
npm run dev
```

Web adresi: `http://localhost:5173`
API adresi: `http://localhost:5096`
