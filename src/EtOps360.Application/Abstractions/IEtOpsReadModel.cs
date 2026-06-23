using EtOps360.Contracts.Dashboard;

namespace EtOps360.Application.Abstractions;

public interface IEtOpsReadModel
{
    Task<EtOpsBootstrapDto> GetBootstrapAsync(CancellationToken cancellationToken);

    Task<EtOpsBootstrapDto> GetBootstrapAsync(UserSessionDto session, CancellationToken cancellationToken);

    Task<DashboardSummaryDto> GetDashboardAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<OperationRowDto>> GetOperationsAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<OperationDetailDto?> GetOperationAsync(string id, CancellationToken cancellationToken);

    Task<IReadOnlyList<ReconciliationRowDto>> GetReconciliationAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<DocumentRowDto>> GetDocumentsAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<DocumentDetailDto?> GetDocumentAsync(string id, CancellationToken cancellationToken);

    Task<GeneratedDocumentDto> GenerateDocumentAsync(GenerateDocumentRequest request, CancellationToken cancellationToken);

    Task<IReadOnlyList<CatalogSectionDto>> GetCatalogsAsync(CancellationToken cancellationToken);

    Task<TraceabilityResponseDto> GetTraceabilityAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<WorkQueueItemDto>> GetWorkQueueAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<QualityCheckDto>> GetQualityChecksAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<ReportDefinitionDto>> GetReportDefinitionsAsync(CancellationToken cancellationToken);

    Task<ReportResultDto> GetReportResultAsync(string reportId, EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<IntegrationQueueItemDto>> GetIntegrationQueueAsync(CancellationToken cancellationToken);

    Task<SecurityModelDto> GetSecurityModelAsync(CancellationToken cancellationToken);
}
