using Easygym.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Easygym.Infrastructure.Persistence
{
    public class EasygymDbContext : DbContext
    {
        public EasygymDbContext(DbContextOptions<EasygymDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<WorkoutSession> WorkoutSessions { get; set; }
    }
}