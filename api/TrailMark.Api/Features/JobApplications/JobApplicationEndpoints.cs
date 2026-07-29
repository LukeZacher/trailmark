namespace TrailMark.Api.Features.JobApplications;

public static class JobApplicationEndpoints
{
    public static void MapJobApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/job-application");
    }
}
