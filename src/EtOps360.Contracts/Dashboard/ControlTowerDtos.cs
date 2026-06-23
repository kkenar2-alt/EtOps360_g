namespace EtOps360.Contracts.Dashboard;

public sealed record ControlCatalogSectionDto(
    string Id,
    string Title,
    string Description,
    IReadOnlyList<SelectOptionDto> Options,
    bool RequiredForOperation);

public sealed record TraceNodeDto(
    string Id,
    string Stage,
    string Label,
    string Lot,
    string Quantity,
    string Status,
    string Owner,
    string Timestamp);

public sealed record TraceChainDto(
    string MainLot,
    string Family,
    string Summary,
    IReadOnlyList<TraceNodeDto> Nodes);

public sealed record WorkQueueDto(
    string Id,
    string Module,
    string Priority,
    string Title,
    string Branch,
    string OwnerRole,
    string DueText,
    string Action,
    string Status);

public sealed record QualityCheckDto(
    string Id,
    string Lot,
    string CheckPoint,
    string ProductFamily,
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
    IReadOnlyList<SmartColumnDto> Columns);

public sealed record IntegrationQueueDto(
    string Id,
    string TargetSystem,
    string DocumentNo,
    string IdempotencyKey,
    string State,
    string LastAttempt,
    string ErrorMessage);
