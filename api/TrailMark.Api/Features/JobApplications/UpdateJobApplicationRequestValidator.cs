using FluentValidation;

namespace TrailMark.Api.Features.JobApplications;

public sealed class UpdateJobApplicationRequestValidator
    : AbstractValidator<UpdateJobApplicationRequest>
{
    public UpdateJobApplicationRequestValidator()
    {
        RuleFor(x => x.JobTitle).NotEmpty().MaximumLength(200);

        RuleFor(x => x.EmployerName).NotEmpty().MaximumLength(200);

        RuleFor(x => x.JobPostingUrl).MaximumLength(2000);

        RuleFor(x => x.AppliedOn)
            .InclusiveBetween(
                DateOnly.FromDateTime(DateTime.UtcNow).AddYears(-5),
                DateOnly.FromDateTime(DateTime.UtcNow).AddYears(1)
            )
            .When(x => x.AppliedOn is not null);

        RuleFor(x => x.Location).MaximumLength(200);

        RuleFor(x => x.Notes).MaximumLength(5000);

        RuleFor(x => x.MinSalary).GreaterThanOrEqualTo(0).When(x => x.MinSalary is not null);

        RuleFor(x => x.MaxSalary).GreaterThanOrEqualTo(0).When(x => x.MaxSalary is not null);

        RuleFor(x => x.MaxSalary)
            .GreaterThanOrEqualTo(x => x.MinSalary!.Value)
            .When(x => x.MinSalary is not null && x.MaxSalary is not null);
    }
}
