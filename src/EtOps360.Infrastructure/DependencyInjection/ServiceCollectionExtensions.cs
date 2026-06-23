using EtOps360.Application.Abstractions;
using EtOps360.Infrastructure.ReadModels;
using Microsoft.Extensions.DependencyInjection;

namespace EtOps360.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddEtOpsInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IEtOpsReadModel, SeededEtOpsReadModel>();
        services.AddSingleton<IEtOpsAuthService, SeededEtOpsAuthService>();
        services.AddSingleton<IControlTowerReadModel, SeededControlTowerReadModel>();
        return services;
    }
}
