using TrailMark.Domain.Enums;

namespace TrailMark.Domain.Entities;

public class JobApplication
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string JobTitle { get; set; }
    public required string EmployerName { get; set; }
    public ApplicationStatus ApplicationStatus { get; set; } // e.g., interviewing

    public string? JobPostingUrl { get; set; }
    public DateOnly? AppliedOn { get; set; }
    public string? Location { get; set; }
    public WorkEnvironment? WorkEnvironment { get; set; } // e.g., remote
    public EmploymentType? EmploymentType { get; set; } // e.g., full time
    public SalaryPeriod? SalaryPeriod { get; set; } // e.g., hourly
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public string? Notes { get; set; }

    public DateTimeOffset CreatedOn { get; set; }
    public DateTimeOffset ModifiedOn { get; set; }
}
