using EtOps360.Application.Abstractions;
using EtOps360.Contracts.Dashboard;

namespace EtOps360.Api.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api/auth").WithTags("Auth");

        api.MapGet("/options", async (IEtOpsAuthService authService, CancellationToken cancellationToken) =>
            Results.Ok(await authService.GetLoginOptionsAsync(cancellationToken)))
            .WithName("GetLoginOptions");

        api.MapPost("/login", async (
            LoginRequestDto request,
            IEtOpsAuthService authService,
            CancellationToken cancellationToken) =>
        {
            var result = await authService.LoginAsync(request, cancellationToken);
            return result is null ? Results.Unauthorized() : Results.Ok(result);
        })
        .WithName("Login");

        return app;
    }
}
