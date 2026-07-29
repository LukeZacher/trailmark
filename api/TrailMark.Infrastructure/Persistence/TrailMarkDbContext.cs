using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TrailMark.Domain.Entities;
using TrailMark.Infrastructure.Persistence.Identity;

namespace TrailMark.Infrastructure.Persistence;

public class TrailMarkDbContext(DbContextOptions<TrailMarkDbContext> options)
    : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<Enum>().HaveConversion<string>().HaveMaxLength(32);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // Identity configures its tables first
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TrailMarkDbContext).Assembly);
    }
}
