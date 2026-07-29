using System.ComponentModel.DataAnnotations;

namespace TrailMark.Api.Features.Auth;

public sealed record RegisterRequest
{
    [EmailAddress]
    public required string Email { get; init; }
    public required string Password { get; init; }
}
