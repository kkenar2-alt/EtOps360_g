namespace EtOps360.Domain.Core;

public enum ProteinFamily
{
    RedMeat,
    Poultry,
    ProcessedMeat,
    DairyAndBakery,
    Other
}

public enum DocumentStatus
{
    Draft,
    WaitingApproval,
    Approved,
    PostedToLogo,
    NeedsReview
}

public enum IntegrationState
{
    ManualEntry,
    ApiConnected,
    FileImport,
    RobotCollected,
    Failed
}
