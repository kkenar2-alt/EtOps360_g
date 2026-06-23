# Windows Kurulum

## Gerekli programlar

- Git for Windows
- .NET SDK
- Node.js LTS
- Visual Studio Code veya Visual Studio 2022
- Sonraki sprint icin SQL Server Developer/Express + SQL Server Management Studio

## Onerilen klasor

```powershell
C:\Users\mentis\Documents\Codex\EtOps360
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

GitHub'a guncelleme:

```powershell
git add .
git commit -m "EtOps360 sprint 01 baslangic"
git push
```
