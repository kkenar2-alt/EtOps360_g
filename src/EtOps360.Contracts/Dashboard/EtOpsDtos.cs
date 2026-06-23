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
    IReadOnlyList<string> AllowedBranchIds,
    IReadOnlyList<string>? Permissions = null);

public sealed record LoginProfileDto(
    string UserName,
    string DisplayName,
    string Role,
    IReadOnlyList<string> AllowedBranchIds,
    string DefaultBranchId,
    IReadOnlyList<string>? Permissions = null);

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
    IReadOnlyList<SelectOptionDto> ReasonCodes,
    IReadOnlyList<SelectOptionDto> Units,
    IReadOnlyList<SelectOptionDto> ProcessTypes,
    IReadOnlyList<SelectOptionDto> Partners,
    IReadOnlyList<SelectOptionDto> ProductMasters,
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
    string ActionLabel,
    string? TargetModule = null,
    string? TargetId = null);

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
    string UpdatedAt,
    string TemperatureStatus = "Normal",
    string ApprovalStep = "Bolge onayi");

public sealed record OperationDetailDto(
    string Id,
    string Title,
    IReadOnlyList<DocumentFieldDto> Fields,
    IReadOnlyList<DocumentLineDto> Lines,
    IReadOnlyList<TraceabilityNodeDto> Traceability,
    IReadOnlyList<string> Decisions,
    IReadOnlyList<string> AuditTrail);

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
    string Kind,
    IReadOnlyList<SelectOptionDto>? Options = null);

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
    string ReasonCode,
    string? PartnerId = null,
    string? ProductId = null,
    decimal Quantity = 0,
    string? Unit = null,
    string? Note = null);

public sealed record GeneratedDocumentDto(
    string Id,
    string DocumentNo,
    string Status,
    string DetailUrl,
    string Message);

public sealed record CatalogSectionDto(
    string Id,
    string Title,
    string Description,
    IReadOnlyList<SelectOptionDto> Options,
    bool IsRequiredForOperations = true);

public sealed record TraceabilityNodeDto(
    string Id,
    string Stage,
    string Label,
    string Lot,
    string Quantity,
    string Status,
    string Timestamp,
    string Owner,
    IReadOnlyList<DocumentFieldDto> Facts);

public sealed record TraceabilityResponseDto(
    string MainLot,
    string ProductFamily,
    string Summary,
    IReadOnlyList<TraceabilityNodeDto> Nodes);

public sealed record WorkQueueItemDto(
    string Id,
    string Module,
    string Priority,
    string Title,
    string Branch,
    string OwnerRole,
    string DueText,
    string SuggestedAction,
    string Status);

public sealed record QualityCheckDto(
    string Id,
    string Lot,
    string CheckPoint,
    string Protein,
    string BranchOrPlant,
    string Result,
    string Limit,
    string Status,
    string Action);

public sealed record ReportDefinitionDto(
    string Id,
    string Title,
    string Description,
    IReadOnlyList<SelectOptionDto> GroupOptions,
    IReadOnlyList<SelectOptionDto> FilterOptions,
    IReadOnlyList<SmartColumnDto> Columns);

public sealed record ReportResultDto(
    string Id,
    string Title,
    IReadOnlyList<string> AppliedFilters,
    IReadOnlyList<ReportMetricDto> Metrics,
    IReadOnlyList<Dictionary<string, string>> Rows);

public sealed record ReportMetricDto(
    string Label,
    string Value,
    string Hint,
    string Tone);

public sealed record IntegrationQueueItemDto(
    string Id,
    string TargetSystem,
    string DocumentNo,
    string IdempotencyKey,
    string State,
    string LastAttempt,
    string ErrorMessage);


public sealed record RolePermissionDto(
    string Role,
    string Scope,
    string Description,
    IReadOnlyList<string> Permissions,
    IReadOnlyList<string> DataScopes);

public sealed record BranchAccessDto(
    string BranchId,
    string BranchName,
    string Region,
    string Users,
    string DataIsolation,
    string ApprovalLimit,
    IReadOnlyList<string> Modules);

public sealed record ModuleProgressDto(
    string Module,
    string Status,
    int Done,
    string Remaining,
    string NextCodeArea);

public sealed record SecurityModelDto(
    IReadOnlyList<RolePermissionDto> Roles,
    IReadOnlyList<BranchAccessDto> BranchScopes,
    IReadOnlyList<ModuleProgressDto> ModuleProgress,
    IReadOnlyList<string> GuardRails);
