namespace TrailMark.Api.Features.JobApplications;

public static class JobApplicationRules
{
    public static bool BeAValidUrl(string? url)
    {
        if (url is null)
        {
            return true;
        }

        return Uri.TryCreate(url, UriKind.Absolute, out Uri? uri)
            && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
    }

    public static bool BeWithinAppliedOnWindow(DateOnly? date)
    {
        if (date is null)
        {
            return true;
        }

        DateOnly currentDateUtc = DateOnly.FromDateTime(DateTime.UtcNow);

        return date >= currentDateUtc.AddYears(-5) && date <= currentDateUtc.AddYears(1);
    }
}
