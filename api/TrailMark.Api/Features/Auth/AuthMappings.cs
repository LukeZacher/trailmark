using TrailMark.Infrastructure.Persistence.Identity;

namespace TrailMark.Api.Features.Auth;

public static class AuthMappings
{
    public static AuthResponse ToAuthResponse(this AppUser user)
    {
        return new AuthResponse { Id = user.Id, Email = user.Email! };
    }
}
