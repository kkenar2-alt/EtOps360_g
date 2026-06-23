using EtOps360.Contracts.Dashboard;

namespace EtOps360.Application.Abstractions;

public interface IEtOpsAuthService
{
    Task<LoginOptionsDto> GetLoginOptionsAsync(CancellationToken cancellationToken);

    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken);
}
