using EtOps360.Application.Abstractions;
using EtOps360.Contracts.Dashboard;
using System.Text;

namespace EtOps360.Infrastructure.ReadModels;

internal sealed class SeededEtOpsAuthService(IEtOpsReadModel readModel) : IEtOpsAuthService
{
    private static readonly IReadOnlyList<SelectOptionDto> Branches =
    [
        new("all", "Tum subeler", "Genel"),
        new("merkez", "Merkez Uretim", "Merkez"),
        new("bursa-12", "Bursa 12", "Marmara"),
        new("ankara-04", "Ankara 04", "Ic Anadolu"),
        new("izmir-08", "Izmir 08", "Ege"),
        new("antalya-03", "Antalya 03", "Akdeniz")
    ];

    private static readonly IReadOnlyList<LoginProfileDto> Profiles =
    [
        new(
            "merkez.planlama",
            "Merkez Planlama",
            "Merkez Planlama",
            ["all", "merkez", "bursa-12", "ankara-04", "izmir-08", "antalya-03"],
            "all"),
        new(
            "bolge.marmara",
            "Marmara Bolge Muduru",
            "Bolge Muduru",
            ["bursa-12"],
            "bursa-12"),
        new(
            "sube.bursa12",
            "Bursa 12 Sube Muduru",
            "Sube Muduru",
            ["bursa-12"],
            "bursa-12"),
        new(
            "finans.pos",
            "POS Mutabakat Uzmani",
            "Finans",
            ["all", "bursa-12", "ankara-04", "izmir-08", "antalya-03"],
            "all"),
        new(
            "kalite.merkez",
            "Merkez Kalite",
            "Kalite",
            ["merkez", "izmir-08", "antalya-03"],
            "merkez")
    ];

    public Task<LoginOptionsDto> GetLoginOptionsAsync(CancellationToken cancellationToken)
    {
        return Task.FromResult(new LoginOptionsDto(Profiles, Branches));
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken)
    {
        var profile = Profiles.FirstOrDefault(x =>
            string.Equals(x.UserName, request.UserName, StringComparison.OrdinalIgnoreCase));

        if (profile is null)
        {
            return null;
        }

        var branchId = string.IsNullOrWhiteSpace(request.BranchId)
            ? profile.DefaultBranchId
            : request.BranchId;

        if (!profile.AllowedBranchIds.Contains(branchId))
        {
            return null;
        }

        var session = new UserSessionDto(
            profile.UserName,
            profile.Role,
            branchId,
            profile.AllowedBranchIds);

        var bootstrap = await readModel.GetBootstrapAsync(session, cancellationToken);
        var tokenBytes = Encoding.UTF8.GetBytes($"{profile.UserName}:{branchId}:{Guid.NewGuid():N}");
        var token = Convert.ToBase64String(tokenBytes);

        return new LoginResponseDto(
            token,
            session,
            bootstrap,
            DateTimeOffset.UtcNow.AddHours(8).ToString("O"));
    }
}
