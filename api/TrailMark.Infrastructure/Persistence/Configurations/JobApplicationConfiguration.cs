using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TrailMark.Domain.Entities;
using TrailMark.Infrastructure.Persistence.Identity;

namespace TrailMark.Infrastructure.Persistence.Configurations;

public class JobApplicationConfiguration : IEntityTypeConfiguration<JobApplication>
{
    public void Configure(EntityTypeBuilder<JobApplication> builder)
    {
        builder.Property(a => a.JobTitle).HasMaxLength(200);

        builder.Property(a => a.EmployerName).HasMaxLength(200);

        builder.Property(a => a.JobPostingUrl).HasMaxLength(500);

        builder.Property(a => a.Location).HasMaxLength(200);

        builder.Property(a => a.MinSalary).HasPrecision(18, 2);

        builder.Property(a => a.MaxSalary).HasPrecision(18, 2);

        builder.Property(a => a.Notes).HasMaxLength(4000);

        builder.HasIndex(a => a.UserId);

        builder
            .HasOne<AppUser>()
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
