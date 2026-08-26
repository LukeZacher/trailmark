using System.Security.Claims;

namespace TrailMark.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetRequiredUserId(this ClaimsPrincipal principal)
    {
        string userIdFromClaims =
            principal.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException(
                "No user ID claim present on authenticated principal."
            );

        return Guid.TryParse(userIdFromClaims, out Guid userId)
            ? userId
            : throw new InvalidOperationException(
                $"User ID claim '{userIdFromClaims}' is not a valid Guid."
            );
    }
}
