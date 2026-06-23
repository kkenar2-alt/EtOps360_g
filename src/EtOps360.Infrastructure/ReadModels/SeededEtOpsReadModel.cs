using EtOps360.Application.Abstractions;
using EtOps360.Contracts.Dashboard;

namespace EtOps360.Infrastructure.ReadModels;

internal sealed class SeededEtOpsReadModel : IEtOpsReadModel
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

    private static readonly IReadOnlyList<SelectOptionDto> Proteins =
    [
        new("all", "Tum urun aileleri"),
        new("red-meat", "Kirmizi et"),
        new("poultry", "Beyaz et"),
        new("processed", "Islenmis et"),
        new("bakery-dairy", "Ekmek, sut urunleri ve yan urun")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> DocumentTypes =
    [
        new("branch-order", "Sube siparis evraki"),
        new("waste-slip", "Fire / imha fisi"),
        new("shipment", "Sevkiyat irsaliyesi"),
        new("pos-reconciliation", "POS mutabakat fisi"),
        new("quality-hold", "Kalite blokaj formu"),
        new("manual-purchase", "Manuel tedarik kabul evraki")
    ];

    private static readonly IReadOnlyList<SmartColumnDto> OperationColumns =
    [
        new("branch", "Sube", 120, 160, true, true),
        new("product", "Urun", 160, 220, true, true),
        new("protein", "Aile", 120, 140, true, true),
        new("lot", "Lot", 120, 150, true, true),
        new("process", "Surec", 120, 170, true, true),
        new("suggestedQty", "Oneri kg/ad", 110, 130, false, true),
        new("approvedQty", "Onay kg/ad", 110, 130, false, true),
        new("actualSales", "Satis", 100, 120, false, true),
        new("wasteQty", "Fire", 90, 110, false, true),
        new("wasteReason", "Fire nedeni", 150, 210, true, true),
        new("status", "Durum", 120, 150, true, true),
        new("documentNo", "Evrak", 130, 160, false, true),
        new("updatedAt", "Tarih", 110, 130, false, true)
    ];

    private static readonly IReadOnlyList<OperationRowDto> Operations =
    [
        new("op-1001", "Bursa 12", "Marmara", "Kofte 180 gr", "Kirmizi et", "LOT-KR-240623-001", "Siparis", 72, 70, 68.5m, 1.1m, "Pismis urun bekleme", "Onay bekliyor", "SIP-2026-00041", "23.06 09:15"),
        new("op-1002", "Ankara 04", "Ic Anadolu", "Tavuk sis", "Beyaz et", "LOT-BE-240623-014", "Sevkiyat", 44, 44, 41.8m, 0.4m, "Gramaj sapmasi", "Yolda", "IRS-2026-01822", "23.06 08:40"),
        new("op-1003", "Izmir 08", "Ege", "Doner yaprak", "Kirmizi et", "LOT-KR-240622-077", "Mal kabul", 35, 34.5m, 33.1m, 0.9m, "Soguk zincir uyari", "Fark incelemede", "KAB-2026-00314", "23.06 08:12"),
        new("op-1004", "Antalya 03", "Akdeniz", "Sucuk vakum", "Islenmis et", "LOT-IS-240621-033", "Fire", 18, 18, 15.2m, 1.8m, "SKT yaklasan", "Bolge onayinda", "FIR-2026-00402", "23.06 07:55"),
        new("op-1005", "Bursa 12", "Marmara", "Ayran 300 ml", "Ekmek, sut urunleri ve yan urun", "LOT-SU-240623-009", "Menu recetesi", 160, 156, 151, 0.0m, "Yok", "Tamamlandi", "REC-2026-00092", "23.06 07:20"),
        new("op-1006", "Merkez Uretim", "Merkez", "Karkas dana", "Kirmizi et", "KARKAS-240623-006", "Parcalama", 1280, 1276, 0, 211.4m, "Kemik/yag ayrimi", "Randiman olculuyor", "URT-2026-00108", "23.06 06:50")
    ];

    private static readonly IReadOnlyList<ReconciliationRowDto> Reconciliations =
    [
        new("rec-701", "Bursa 12", "Garanti BBVA", "Fiziki POS", "T-342001", "PRV882311", 185420.55m, 185420.55m, 2218.30m, "24.06.2026", "Tam eslesti", "Logo'ya hazir"),
        new("rec-702", "Ankara 04", "Is Bankasi", "Yemek karti", "YK-11820", "YK77821", 64220.20m, 63110.40m, 1120.75m, "25.06.2026", "Kesinti farki", "Incelemede"),
        new("rec-703", "Izmir 08", "Akbank", "Online siparis", "SANAL-771", "ONL99810", 92880.00m, 92880.00m, 2786.40m, "24.06.2026", "Tam eslesti", "Aktarildi"),
        new("rec-704", "Antalya 03", "Yapi Kredi", "Fiziki POS", "T-987100", "PRV441900", 114200.90m, 113990.90m, 1370.41m, "24.06.2026", "Tutar farki", "Bekliyor")
    ];

    private static readonly IReadOnlyList<DocumentRowDto> Documents =
    [
        new("doc-501", "Sube siparis evraki", "SIP-2026-00041", "Sistem onerisi", "Bursa 12", "Merkez Uretim", "70 kg", "Onay bekliyor", "23.06.2026 09:15", true),
        new("doc-502", "Fire / imha fisi", "FIR-2026-00402", "Manuel giris", "Antalya 03", "Bolge Mudurlugu", "1,8 kg", "Bolge onayinda", "23.06.2026 07:55", false),
        new("doc-503", "POS mutabakat fisi", "POS-2026-02991", "Robot", "Izmir 08", "Akbank", "92.880,00 TL", "Logo'ya aktarildi", "23.06.2026 06:30", true),
        new("doc-504", "Kalite blokaj formu", "KLT-2026-00177", "Laboratuvar", "Merkez Uretim", "Kalite", "LOT-KR-240622-077", "Incelemede", "23.06.2026 06:10", false)
    ];

    public Task<EtOpsBootstrapDto> GetBootstrapAsync(CancellationToken cancellationToken)
    {
        var defaultSession = new UserSessionDto(
            "merkez.planlama",
            "Merkez Planlama",
            "all",
            Branches.Select(x => x.Id).ToArray());

        return GetBootstrapAsync(defaultSession, cancellationToken);
    }

    public Task<EtOpsBootstrapDto> GetBootstrapAsync(UserSessionDto session, CancellationToken cancellationToken)
    {
        var dto = new EtOpsBootstrapDto(
            session,
            Branches.Where(branch => session.AllowedBranchIds.Contains(branch.Id)).ToArray(),
            Proteins,
            DocumentTypes,
            OperationColumns);

        return Task.FromResult(dto);
    }

    public Task<DashboardSummaryDto> GetDashboardAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        var filtered = FilterOperations(query).ToArray();
        var totalSales = filtered.Sum(x => x.ActualSales);
        var totalWaste = filtered.Sum(x => x.WasteQty);
        var yield = totalSales + totalWaste == 0 ? 0 : totalSales / (totalSales + totalWaste) * 100;

        var dto = new DashboardSummaryDto(
            [
                new("sales", "Bugun satisa donusen", $"{totalSales:N1} kg/ad", "+4,8%", "good", "POS, menu recetesi ve sube kabul verisinden"),
                new("waste", "Toplam fire", $"{totalWaste:N1} kg", "-1,2%", "warning", "Uretim, sevkiyat ve sube fireleri dahil"),
                new("yield", "Karkas randimani", $"{yield:N1}%", "+0,6%", "good", "Karkas -> parcalama -> mamul zinciri"),
                new("openRecon", "Acik mutabakat", "2 kalem", "-5", "danger", "Banka, yemek karti ve online odeme farklari")
            ],
            [
                new("carcass", "Karkas kabul", "1.276 kg", "Kantar, kalite ve veteriner kontrolu tamamlandi", "done"),
                new("production", "Parcalama / uretim", "1.064,6 kg", "Kemik/yag/fire ayrimi otomatik raporlandi", "active"),
                new("shipment", "Sube sevkiyati", "346 koli", "FEFO ve soguk zincir kontrolu ile hazirlaniyor", "active"),
                new("pos", "Kasa satisi", "503 islem", "Menu receteleriyle stok dusumu hesaplandi", "done"),
                new("bank", "Banka tahsilati", "3/4 kapanan", "Komisyon, valor ve iade kontrolu suruyor", "review"),
                new("logo", "Logo aktarim", "12 fis", "Onayli kayitlar kuyruga alindi", "ready")
            ],
            [
                new("06:00", 42, 4.8m, 83.4m),
                new("09:00", 88, 6.1m, 86.2m),
                new("12:00", 176, 8.4m, 88.8m),
                new("15:00", 141, 7.2m, 89.1m),
                new("18:00", 216, 10.1m, 90.4m),
                new("21:00", 108, 5.5m, 91.0m)
            ],
            [
                new("a-1", "high", "Izmir 08 soguk zincir sapmasi", "Kabul tartimi ile sevk tartimi arasinda 0,9 kg fark ve sicaklik uyari kaydi var.", "Kalite", "Evraki ac"),
                new("a-2", "medium", "Ankara 04 yemek karti kesinti farki", "Beklenen kesinti ile platform raporu arasinda 1.109,80 TL fark var.", "Finans", "Mutabakata git"),
                new("a-3", "medium", "Antalya 03 SKT kaynakli fire", "Son 30 gun ortalamasinin uzerinde; siparis parametreleri dusurulmeli.", "Bolge", "Siparisi duzenle")
            ]);

        return Task.FromResult(dto);
    }

    public Task<IReadOnlyList<OperationRowDto>> GetOperationsAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        return Task.FromResult<IReadOnlyList<OperationRowDto>>(FilterOperations(query).ToArray());
    }

    public Task<IReadOnlyList<ReconciliationRowDto>> GetReconciliationAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        var rows = Reconciliations.Where(row => IsBranchMatch(row.Branch, query.BranchId)).ToArray();
        return Task.FromResult<IReadOnlyList<ReconciliationRowDto>>(rows);
    }

    public Task<IReadOnlyList<DocumentRowDto>> GetDocumentsAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        var rows = Documents.Where(row => IsBranchMatch(row.Branch, query.BranchId)).ToArray();
        return Task.FromResult<IReadOnlyList<DocumentRowDto>>(rows);
    }

    public Task<DocumentDetailDto?> GetDocumentAsync(string id, CancellationToken cancellationToken)
    {
        var document = Documents.FirstOrDefault(x => string.Equals(x.Id, id, StringComparison.OrdinalIgnoreCase));
        if (document is null)
        {
            return Task.FromResult<DocumentDetailDto?>(null);
        }

        var detail = new DocumentDetailDto(
            document.Id,
            $"{document.Type} - {document.DocumentNo}",
            document.Status,
            [
                new("Sube / Nokta", document.Branch, "combo"),
                new("Kaynak", document.Source, "readonly"),
                new("Partner", document.Partner, "combo"),
                new("Tutar / miktar", document.Amount, "readonly"),
                new("Durum", document.Status, "status")
            ],
            [
                new("Kofte 180 gr", "LOT-KR-240623-001", 70, "kg", 186200),
                new("Ekmek", "LOT-EK-240623-019", 8, "koli", 5400),
                new("Ayran 300 ml", "LOT-SU-240623-009", 12, "koli", 7200)
            ],
            [
                "Sistem onerisi olustu.",
                "Sube muduru miktari 72 kg -> 70 kg olarak revize etti.",
                "Bolge onayi bekliyor.",
                "Logo aktarimi icin idempotency anahtari hazirlandi."
            ]);

        return Task.FromResult<DocumentDetailDto?>(detail);
    }

    public Task<GeneratedDocumentDto> GenerateDocumentAsync(GenerateDocumentRequest request, CancellationToken cancellationToken)
    {
        var prefix = request.DocumentType switch
        {
            "waste-slip" => "FIR",
            "shipment" => "IRS",
            "pos-reconciliation" => "POS",
            "quality-hold" => "KLT",
            "manual-purchase" => "ALK",
            _ => "SIP"
        };

        var id = $"doc-new-{DateTime.UtcNow:HHmmss}";
        var documentNo = $"{prefix}-2026-{Random.Shared.Next(10000, 99999)}";

        var dto = new GeneratedDocumentDto(
            id,
            documentNo,
            "Taslak olustu",
            $"/documents/{id}",
            "Evrak taslagi tiklama ile olusturuldu; detay ekranindan satirlar ve onay akisi acilabilir.");

        return Task.FromResult(dto);
    }

    private static IEnumerable<OperationRowDto> FilterOperations(EtOpsQuery query)
    {
        var rows = Operations.AsEnumerable();

        if (!string.Equals(query.BranchId, "all", StringComparison.OrdinalIgnoreCase))
        {
            rows = rows.Where(row => IsBranchMatch(row.Branch, query.BranchId));
        }

        if (!string.Equals(query.Protein, "all", StringComparison.OrdinalIgnoreCase))
        {
            rows = rows.Where(row => IsProteinMatch(row.Protein, query.Protein));
        }

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            rows = rows.Where(row =>
                row.Branch.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
                row.Product.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
                row.Lot.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
                row.DocumentNo.Contains(query.Search, StringComparison.OrdinalIgnoreCase));
        }

        return rows;
    }

    private static bool IsBranchMatch(string branchLabel, string branchId)
    {
        return string.Equals(branchId, "all", StringComparison.OrdinalIgnoreCase) ||
               Normalize(branchLabel) == Normalize(branchId) ||
               Normalize(branchLabel).Contains(Normalize(branchId), StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsProteinMatch(string proteinLabel, string proteinCode)
    {
        var normalizedLabel = Normalize(proteinLabel);

        return proteinCode switch
        {
            "red-meat" => normalizedLabel.Contains("kirmizi-et", StringComparison.OrdinalIgnoreCase),
            "poultry" => normalizedLabel.Contains("beyaz-et", StringComparison.OrdinalIgnoreCase),
            "processed" => normalizedLabel.Contains("islenmis-et", StringComparison.OrdinalIgnoreCase),
            "bakery-dairy" => normalizedLabel.Contains("ekmek", StringComparison.OrdinalIgnoreCase) ||
                              normalizedLabel.Contains("sut", StringComparison.OrdinalIgnoreCase),
            _ => normalizedLabel.Contains(Normalize(proteinCode), StringComparison.OrdinalIgnoreCase)
        };
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
