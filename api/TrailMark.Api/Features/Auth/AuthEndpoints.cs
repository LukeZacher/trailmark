using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using TrailMark.Api.Filters;
using TrailMark.Infrastructure.Persistence.Identity;

namespace TrailMark.Api.Features.Auth;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder group = app.MapGroup("/auth");

        group
            .MapPost(
                "/register",
                async Task<Results<Ok<AuthResponse>, ValidationProblem>> (
                    RegisterRequest request,
                    UserManager<AppUser> userManager,
                    SignInManager<AppUser> signInManager
                ) =>
                {
                    AppUser user = new AppUser { UserName = request.Email, Email = request.Email };

                    IdentityResult result = await userManager.CreateAsync(user, request.Password);

                    if (!result.Succeeded)
                    {
                        Dictionary<string, string[]> errors = result
                            .Errors.Where(error => error.Code != "DuplicateUserName") // Temp fix for duplicate email/username already taken error responses
                            .GroupBy(error =>
                                error.Code.StartsWith("Password", StringComparison.Ordinal)
                                    ? "Password"
                                    : "Email"
                            )
                            .ToDictionary(
                                group => group.Key,
                                group => group.Select(error => error.Description).ToArray()
                            );
                        return TypedResults.ValidationProblem(errors);
                    }

                    await signInManager.SignInAsync(user, isPersistent: false);

                    return TypedResults.Ok(user.ToAuthResponse());
                }
            )
            .AddEndpointFilter<ValidationFilter<RegisterRequest>>();

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

        group.MapPost(
            "/logout",
            async Task<NoContent> (SignInManager<AppUser> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return TypedResults.NoContent();
            }
        );

        group
            .MapGet(
                "/me",
                async (ClaimsPrincipal claims, UserManager<AppUser> userManager) =>
                {
                    AppUser? user = await userManager.GetUserAsync(claims);

                    if (user is null)
                    {
                        return Results.Problem(
                            statusCode: StatusCodes.Status401Unauthorized,
                            detail: "Could not find user."
                        );
                    }

                    AuthResponse response = user.ToAuthResponse();

                    return Results.Ok(response);
                }
            )
            .RequireAuthorization();
    }
}
