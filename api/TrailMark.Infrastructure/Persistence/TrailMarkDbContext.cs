using Microsoft.EntityFrameworkCore;
using TrailMark.Domain.Entities;

namespace TrailMark.Infrastructure.Persistence;

public class TrailMarkDbContext(DbContextOptions<TrailMarkDbContext> options) : DbContext(options)
{
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<Enum>().HaveConversion<string>().HaveMaxLength(32);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TrailMarkDbContext).Assembly);
    }
}
