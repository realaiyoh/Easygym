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

            // Configure Client, Trainer, and Admin to not use auto-increment IDs
            // Their IDs will be manually set to match the User.Id
            modelBuilder.Entity<Client>()
                .Property(c => c.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Trainer>()
                .Property(t => t.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Admin>()
                .Property(a => a.Id)
                .ValueGeneratedNever();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<WorkoutSession> WorkoutSessions { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}