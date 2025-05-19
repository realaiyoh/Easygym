using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Easygym.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Easygym.Infrastructure.Repositories
{
    public class WorkoutSessionRepository : GenericRepository<WorkoutSession>, IWorkoutSessionRepository
    {
        private readonly EasygymDbContext _context;

        public WorkoutSessionRepository(EasygymDbContext context) : base(context)
        {
            _context = context;
        }

        public new async Task<IEnumerable<WorkoutSession>> GetAllAsync()
        {
            return await _context.WorkoutSessions
                .Include(ws => ws.Workout!)
                    .ThenInclude(w => w.Sets)
                .ToListAsync();
        }

        public new async Task<WorkoutSession?> GetByIdAsync(int id)
        {
            return await _context.WorkoutSessions
                .Include(ws => ws.Workout!)
                    .ThenInclude(w => w.Sets)
                .FirstOrDefaultAsync(ws => ws.Id == id);
        }
    }
}