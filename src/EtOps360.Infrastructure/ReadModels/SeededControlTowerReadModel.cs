using EtOps360.Application.Abstractions;
using EtOps360.Contracts.Dashboard;

namespace EtOps360.Infrastructure.ReadModels;

internal sealed class SeededControlTowerReadModel : IControlTowerReadModel
{
    private static readonly IReadOnlyList<SelectOptionDto> Branches =
    [
        new("all", "Tum subeler", "Genel"),
        new("merkez", "Merkez Uretim", "Merkez"),
        new("bursa-12", "Bursa 12", "Marmara"),
        new("ankara-04", "Ankara 04", "Ic Anadolu"),
        new("izmir-08", "Izmir 08", "Ege"),
        new("antalya-03", "Antalya 03", "Akdeniz")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> ProductFamilies =
    [
        new("red-meat", "Kirmizi et"),
        new("poultry", "Beyaz et"),
        new("processed", "Islenmis et"),
        new("bakery-dairy", "Ekmek, sut urunleri ve yan urun"),
        new("seafood", "Balik ve deniz urunleri")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> DocumentTypes =
    [
        new("branch-order", "Sube siparis evraki", "Satis"),
        new("waste-slip", "Fire / imha fisi", "Operasyon"),
        new("return-slip", "Iade kabul evraki", "Operasyon"),
        new("shipment", "Sevkiyat irsaliyesi", "Lojistik"),
        new("production-consumption", "Uretim sarf fisi", "Uretim"),
        new("production-receipt", "Mamul giris fisi", "Uretim"),
        new("pos-reconciliation", "POS mutabakat fisi", "Finans"),
        new("quality-hold", "Kalite blokaj formu", "Kalite"),
        new("manual-purchase", "Manuel tedarik kabul evraki", "Tedarik")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> ReasonCodes =
    [
        new("manual-entry", "Entegrasyon yok - manuel evrak"),
        new("waste-approval", "Fire onayi"),
        new("temperature-breach", "Soguk zincir sapmasi"),
        new("weight-difference", "Kantar / sayim farki"),
        new("settlement-close", "Mutabakat kapama"),
        new("quality-hold", "Kalite blokaji"),
        new("return-from-branch", "Sube iadesi")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> ProcessTypes =
    [
        new("carcass", "Karkas kabul", "Uretim"),
        new("cutting", "Parcalama ve randiman", "Uretim"),
        new("production", "Uretim sarf/mamul", "Uretim"),
        new("shipment", "Sevkiyat ve soguk zincir", "Lojistik"),
        new("branch-receipt", "Sube kabul farklari", "Sube"),
        new("pos", "POS satis/fire/iade", "Sube"),
        new("bank", "Banka mutabakati", "Finans"),
        new("logo", "Logo aktarim kuyrugu", "ERP")
    ];

    public Task<IReadOnlyList<ControlCatalogSectionDto>> GetCatalogsAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<ControlCatalogSectionDto> result =
        [
            new("branches", "Sube ve bolge kartlari", "Kullanici yetkisi ve rapor izolasyonu buradan beslenir.", Branches, true),
            new("families", "Urun aileleri", "Sadece kirmizi et degil; beyaz et, islenmis et ve yan urunler ayni modelde izlenir.", ProductFamilies, true),
            new("processes", "Surec kartlari", "Karkastan kasaya kopmayan akisin standart adimlari.", ProcessTypes, true),
            new("documents", "Evrak tipleri", "Entegrasyon yoksa kullanici combodan secerek evrak taslagi uretir.", DocumentTypes, true),
            new("reasons", "Fire, iade ve fark nedenleri", "Elle aciklama yerine standart neden kartlariyla raporlama yapilir.", ReasonCodes, true)
        ];

        return Task.FromResult(result);
    }

    public Task<TraceChainDto> GetTraceabilityAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        var lot = query.Protein == "poultry" ? "LOT-BE-240623-014" : "KARKAS-240623-006";
        var family = ProductFamilies.FirstOrDefault(x => x.Id == query.Protein)?.Label ?? "Tum aileler";

        var result = new TraceChainDto(
            lot,
            family,
            "Karkas/kabul lotundan POS satisina, banka tahsilatina ve Logo fisine kadar sorgulanabilir zincir.",
            [
                new("tr-1", "Karkas kabul", "Kantar + kalite kabul", lot, "1.276 kg", "Tamamlandi", "Merkez Uretim", "23.06 05:42"),
                new("tr-2", "Parcalama", "Randiman ve fire ayrimi", "PARC-240623-006-A", "1.064,6 kg", "Olculuyor", "Uretim", "23.06 06:50"),
                new("tr-3", "Uretim", "Recete sarf / mamul giris", "URT-2026-00108", "812 kg/ad", "Onay bekliyor", "Uretim", "23.06 07:25"),
                new("tr-4", "Sevkiyat", "FEFO + soguk zincir", "SEV-2026-01822", "346 koli", "Yolda", "Lojistik", "23.06 08:40"),
                new("tr-5", "Sube kabul", "Kantar/sayim fark kontrolu", "KAB-2026-00314", "34,5 kg", "Fark incelemede", "Sube", "23.06 09:10"),
                new("tr-6", "POS/fire/iade", "Menu recetesi stok dusumu", "POS-2026-02991", "503 islem", "Tamamlandi", "Sube", "23.06 21:00"),
                new("tr-7", "Banka", "Komisyon ve valor mutabakati", "PRV882311", "185.420,55 TL", "Tam eslesti", "Finans", "24.06"),
                new("tr-8", "Logo", "Onayli evrak kuyrugu", "LOGO-Q-00012", "12 fis", "Kuyrukta", "ERP", "24.06")
            ]);

        return Task.FromResult(result);
    }

    public Task<IReadOnlyList<WorkQueueDto>> GetWorkQueueAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<WorkQueueDto> result =
        [
            new("wq-1", "Operasyon", "Yuksek", "Izmir 08 kabul farki onayi", "Izmir 08", "Kalite", "Bugun 11:00", "Kabul fark evrakini ac ve blokaj/serbest birak karari ver.", "Bekliyor"),
            new("wq-2", "Finans", "Orta", "Ankara 04 yemek karti kesinti farki", "Ankara 04", "Finans", "Bugun 15:00", "Komisyon kuralini sec, fark fisini olustur.", "Incelemede"),
            new("wq-3", "Uretim", "Orta", "Karkas randiman raporu", "Merkez Uretim", "Uretim", "Bugun 12:30", "Parcalama randimanini onayla ve Logo sarf fisini kuyruga al.", "Onay bekliyor")
        ];

        return Task.FromResult(FilterBranch(result, query.BranchId, x => x.Branch));
    }

    public Task<IReadOnlyList<QualityCheckDto>> GetQualityChecksAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<QualityCheckDto> result =
        [
            new("q-1", "KARKAS-240623-006", "Karkas kabul sicaklik", "Kirmizi et", "Merkez Uretim", "2,8 C", "0-4 C", "Uygun", "Kabul"),
            new("q-2", "LOT-KR-240622-077", "Sube kabul sicaklik", "Kirmizi et", "Izmir 08", "5,6 C", "0-4 C", "Uyari", "Blokaj incele"),
            new("q-3", "LOT-BE-240623-014", "Ambalaj butunlugu", "Beyaz et", "Ankara 04", "Uygun", "Hasarsiz", "Uygun", "Serbest"),
            new("q-4", "LOT-IS-240621-033", "SKT kontrol", "Islenmis et", "Antalya 03", "2 gun", ">=3 gun", "Risk", "Fire/iade")
        ];

        return Task.FromResult(FilterBranch(result, query.BranchId, x => x.BranchOrPlant));
    }

