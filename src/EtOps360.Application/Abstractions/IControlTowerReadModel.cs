using EtOps360.Contracts.Dashboard;

namespace EtOps360.Application.Abstractions;

public interface IControlTowerReadModel
{
    Task<IReadOnlyList<ControlCatalogSectionDto>> GetCatalogsAsync(CancellationToken cancellationToken);

    Task<TraceChainDto> GetTraceabilityAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<WorkQueueDto>> GetWorkQueueAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<QualityCheckDto>> GetQualityChecksAsync(EtOpsQuery query, CancellationToken cancellationToken);

    Task<IReadOnlyList<ReportDefinitionDto>> GetReportsAsync(CancellationToken cancellationToken);

    Task<IReadOnlyList<IntegrationQueueDto>> GetIntegrationQueueAsync(CancellationToken cancellationToken);
}
