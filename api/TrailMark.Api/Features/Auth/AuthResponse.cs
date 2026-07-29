namespace TrailMark.Api.Features.Auth;

public sealed record AuthResponse
{
    public required Guid Id { get; init; }
    public required string Email { get; init; }
}
