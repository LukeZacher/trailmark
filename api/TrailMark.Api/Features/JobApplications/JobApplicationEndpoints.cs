using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TrailMark.Api.Extensions;
using TrailMark.Domain.Entities;
using TrailMark.Infrastructure.Persistence;

namespace TrailMark.Api.Features.JobApplications;

public static class JobApplicationEndpoints
{
    public static void MapJobApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/job-applications").RequireAuthorization();

        group.MapPost(
            "",
            async Task<CreatedAtRoute<JobApplicationResponse>> (
                CreateJobApplicationRequest request,
                ClaimsPrincipal claims,
                TrailMarkDbContext dbContext
            ) =>
            {
                Guid userId = claims.GetRequiredUserId();

                JobApplication jobApplication = request.ToEntity(userId);

                dbContext.JobApplications.Add(jobApplication);

                await dbContext.SaveChangesAsync();

                JobApplicationResponse response = jobApplication.ToResponse();

                return TypedResults.CreatedAtRoute(
                    response,
                    "GetJobApplicationById",
                    new { id = response.Id }
                );
            }
        );

        group
            .MapGet(
                "/{id:int}",
                async Task<Results<Ok<JobApplicationResponse>, NotFound>> (
                    int id,
                    ClaimsPrincipal claims,
                    TrailMarkDbContext dbContext
                ) =>
                {
                    Guid userId = claims.GetRequiredUserId();

                    JobApplication? jobApplication =
                        await dbContext.JobApplications.FirstOrDefaultAsync(ja =>
                            ja.Id == id && ja.UserId == userId
                        );

                    if (jobApplication is null)
                    {
                        return TypedResults.NotFound();
                    }

                    JobApplicationResponse response = jobApplication.ToResponse();

                    return TypedResults.Ok(response);
                }
            )
            .WithName("GetJobApplicationById");

        group.MapGet(
            "",
            async Task<Ok<List<JobApplicationResponse>>> (
                ClaimsPrincipal claims,
                TrailMarkDbContext dbContext
            ) =>
            {
                Guid userId = claims.GetRequiredUserId();

                List<JobApplication> jobApplications = await dbContext
                    .JobApplications.Where(ja => ja.UserId == userId)
                    .OrderByDescending(ja => ja.CreatedAt)
                    .ToListAsync();

                List<JobApplicationResponse> response = jobApplications
                    .Select(ja => ja.ToResponse())
                    .ToList();

                return TypedResults.Ok(response);
            }
        );

        group.MapPut(
            "/{id:int}",
            async Task<Results<Ok<JobApplicationResponse>, NotFound>> (
                int id,
                UpdateJobApplicationRequest request,
                ClaimsPrincipal claims,
                TrailMarkDbContext dbContext
            ) =>
            {
                Guid userId = claims.GetRequiredUserId();

                JobApplication? jobApplication =
                    await dbContext.JobApplications.FirstOrDefaultAsync(ja =>
                        ja.Id == id && ja.UserId == userId
                    );

                if (jobApplication is null)
                {
                    return TypedResults.NotFound();
                }

                jobApplication.JobTitle = request.JobTitle;
                jobApplication.EmployerName = request.EmployerName;
                jobApplication.ApplicationStatus = request.ApplicationStatus;
                jobApplication.JobPostingUrl = request.JobPostingUrl;
                jobApplication.AppliedOn = request.AppliedOn;
                jobApplication.Location = request.Location;
                jobApplication.WorkEnvironment = request.WorkEnvironment;
                jobApplication.EmploymentType = request.EmploymentType;
                jobApplication.SalaryPeriod = request.SalaryPeriod;
                jobApplication.MinSalary = request.MinSalary;
                jobApplication.MaxSalary = request.MaxSalary;
                jobApplication.Notes = request.Notes;

                await dbContext.SaveChangesAsync();

                JobApplicationResponse response = jobApplication.ToResponse();

                return TypedResults.Ok(response);
            }
        );

        group.MapDelete(
            "/{id:int}",
            async Task<Results<NoContent, NotFound>> (
                int id,
                ClaimsPrincipal claims,
                TrailMarkDbContext dbContext
            ) =>
            {
                Guid userId = claims.GetRequiredUserId();

                JobApplication? jobApplication =
                    await dbContext.JobApplications.FirstOrDefaultAsync(ja =>
                        ja.Id == id && ja.UserId == userId
                    );

                if (jobApplication is null)
                {
                    return TypedResults.NotFound();
                }

                dbContext.JobApplications.Remove(jobApplication);

                await dbContext.SaveChangesAsync();

                return TypedResults.NoContent();
            }
        );
    }
}
