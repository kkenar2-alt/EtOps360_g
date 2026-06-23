# Windows Kurulum ve Calistirma

## Gerekli programlar

1. Git for Windows
2. .NET SDK
3. Node.js LTS
4. Visual Studio Code veya Visual Studio 2022
5. SQL Server Developer/Express ve SQL Server Management Studio; sonraki sprintte gercek veritabani icin gerekli olacak.

## Klasor onerisi

Projeyi su klasore koy:

```powershell
C:\Users\mentis\Documents\Codex\EtOps360
```

## Ilk calistirma

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

## Frontend kontrol

```powershell
cd C:\Users\mentis\Documents\Codex\EtOps360\src\web
npm run build
npm run lint
```

## GitHub'a guncelleme

```powershell
cd C:\Users\mentis\Documents\Codex\EtOps360
git add .
git commit -m "EtOps360 sprint 01 guncellemesi"
git push
```
