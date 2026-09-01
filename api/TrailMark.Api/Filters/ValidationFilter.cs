using FluentValidation;
using FluentValidation.Results;

namespace TrailMark.Api.Filters;

public sealed class ValidationFilter<T> : IEndpointFilter
    where T : class
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next
    )
    {
        T? model = context.Arguments.OfType<T>().FirstOrDefault();

        if (model is null)
        {
            return Results.Problem("Request model not found.", statusCode: 500);
        }

        ValidationResult result = await _validator.ValidateAsync(model);

        if (!result.IsValid)
        {
            return Results.ValidationProblem(result.ToDictionary());
        }

        return await next(context);
    }
}
