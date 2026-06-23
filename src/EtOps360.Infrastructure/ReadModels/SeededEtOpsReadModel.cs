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

    private static readonly IReadOnlyList<SelectOptionDto> Units =
    [
        new("kg", "kg"),
        new("piece", "adet"),
        new("box", "koli"),
        new("tray", "tepsi"),
        new("lt", "litre")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> ProcessTypes =
    [
        new("carcass-acceptance", "Karkas kabul", "Uretim"),
        new("cutting", "Parcalama", "Uretim"),
        new("production", "Uretim", "Uretim"),
        new("branch-order", "Sube siparisi", "Satis"),
        new("shipment", "Sevkiyat", "Lojistik"),
        new("branch-receipt", "Sube kabul", "Sube"),
        new("pos-sale", "POS satis", "Satis"),
        new("waste-return", "Fire / iade", "Sube"),
        new("bank-reconciliation", "Banka mutabakati", "Finans"),
        new("logo-transfer", "Logo aktarim", "ERP")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> Partners =
    [
        new("logo", "Logo Tiger 3", "ERP"),
        new("garanti", "Garanti BBVA", "Banka"),
        new("isbank", "Is Bankasi", "Banka"),
        new("akbank", "Akbank", "Banka"),
        new("yk", "Yapi Kredi", "Banka"),
        new("yemek-karti", "Yemek karti platformu", "Odeme"),
        new("online", "Online siparis platformu", "Odeme"),
        new("tedarikci-manuel", "Entegrasyonsuz tedarikci", "Tedarik")
    ];

    private static readonly IReadOnlyList<SelectOptionDto> ProductMasters =
    [
        new("kofte-180", "Kofte 180 gr", "Kirmizi et"),
        new("doner-yaprak", "Doner yaprak", "Kirmizi et"),
        new("tavuk-sis", "Tavuk sis", "Beyaz et"),
        new("tavuk-but", "Tavuk but fileto", "Beyaz et"),
        new("sucuk-vakum", "Sucuk vakum", "Islenmis et"),
        new("balik-fileto", "Balik fileto", "Balik ve deniz urunleri"),
        new("ayran-300", "Ayran 300 ml", "Ekmek, sut urunleri ve yan urun"),
        new("ekmek", "Ekmek", "Ekmek, sut urunleri ve yan urun")
    ];

    private static readonly IReadOnlyList<SmartColumnDto> OperationColumns =
    [
        new("branch", "Sube", 110, 150, true, true),
        new("region", "Bolge", 100, 130, true, true),
        new("product", "Urun", 150, 220, true, true),
        new("protein", "Aile", 115, 140, true, true),
        new("lot", "Lot", 130, 170, true, true),
        new("process", "Surec", 120, 170, true, true),
        new("suggestedQty", "Oneri", 90, 110, false, true),
        new("approvedQty", "Onay", 90, 110, false, true),
        new("actualSales", "Satis", 90, 110, false, true),
        new("wasteQty", "Fire", 80, 100, false, true),
        new("wasteReason", "Fire nedeni", 150, 210, true, true),
        new("temperatureStatus", "Sicaklik", 110, 130, true, true),
        new("approvalStep", "Onay adimi", 130, 160, true, true),
        new("status", "Durum", 120, 150, true, true),
        new("documentNo", "Evrak", 120, 150, false, true),
        new("updatedAt", "Tarih", 105, 120, false, true)
    ];

    private static readonly IReadOnlyList<OperationRowDto> Operations =
    [
        new("op-1001", "Bursa 12", "Marmara", "Kofte 180 gr", "Kirmizi et", "LOT-KR-240623-001", "Sube siparisi", 72, 70, 68.5m, 1.1m, "Pismis urun bekleme", "Onay bekliyor", "SIP-2026-00041", "23.06 09:15", "Normal", "Sube muduru"),
        new("op-1002", "Ankara 04", "Ic Anadolu", "Tavuk sis", "Beyaz et", "LOT-BE-240623-014", "Sevkiyat", 44, 44, 41.8m, 0.4m, "Gramaj sapmasi", "Yolda", "IRS-2026-01822", "23.06 08:40", "Normal", "Lojistik"),
        new("op-1003", "Izmir 08", "Ege", "Doner yaprak", "Kirmizi et", "LOT-KR-240622-077", "Sube kabul", 35, 34.5m, 33.1m, 0.9m, "Soguk zincir uyari", "Fark incelemede", "KAB-2026-00314", "23.06 08:12", "Uyari", "Kalite"),
        new("op-1004", "Antalya 03", "Akdeniz", "Sucuk vakum", "Islenmis et", "LOT-IS-240621-033", "Fire / iade", 18, 18, 15.2m, 1.8m, "SKT yaklasan", "Bolge onayinda", "FIR-2026-00402", "23.06 07:55", "Normal", "Bolge muduru"),
        new("op-1005", "Bursa 12", "Marmara", "Ayran 300 ml", "Ekmek, sut urunleri ve yan urun", "LOT-SU-240623-009", "Menu recetesi", 160, 156, 151, 0.0m, "Yok", "Tamamlandi", "REC-2026-00092", "23.06 07:20", "Normal", "Otomatik"),
        new("op-1006", "Merkez Uretim", "Merkez", "Karkas dana", "Kirmizi et", "KARKAS-240623-006", "Parcalama", 1280, 1276, 0, 211.4m, "Kemik/yag ayrimi", "Randiman olculuyor", "URT-2026-00108", "23.06 06:50", "Normal", "Uretim sorumlusu"),
        new("op-1007", "Merkez Uretim", "Merkez", "Tavuk but fileto", "Beyaz et", "LOT-BE-240623-025", "Uretim", 620, 616, 0, 14.2m, "Trim fire", "Mamul girisi bekliyor", "URT-2026-00111", "23.06 06:35", "Normal", "Uretim sorumlusu"),
        new("op-1008", "Ankara 04", "Ic Anadolu", "Balik fileto", "Balik ve deniz urunleri", "LOT-DU-240623-003", "Sube kabul", 26, 26, 20.4m, 0.2m, "Yok", "Tamamlandi", "KAB-2026-00319", "23.06 06:10", "Normal", "Otomatik")
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
        new("doc-504", "Kalite blokaj formu", "KLT-2026-00177", "Laboratuvar", "Merkez Uretim", "Kalite", "LOT-KR-240622-077", "Incelemede", "23.06.2026 06:10", false),
        new("doc-505", "Uretim sarf fisi", "SAR-2026-00811", "Terazi", "Merkez Uretim", "Logo Tiger 3", "1.064,6 kg", "Kuyrukta", "23.06.2026 06:05", true)
    ];

    public Task<EtOpsBootstrapDto> GetBootstrapAsync(CancellationToken cancellationToken)
    {
        var defaultSession = new UserSessionDto(
            "merkez.planlama",
            "Merkez Planlama",
            "all",
            Branches.Select(x => x.Id).ToArray(),
            ["dashboard:view", "operations:approve", "documents:generate", "reports:view", "catalogs:manage", "integrations:queue", "security:manage", "quality:hold", "reconciliation:close"]);

        return GetBootstrapAsync(defaultSession, cancellationToken);
    }

    public Task<EtOpsBootstrapDto> GetBootstrapAsync(UserSessionDto session, CancellationToken cancellationToken)
    {
        var dto = new EtOpsBootstrapDto(
            session,
            Branches.Where(branch => session.AllowedBranchIds.Contains(branch.Id)).ToArray(),
            Proteins,
            DocumentTypes,
            ReasonCodes,
            Units,
            ProcessTypes,
            Partners,
            ProductMasters,
            OperationColumns);

        return Task.FromResult(dto);
    }

    public Task<DashboardSummaryDto> GetDashboardAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        var filtered = FilterOperations(query).ToArray();
        var totalSales = filtered.Sum(x => x.ActualSales);
        var totalWaste = filtered.Sum(x => x.WasteQty);
        var yield = totalSales + totalWaste == 0 ? 0 : totalSales / (totalSales + totalWaste) * 100;
        var openDocuments = Documents.Count(x => !x.Status.Contains("aktarildi", StringComparison.OrdinalIgnoreCase));
        var openRecon = Reconciliations.Count(x => !x.Status.Contains("Tam", StringComparison.OrdinalIgnoreCase));

        var dto = new DashboardSummaryDto(
            [
                new("sales", "Bugun satisa donusen", $"{totalSales:N1} kg/ad", "+4,8%", "good", "POS, menu recetesi ve sube kabul verisinden"),
                new("waste", "Toplam fire", $"{totalWaste:N1} kg", "-1,2%", "warning", "Uretim, sevkiyat ve sube fireleri dahil"),
                new("yield", "Karkas randimani", $"{yield:N1}%", "+0,6%", "good", "Karkas -> parcalama -> mamul zinciri"),
                new("openRecon", "Acik mutabakat", $"{openRecon} kalem", "-5", "danger", "Banka, yemek karti ve online odeme farklari"),
                new("documents", "Onay bekleyen evrak", $"{openDocuments} adet", "+3", "warning", "Manuel ve robot uretimli taslaklar")
            ],
            [
                new("carcass", "Karkas kabul", "1.276 kg", "Kantar, kalite ve veteriner kontrolu tamamlandi", "done"),
                new("cutting", "Parcalama", "1.064,6 kg", "Kemik/yag/fire ayrimi otomatik raporlandi", "active"),
                new("production", "Uretim", "812 kg/ad", "Recete sarf ve mamul girisleri bekleyen onaylarla olustu", "active"),
                new("shipment", "Sube sevkiyati", "346 koli", "FEFO ve soguk zincir kontrolu ile hazirlaniyor", "active"),
                new("branch", "Sube kabul", "4 fark", "Kantar, sayim ve sicaklik farklari inceleniyor", "review"),
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
                new("a-1", "high", "Izmir 08 soguk zincir sapmasi", "Kabul tartimi ile sevk tartimi arasinda 0,9 kg fark ve sicaklik uyari kaydi var.", "Kalite", "Evraki ac", "quality", "doc-504"),
                new("a-2", "medium", "Ankara 04 yemek karti kesinti farki", "Beklenen kesinti ile platform raporu arasinda 1.109,80 TL fark var.", "Finans", "Mutabakata git", "reconciliation", "rec-702"),
                new("a-3", "medium", "Antalya 03 SKT kaynakli fire", "Son 30 gun ortalamasinin uzerinde; siparis parametreleri dusurulmeli.", "Bolge", "Siparisi duzenle", "operations", "op-1004")
            ]);

        return Task.FromResult(dto);
    }

    public Task<IReadOnlyList<OperationRowDto>> GetOperationsAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        return Task.FromResult<IReadOnlyList<OperationRowDto>>(FilterOperations(query).ToArray());
    }

    public Task<OperationDetailDto?> GetOperationAsync(string id, CancellationToken cancellationToken)
    {
        var row = Operations.FirstOrDefault(x => string.Equals(x.Id, id, StringComparison.OrdinalIgnoreCase));
        if (row is null)
        {
            return Task.FromResult<OperationDetailDto?>(null);
        }

        var detail = new OperationDetailDto(
            row.Id,
            $"{row.Process} - {row.Product}",
            [
                new("Sube", row.Branch, "combo", Branches),
                new("Bolge", row.Region, "readonly"),
                new("Urun ailesi", row.Protein, "combo", Proteins),
                new("Lot", row.Lot, "readonly"),
                new("Onay adimi", row.ApprovalStep, "combo"),
                new("Sicaklik", row.TemperatureStatus, "status")
            ],
            [
                new(row.Product, row.Lot, row.ApprovedQty, row.Protein.Contains("Ekmek", StringComparison.OrdinalIgnoreCase) ? "adet" : "kg", row.ApprovedQty * 2660),
                new("Evrak fark satiri", row.Lot, row.WasteQty, "kg", row.WasteQty * 540)
            ],
            CreateTraceabilityNodes(row.Lot),
            [
                "Oneri miktari onceki 8 haftalik satis, hava durumu ve fire egilimine gore hesaplanir.",
                "Onay miktari sube ve bolge yetkisine gore revize edilebilir.",
                "Logo aktariminda sourceSystem/sourceId/idempotencyKey zorunlu tutulur."
            ],
            [
                "Kayit sistem onerisi olarak olustu.",
                "Satir detaylari kullanici yetkisine gore acildi.",
                "Audit hash olusturuldu ve silinemez iz kaydina eklendi."
            ]);

        return Task.FromResult<OperationDetailDto?>(detail);
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
                new("Sube / Nokta", document.Branch, "combo", Branches),
                new("Kaynak", document.Source, "readonly"),
                new("Partner", document.Partner, "combo", Partners),
                new("Tutar / miktar", document.Amount, "readonly"),
                new("Durum", document.Status, "status"),
                new("Logo aktarim", document.Status.Contains("aktarildi", StringComparison.OrdinalIgnoreCase) ? "Aktarildi" : "Taslak / kuyruk", "status")
            ],
            [
                new("Kofte 180 gr", "LOT-KR-240623-001", 70, "kg", 186200),
                new("Ekmek", "LOT-EK-240623-019", 8, "koli", 5400),
                new("Ayran 300 ml", "LOT-SU-240623-009", 12, "koli", 7200)
            ],
            [
                "Sistem onerisi olustu.",
                "Kullanici combodan sube, partner ve evrak nedenini secti.",
                "Satirlar lot ve tutar detayiyla olusturuldu.",
                "Logo aktarimi icin idempotency anahtari hazirlandi."
            ]);

        return Task.FromResult<DocumentDetailDto?>(detail);
    }

    public Task<GeneratedDocumentDto> GenerateDocumentAsync(GenerateDocumentRequest request, CancellationToken cancellationToken)
    {
        var prefix = request.DocumentType switch
        {
            "waste-slip" => "FIR",
            "return-slip" => "IAD",
            "shipment" => "IRS",
            "production-consumption" => "SAR",
            "production-receipt" => "MAM",
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
            $"Evrak taslagi tiklama ile olusturuldu; urun={request.ProductId ?? "secili degil"}, miktar={request.Quantity:N2} {request.Unit ?? ""}. Detay ekranindan satirlar, lotlar, tutarlar ve onay akisi acilabilir.");

        return Task.FromResult(dto);
    }

    public Task<IReadOnlyList<CatalogSectionDto>> GetCatalogsAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<CatalogSectionDto> catalogs =
        [
            new("branches", "Sube ve bolge kartlari", "Sube kullanicisi sadece yetkili oldugu sube/bolge verisini gorur.", Branches, true),
            new("proteins", "Urun aileleri", "Kirmizi et, beyaz et, islenmis et ve yan urunler ayni modelde izlenir.", Proteins, true),
            new("processes", "Surec kartlari", "Karkas kabulden Logo aktarimina kadar standart akisi belirler.", ProcessTypes, true),
            new("documents", "Evrak tipleri", "Entegrasyon yoksa combodan secimle taslak evrak uretir.", DocumentTypes, true),
            new("reasons", "Fire, iade ve fark nedenleri", "Elle aciklama yerine standart neden kartlariyla raporlanir.", ReasonCodes, true),
            new("products", "Urun ve stok kartlari", "Kirmizi et, beyaz et, islenmis et, balik ve yan urunler ayni katalogdan secilir.", ProductMasters, true),
            new("partners", "Entegrasyon partnerleri", "Logo, banka, yemek karti, online platform ve manuel tedarikci kartlari.", Partners, false),
            new("units", "Birimler", "kg, adet, koli, tepsi ve litre donusumleri icin temel liste.", Units, true)
        ];

        return Task.FromResult(catalogs);
    }

    public Task<TraceabilityResponseDto> GetTraceabilityAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        var lot = string.Equals(query.Protein, "poultry", StringComparison.OrdinalIgnoreCase) ? "LOT-BE-240623-014" : "KARKAS-240623-006";
        var family = Proteins.FirstOrDefault(x => x.Id == query.Protein)?.Label ?? "Tum aileler";
        var dto = new TraceabilityResponseDto(
            lot,
            family,
            "Karkas lotu, parcalama, uretim partisi, sevkiyat, sube kabul, POS satisi, banka tahsilati ve Logo aktarimi ayni zincirde izlenir.",
            CreateTraceabilityNodes(lot));

        return Task.FromResult(dto);
    }

    public Task<IReadOnlyList<WorkQueueItemDto>> GetWorkQueueAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<WorkQueueItemDto> rows =
        [
            new("wq-1", "Operasyon", "Yuksek", "Izmir 08 kabul farki onayi", "Izmir 08", "Kalite", "Bugun 11:00", "Kabul fark evrakini ac ve blokaj/serbest birak karari ver.", "Bekliyor"),
            new("wq-2", "Finans", "Orta", "Ankara 04 yemek karti kesinti farki", "Ankara 04", "Finans", "Bugun 15:00", "Komisyon kuralini sec, fark fisini olustur.", "Incelemede"),
            new("wq-3", "Uretim", "Orta", "Karkas randiman raporu", "Merkez Uretim", "Uretim", "Bugun 12:30", "Parcalama randimanini onayla ve Logo sarf fisini kuyruga al.", "Onay bekliyor"),
            new("wq-4", "Sube", "Dusuk", "Antalya 03 SKT fire parametresi", "Antalya 03", "Bolge", "Yarin", "Siparis alt/ust limitini revize et.", "Planlandi")
        ];

        var filtered = rows.Where(row => IsBranchMatch(row.Branch, query.BranchId)).ToArray();
        return Task.FromResult<IReadOnlyList<WorkQueueItemDto>>(filtered);
    }

    public Task<IReadOnlyList<QualityCheckDto>> GetQualityChecksAsync(EtOpsQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<QualityCheckDto> rows =
        [
            new("q-1", "KARKAS-240623-006", "Karkas kabul sicaklik", "Kirmizi et", "Merkez Uretim", "2,8 C", "0-4 C", "Uygun", "Kabul"),
            new("q-2", "LOT-KR-240622-077", "Sube kabul sicaklik", "Kirmizi et", "Izmir 08", "5,6 C", "0-4 C", "Uyari", "Blokaj incele"),
            new("q-3", "LOT-BE-240623-014", "Ambalaj butunlugu", "Beyaz et", "Ankara 04", "Uygun", "Hasarsiz", "Uygun", "Serbest"),
            new("q-4", "LOT-IS-240621-033", "SKT kontrol", "Islenmis et", "Antalya 03", "2 gun", ">=3 gun", "Risk", "Fire/iade")
        ];

        var filtered = rows.Where(row => IsBranchMatch(row.BranchOrPlant, query.BranchId) && IsProteinMatch(row.Protein, query.Protein)).ToArray();
        return Task.FromResult<IReadOnlyList<QualityCheckDto>>(filtered);
    }

    public Task<IReadOnlyList<ReportDefinitionDto>> GetReportDefinitionsAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<ReportDefinitionDto> definitions =
        [
            new("waste-analysis", "Fire ve iade analizi", "Sube, urun ailesi, neden ve lot bazinda fire oranlarini karsilastirir.", [new("branch", "Sube"), new("protein", "Urun ailesi"), new("wasteReason", "Fire nedeni")], ReasonCodes, [new("branch", "Sube", 100, 150, true, true), new("protein", "Aile", 100, 130, true, true), new("wasteReason", "Neden", 140, 190, true, true), new("wasteQty", "Fire kg", 90, 110, false, true), new("rate", "Oran", 80, 100, false, true)]),
            new("yield", "Karkas ve uretim randimani", "Karkas kabul, parcalama ve mamul giris zincirinde randiman izler.", [new("lot", "Lot"), new("process", "Surec")], ProcessTypes, [new("lot", "Lot", 130, 170, true, true), new("input", "Giren", 90, 110, false, true), new("output", "Cikan", 90, 110, false, true), new("waste", "Fire", 80, 100, false, true), new("yield", "Randiman", 90, 110, false, true)]),
            new("reconciliation", "POS ve banka mutabakati", "Kasa, banka, komisyon, valor ve Logo aktarim farklarini raporlar.", [new("branch", "Sube"), new("bank", "Banka"), new("channel", "Kanal")], Partners, [new("branch", "Sube", 100, 150, true, true), new("bank", "Banka", 120, 160, true, true), new("cashRegisterAmount", "Kasa", 100, 130, false, true), new("bankAmount", "Banka", 100, 130, false, true), new("difference", "Fark", 90, 110, false, true), new("status", "Durum", 100, 140, true, true)])
        ];

        return Task.FromResult(definitions);
    }

    public Task<ReportResultDto> GetReportResultAsync(string reportId, EtOpsQuery query, CancellationToken cancellationToken)
    {
        var rows = reportId switch
        {
            "yield" => new[]
            {
                Row(("lot", "KARKAS-240623-006"), ("input", "1.276 kg"), ("output", "1.064,6 kg"), ("waste", "211,4 kg"), ("yield", "%83,4")),
                Row(("lot", "LOT-BE-240623-025"), ("input", "620 kg"), ("output", "605,8 kg"), ("waste", "14,2 kg"), ("yield", "%97,7"))
            },
            "reconciliation" => Reconciliations.Select(row => Row(("branch", row.Branch), ("bank", row.Bank), ("cashRegisterAmount", row.CashRegisterAmount.ToString("N2")), ("bankAmount", row.BankAmount.ToString("N2")), ("difference", (row.BankAmount - row.CashRegisterAmount).ToString("N2")), ("status", row.Status))).ToArray(),
            _ => Operations.Select(row => Row(("branch", row.Branch), ("protein", row.Protein), ("wasteReason", row.WasteReason), ("wasteQty", row.WasteQty.ToString("N1")), ("rate", row.ActualSales + row.WasteQty == 0 ? "%0" : $"%{row.WasteQty / (row.ActualSales + row.WasteQty) * 100:N1}"))).ToArray()
        };

        var dto = new ReportResultDto(
            reportId,
            reportId switch
            {
                "yield" => "Karkas ve uretim randimani",
                "reconciliation" => "POS ve banka mutabakati",
                _ => "Fire ve iade analizi"
            },
            [$"Sube: {query.BranchId}", $"Aile: {query.Protein}", $"Donem: {query.Period}"],
            [
                new("Kayit", rows.Length.ToString("N0"), "Filtreye giren satir", "neutral"),
                new("Acik aksiyon", "3", "Onay veya fark kapama bekliyor", "warning"),
                new("Logo kuyrugu", "12", "Idempotency ile bekleyen aktarim", "good")
            ],
            rows);

        return Task.FromResult(dto);
    }

    public Task<IReadOnlyList<IntegrationQueueItemDto>> GetIntegrationQueueAsync(CancellationToken cancellationToken)
    {
        IReadOnlyList<IntegrationQueueItemDto> rows =
        [
            new("iq-1", "Logo Tiger 3", "SAR-2026-00811", "logo:SAR-2026-00811:merkez", "Bekliyor", "-", ""),
            new("iq-2", "Logo Tiger 3", "POS-2026-02991", "logo:POS-2026-02991:izmir-08", "Aktarildi", "23.06 06:42", ""),
            new("iq-3", "Banka robotu", "PRV441900", "bank:yk:PRV441900", "Tekrar denenecek", "23.06 07:50", "Tutar farki kapatilmayi bekliyor")
        ];

        return Task.FromResult(rows);
    }

    public Task<SecurityModelDto> GetSecurityModelAsync(CancellationToken cancellationToken)
    {
        var roles = new List<RolePermissionDto>
        {
            new("Merkez Planlama", "Tum zincir", "Genel katalog, operasyon, evrak, Logo kuyrugu ve rapor yonetimi.", ["dashboard:view", "operations:approve", "documents:generate", "reports:view", "catalogs:manage", "integrations:queue", "security:manage"], ["all", "merkez", "bolge", "sube"]),
            new("Bolge Muduru", "Bolge subeleri", "Sube siparis, fire/iade ve bolge onaylari.", ["dashboard:view", "operations:approve", "documents:generate", "reports:view"], ["bolge", "sube"]),
            new("Sube Muduru", "Kendi subesi", "Sadece kendi subesinin siparis, fire, iade ve evrak girisi.", ["dashboard:view", "documents:generate"], ["sube"]),
            new("Finans", "Odeme ve mutabakat", "POS, banka, yemek karti, online odeme ve Logo muhasebe kuyrugu.", ["dashboard:view", "reconciliation:close", "documents:generate", "integrations:queue"], ["finans", "sube"]),
            new("Kalite", "Lot ve blokaj", "HACCP/CCP/OPRP, numune, DÖF/CAPA ve geri cagirma simülasyonu.", ["dashboard:view", "quality:hold", "documents:generate", "reports:view"], ["merkez", "sube", "lot"])
        };

        var branchScopes = Branches.Where(branch => branch.Id != "all").Select(branch => new BranchAccessDto(
            branch.Id,
            branch.Label,
            branch.Group ?? "Genel",
            branch.Id == "merkez" ? "Planlama, uretim, kalite, depo" : "Sube muduru, bolge, finans",
            branch.Id == "merkez" ? "Uretim ve lot bazli" : "Sadece kendi sube verisi",
            branch.Id == "merkez" ? "Sinirsiz / iki onay" : "Fire > %2 ve fark > 1 kg bolge onayi",
            branch.Id == "merkez"
                ? ["Karkas", "Uretim", "WMS", "Kalite", "Logo"]
                : ["Siparis", "Kabul", "Fire/Iade", "POS", "Mutabakat"]
        )).ToArray();

        IReadOnlyList<ModuleProgressDto> progress =
        [
            new("Cekirdek operasyon", "Kodlandi", 72, "SQL kalici veri ve onay aksiyonlari", "Application/Operations"),
            new("Karkas - uretim - randiman", "Kodlandi", 48, "Terazi adaptoru ve gercek lot hareketleri", "Infrastructure/Scales"),
            new("WMS ve soguk zincir", "Taslak tamam", 36, "FEFO motoru ve sensor import", "Application/Wms"),
            new("POS ve banka mutabakati", "Taslak tamam", 42, "Banka dosya parser ve kapama robotu", "Application/Reconciliation"),
            new("Kalite ve zeka", "Taslak tamam", 34, "CAPA, anomali ve tahmin modelleri", "Application/Quality"),
            new("Yetki ve audit", "Kodlandi", 55, "JWT, object-level authorization, SQL audit", "Api/Security")
        ];

        IReadOnlyList<string> guardRails =
        [
            "Logo Tiger 3 veritabanina kontrolsuz insert/update yok; onayli taslak + outbox + idempotency zorunlu.",
            "Kart PAN/CVV saklanmaz; banka mutabakati sadece provizyon, terminal, tutar ve komisyon verisi tutar.",
            "Her hareket sourceSystem, sourceId, idempotencyKey, branchId, lotId, createdBy, approvedBy ve auditHash tasir.",
            "Sube kullanicisi sadece kendi subesinin evrak ve hareketlerini gorur; merkez/bolge rolleri veri kapsami ile sinirlanir.",
            "Silme yerine pasifleştirme ve audit trail kullanilir; denetim izi kullanici ekranindan kaldirilamaz."
        ];

        return Task.FromResult(new SecurityModelDto(roles, branchScopes, progress, guardRails));
    }

    private static IReadOnlyList<TraceabilityNodeDto> CreateTraceabilityNodes(string lot)
    {
        return
        [
            new("tr-1", "Karkas kabul", "Kantar + kalite kabul", lot.StartsWith("LOT-BE", StringComparison.OrdinalIgnoreCase) ? "CANLI-BE-240623-014" : "KARKAS-240623-006", "1.276 kg", "Tamamlandi", "23.06 05:42", "Merkez Uretim", [new("Sicaklik", "2,8 C", "readonly"), new("Tedarikci", "Entegrasyonsuz tedarikci", "combo", Partners)]),
            new("tr-2", "Parcalama", "Randiman ve fire ayrimi", "PARC-240623-006-A", "1.064,6 kg", "Olculuyor", "23.06 06:50", "Uretim", [new("Kemik/yag", "211,4 kg", "readonly"), new("Randiman", "%83,4", "status")]),
            new("tr-3", "Uretim partisi", "Recete sarf / mamul giris", "URT-2026-00108", "812 kg/ad", "Onay bekliyor", "23.06 07:25", "Uretim", [new("Recete", "Menu ve porsiyon recetesi", "combo")]),
            new("tr-4", "Sevkiyat", "FEFO + soguk zincir", "SEV-2026-01822", "346 koli", "Yolda", "23.06 08:40", "Lojistik", [new("Arac sicaklik", "3,1 C", "readonly")]),
            new("tr-5", "Sube kabul", "Kantar/sayim fark kontrolu", "KAB-2026-00314", "34,5 kg", "Fark incelemede", "23.06 08:12", "Sube", [new("Fark", "0,9 kg", "status")]),
            new("tr-6", "POS satis / fire", "Menu recetesi stok dusumu", "POS-2026-02991", "503 islem", "Tamamlandi", "23.06 21:00", "Sube", [new("Fire nedeni", "Pismis urun bekleme", "combo", ReasonCodes)]),
            new("tr-7", "Banka tahsilati", "Komisyon ve valor mutabakati", "PRV882311", "185.420,55 TL", "Tam eslesti", "24.06", "Finans", [new("Komisyon", "2.218,30 TL", "readonly")]),
            new("tr-8", "Logo aktarim", "Onayli evrak kuyrugu", "LOGO-Q-00012", "12 fis", "Kuyrukta", "24.06", "ERP", [new("Idempotency", "source+evrak+sube", "readonly")])
        ];
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
                row.Region.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
                row.Product.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
                row.Protein.Contains(query.Search, StringComparison.OrdinalIgnoreCase) ||
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
        if (string.Equals(proteinCode, "all", StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }

        var normalizedLabel = Normalize(proteinLabel);

        return proteinCode switch
        {
            "red-meat" => normalizedLabel.Contains("kirmizi-et", StringComparison.OrdinalIgnoreCase),
            "poultry" => normalizedLabel.Contains("beyaz-et", StringComparison.OrdinalIgnoreCase),
            "processed" => normalizedLabel.Contains("islenmis-et", StringComparison.OrdinalIgnoreCase),
            "bakery-dairy" => normalizedLabel.Contains("ekmek", StringComparison.OrdinalIgnoreCase) ||
                              normalizedLabel.Contains("sut", StringComparison.OrdinalIgnoreCase),
            "seafood" => normalizedLabel.Contains("balik", StringComparison.OrdinalIgnoreCase) ||
                         normalizedLabel.Contains("deniz", StringComparison.OrdinalIgnoreCase),
            _ => normalizedLabel.Contains(Normalize(proteinCode), StringComparison.OrdinalIgnoreCase)
        };
    }

    private static Dictionary<string, string> Row(params (string Key, string Value)[] values)
    {
        return values.ToDictionary(x => x.Key, x => x.Value);
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
