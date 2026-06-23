namespace EtOps360.Contracts.Dashboard;

public sealed record EtOpsQuery(
    string BranchId = "all",
    string Protein = "all",
    string Period = "today",
    string Search = "");

public sealed record SelectOptionDto(
    string Id,
    string Label,
    string? Group = null);

public sealed record UserSessionDto(
    string UserName,
    string Role,
    string ActiveBranchId,
    IReadOnlyList<string> AllowedBranchIds);

public sealed record LoginProfileDto(
    string UserName,
    string DisplayName,
    string Role,
    IReadOnlyList<string> AllowedBranchIds,
    string DefaultBranchId);

public sealed record LoginOptionsDto(
    IReadOnlyList<LoginProfileDto> Profiles,
    IReadOnlyList<SelectOptionDto> Branches);

public sealed record LoginRequestDto(
    string UserName,
    string BranchId);

public sealed record LoginResponseDto(
    string AccessToken,
    UserSessionDto Session,
    EtOpsBootstrapDto Bootstrap,
    string ExpiresAt);

public sealed record EtOpsBootstrapDto(
    UserSessionDto Session,
    IReadOnlyList<SelectOptionDto> Branches,
    IReadOnlyList<SelectOptionDto> ProteinFamilies,
    IReadOnlyList<SelectOptionDto> DocumentTypes,
    IReadOnlyList<SmartColumnDto> OperationColumns);

public sealed record SmartColumnDto(
    string Key,
    string Label,
    int MinWidth,
    int PreferredWidth,
    bool IsGroupable,
    bool IsFilterable);

public sealed record KpiCardDto(
    string Id,
    string Label,
    string Value,
    string Delta,
    string Tone,
    string Hint);

public sealed record JourneyStageDto(
    string Id,
    string Label,
    string Value,
    string Detail,
    string Status);

public sealed record TrendPointDto(
    string Label,
    decimal Sales,
    decimal Waste,
    decimal Yield);

public sealed record AlertDto(
    string Id,
    string Severity,
    string Title,
    string Detail,
    string Owner,
    string ActionLabel);

public sealed record DashboardSummaryDto(
    IReadOnlyList<KpiCardDto> Kpis,
    IReadOnlyList<JourneyStageDto> Journey,
    IReadOnlyList<TrendPointDto> Trends,
    IReadOnlyList<AlertDto> Alerts);

public sealed record OperationRowDto(
    string Id,
    string Branch,
    string Region,
    string Product,
    string Protein,
    string Lot,
    string Process,
    decimal SuggestedQty,
    decimal ApprovedQty,
    decimal ActualSales,
    decimal WasteQty,
    string WasteReason,
    string Status,
    string DocumentNo,
    string UpdatedAt);

public sealed record ReconciliationRowDto(
    string Id,
    string Branch,
    string Bank,
    string Channel,
    string TerminalId,
    string ProvisionNo,
    decimal CashRegisterAmount,
    decimal BankAmount,
    decimal Commission,
    string ValueDate,
    string Status,
    string LogoState);

public sealed record DocumentRowDto(
    string Id,
    string Type,
    string DocumentNo,
    string Source,
    string Branch,
    string Partner,
    string Amount,
    string Status,
    string CreatedAt,
    bool IsGeneratedFromClick);

public sealed record DocumentDetailDto(
    string Id,
    string Title,
    string Status,
    IReadOnlyList<DocumentFieldDto> Fields,
    IReadOnlyList<DocumentLineDto> Lines,
    IReadOnlyList<string> AuditTrail);

public sealed record DocumentFieldDto(
    string Label,
    string Value,
    string Kind);

public sealed record DocumentLineDto(
    string Product,
    string Lot,
    decimal Quantity,
    string Unit,
    decimal Amount);

public sealed record GenerateDocumentRequest(
    string DocumentType,
    string SourceId,
    string BranchId,
    string ReasonCode);

public sealed record GeneratedDocumentDto(
    string Id,
    string DocumentNo,
    string Status,
    string DetailUrl,
    string Message);
