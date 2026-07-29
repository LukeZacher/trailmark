using TrailMark.Domain.Entities;

namespace TrailMark.Api.Features.JobApplications;

public static class JobApplicationMappings
{
    public static JobApplicationResponse ToResponse(this JobApplication entity)
    {
        return new JobApplicationResponse
        {
            Id = entity.Id,
            JobTitle = entity.JobTitle,
            EmployerName = entity.EmployerName,
            ApplicationStatus = entity.ApplicationStatus,
            JobPostingUrl = entity.JobPostingUrl,
            AppliedOn = entity.AppliedOn,
            Location = entity.Location,
            WorkEnvironment = entity.WorkEnvironment,
            EmploymentType = entity.EmploymentType,
            SalaryPeriod = entity.SalaryPeriod,
            MinSalary = entity.MinSalary,
            MaxSalary = entity.MaxSalary,
            Notes = entity.Notes,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt,
        };
    }

    public static JobApplication ToEntity(this CreateJobApplicationRequest request, Guid userId)
    {
        return new JobApplication
        {
            UserId = userId,
            JobTitle = request.JobTitle,
            EmployerName = request.EmployerName,
            ApplicationStatus = request.ApplicationStatus,
            JobPostingUrl = request.JobPostingUrl,
            AppliedOn = request.AppliedOn,
            Location = request.Location,
            WorkEnvironment = request.WorkEnvironment,
            EmploymentType = request.EmploymentType,
            SalaryPeriod = request.SalaryPeriod,
            MinSalary = request.MinSalary,
            MaxSalary = request.MaxSalary,
            Notes = request.Notes,
        };
    }
}