    public Task<IReadOnlyList<ReportDefinitionDto>> GetReportsAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<ReportDefinitionDto> result =
        [
            new("waste-analysis", "Fire ve iade analizi", "Sube, urun ailesi, neden ve lot bazinda fire oranlarini karsilastirir.", [new("branch", "Sube"), new("family", "Urun ailesi"), new("reason", "Neden")], [new("branch", "Sube", 100, 150, true, true), new("family", "Aile", 100, 130, true, true), new("reason", "Neden", 140, 190, true, true), new("qty", "Miktar", 90, 110, false, true)]),
            new("yield", "Karkas ve uretim randimani", "Karkas kabul, parcalama ve mamul giris zincirinde randiman izler.", [new("lot", "Lot"), new("process", "Surec")], [new("lot", "Lot", 130, 170, true, true), new("input", "Giren", 90, 110, false, true), new("output", "Cikan", 90, 110, false, true), new("yield", "Randiman", 90, 110, false, true)]),
            new("reconciliation", "POS ve banka mutabakati", "Kasa, banka, komisyon, valor ve Logo aktarim farklarini raporlar.", [new("branch", "Sube"), new("bank", "Banka"), new("channel", "Kanal")], [new("branch", "Sube", 100, 150, true, true), new("bank", "Banka", 120, 160, true, true), new("cash", "Kasa", 100, 130, false, true), new("bankAmount", "Banka", 100, 130, false, true), new("difference", "Fark", 90, 110, false, true)])
        ];

