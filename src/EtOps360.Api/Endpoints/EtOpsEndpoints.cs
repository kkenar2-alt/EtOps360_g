using EtOps360.Application.Abstractions;
using EtOps360.Contracts.Dashboard;

namespace EtOps360.Api.Endpoints;

public static class EtOpsEndpoints
{
    public static IEndpointRouteBuilder MapEtOpsEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").WithTags("EtOps 360");

        api.MapGet("/bootstrap", async (IEtOpsReadModel readModel, CancellationToken cancellationToken) =>
            Results.Ok(await readModel.GetBootstrapAsync(cancellationToken)))
            .WithName("GetBootstrap");

        api.MapGet("/dashboard", async (
            string? branchId,
            string? protein,
            string? period,
            IEtOpsReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today");
            return Results.Ok(await readModel.GetDashboardAsync(query, cancellationToken));
        })
        .WithName("GetDashboard");

        api.MapGet("/operations", async (
            string? branchId,
            string? protein,
            string? period,
            string? search,
            IEtOpsReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today", search ?? "");
            return Results.Ok(await readModel.GetOperationsAsync(query, cancellationToken));
        })
        .WithName("GetOperations");

        api.MapGet("/reconciliation", async (
            string? branchId,
            string? protein,
            string? period,
            IEtOpsReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today");
            return Results.Ok(await readModel.GetReconciliationAsync(query, cancellationToken));
        })
        .WithName("GetReconciliation");

        api.MapGet("/documents", async (
            string? branchId,
            string? protein,
            string? period,
            IEtOpsReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var query = new EtOpsQuery(branchId ?? "all", protein ?? "all", period ?? "today");
            return Results.Ok(await readModel.GetDocumentsAsync(query, cancellationToken));
        })
        .WithName("GetDocuments");

        api.MapGet("/documents/{id}", async (
            string id,
            IEtOpsReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var document = await readModel.GetDocumentAsync(id, cancellationToken);
            return document is null ? Results.NotFound() : Results.Ok(document);
        })
        .WithName("GetDocumentDetail");

        api.MapPost("/documents/generate", async (
            GenerateDocumentRequest request,
            IEtOpsReadModel readModel,
            CancellationToken cancellationToken) =>
        {
            var result = await readModel.GenerateDocumentAsync(request, cancellationToken);
            return Results.Created($"/api/documents/{result.Id}", result);
        })
        .WithName("GenerateDocument");

        return app;
    }
}
