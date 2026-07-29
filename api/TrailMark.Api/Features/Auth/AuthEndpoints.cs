using Microsoft.AspNetCore.Identity;
using TrailMark.Infrastructure.Persistence.Identity;

namespace TrailMark.Api.Features.Auth;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/auth");

        group.MapPost(
            "/register",
            async (RegisterRequest request, UserManager<AppUser> userManager) =>
            {
                AppUser user = new AppUser { UserName = request.Email, Email = request.Email };

                IdentityResult result = await userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                {
                    return Results.BadRequest(result.Errors);
                }

                return Results.Ok();
            }
        );

        group.MapPost(
            "/login",
            async (
                LoginRequest request,
                SignInManager<AppUser> signInManager,
                UserManager<AppUser> userManager
            ) =>
            {
                IResult invalidCredentials = Results.Problem(
                    statusCode: StatusCodes.Status401Unauthorized,
                    detail: "Invalid email or password."
                );

                SignInResult result = await signInManager.PasswordSignInAsync(
                    request.Email,
                    request.Password,
                    false, // isPersistent, wire to a frontend checkbox later
                    true // lockoutOnFailure
                );

                if (result.Succeeded)
                {
                    AppUser? user = await userManager.FindByEmailAsync(request.Email);

                    if (user is null)
                    {
                        return invalidCredentials;
                    }

                    AuthResponse response = user.ToAuthResponse();

                    return Results.Ok(response);
                }

                return invalidCredentials;
            }
        );
    }
}