        return Task.FromResult(result);
    }

    public Task<IReadOnlyList<IntegrationQueueDto>> GetIntegrationQueueAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<IntegrationQueueDto> result =
        [
            new("iq-1", "Logo Tiger 3", "SAR-2026-00811", "logo:SAR-2026-00811:merkez", "Bekliyor", "-", ""),
            new("iq-2", "Logo Tiger 3", "POS-2026-02991", "logo:POS-2026-02991:izmir-08", "Aktarildi", "23.06 06:42", ""),
            new("iq-3", "Banka robotu", "PRV441900", "bank:yk:PRV441900", "Tekrar denenecek", "23.06 07:50", "Tutar farki kapatilmayi bekliyor")
        ];

        return Task.FromResult(result);
    }

    private static IReadOnlyList<T> FilterBranch<T>(IReadOnlyList<T> rows, string branchId, Func<T, string> branchSelector)
    {
        if (string.Equals(branchId, "all", StringComparison.OrdinalIgnoreCase))
        {
            return rows;
        }

        var normalized = Normalize(branchId);
        return rows.Where(row => Normalize(branchSelector(row)).Contains(normalized, StringComparison.OrdinalIgnoreCase)).ToArray();
    }

    private static string Normalize(string value)
    {
        return value
            .Replace(" ", "-", StringComparison.OrdinalIgnoreCase)
            .Replace("ı", "i", StringComparison.OrdinalIgnoreCase)
            .Replace("İ", "i", StringComparison.OrdinalIgnoreCase)
            .Replace("ğ", "g", StringComparison.OrdinalIgnoreCase)
            .Replace("Ğ", "g", StringComparison.OrdinalIgnoreCase)
            .Replace("ü", "u", StringComparison.OrdinalIgnoreCase)
            .Replace("Ü", "u", StringComparison.OrdinalIgnoreCase)
            .Replace("ş", "s", StringComparison.OrdinalIgnoreCase)
            .Replace("Ş", "s", StringComparison.OrdinalIgnoreCase)
            .Replace("ö", "o", StringComparison.OrdinalIgnoreCase)
            .Replace("Ö", "o", StringComparison.OrdinalIgnoreCase)
            .Replace("ç", "c", StringComparison.OrdinalIgnoreCase)
            .Replace("Ç", "c", StringComparison.OrdinalIgnoreCase)
            .ToLowerInvariant();
    }
}
