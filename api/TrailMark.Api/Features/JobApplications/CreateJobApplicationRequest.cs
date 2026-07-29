using TrailMark.Domain.Enums;

namespace TrailMark.Api.Features.JobApplications;

public sealed record CreateJobApplicationRequest
{
    public required string JobTitle { get; init; }
    public required string EmployerName { get; init; }
    public ApplicationStatus ApplicationStatus { get; init; } // e.g., interviewing

    public string? JobPostingUrl { get; init; }
    public DateOnly? AppliedOn { get; init; }
    public string? Location { get; init; }
    public WorkEnvironment? WorkEnvironment { get; init; } // e.g., remote
    public EmploymentType? EmploymentType { get; init; } // e.g., full time
    public SalaryPeriod? SalaryPeriod { get; init; } // e.g., hourly
    public decimal? MinSalary { get; init; }
    public decimal? MaxSalary { get; init; }
    public string? Notes { get; init; }
}
