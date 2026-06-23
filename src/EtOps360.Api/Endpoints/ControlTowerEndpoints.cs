using EtOps360.Application.Abstractions;
using EtOps360.Contracts.Dashboard;

namespace EtOps360.Api.Endpoints;

public static class ControlTowerEndpoints
{
    public static IEndpointRouteBuilder MapControlTowerEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api/control").WithTags("Control Tower");

        api.MapGet("/catalogs", async (IControlTowerReadModel readModel, CancellationToken cancellationToken) =>
            Results.Ok(await readModel.GetCatalogsAsync(cancellationToken)));

        api.MapGet("/traceability", async (
            string? branchId,
            string? protein,
            string? period,
            string? search,
            IControlTowerReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today", search ?? "");
            return Results.Ok(await readModel.GetTraceabilityAsync(query, cancellationToken));
        });

        api.MapGet("/work-queue", async (
            string? branchId,
            string? protein,
            string? period,
            IControlTowerReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today");
            return Results.Ok(await readModel.GetWorkQueueAsync(query, cancellationToken));
        });

        api.MapGet("/quality", async (
            string? branchId,
            string? protein,
            string? period,
            IControlTowerReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today");
            return Results.Ok(await readModel.GetQualityChecksAsync(query, cancellationToken));
        });

        api.MapGet("/reports", async (IControlTowerReadModel readModel, CancellationToken cancellationToken) =>
            Results.Ok(await readModel.GetReportsAsync(cancellationToken)));

        api.MapGet("/integration-queue", async (IControlTowerReadModel readModel, CancellationToken cancellationToken) =>
            Results.Ok(await readModel.GetIntegrationQueueAsync(cancellationToken)));

        return app;
    }
}
