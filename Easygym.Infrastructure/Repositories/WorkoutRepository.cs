using Easygym.Domain.Entities;
using Easygym.Domain.Exceptions;
using Easygym.Domain.Interfaces;
using Easygym.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Easygym.Infrastructure.Repositories
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly EasygymDbContext _context;

        public WorkoutRepository(EasygymDbContext context)
        {
            _context = context;
        }

        public async Task<List<Workout>> GetWorkoutsForTraineeAsync(int traineeId)
        {
            return await _context.Workouts
            .Include(w => w.Sets)
            .Where(w => w.TraineeId == traineeId)
            .ToListAsync();
        }

        public async Task<Workout> GetWorkoutForTraineeAsync(int workoutId, int traineeId)
        {
            return await _context.Workouts
            .Include(w => w.Sets)
            .FirstOrDefaultAsync(w => w.Id == workoutId && w.TraineeId == traineeId) ?? throw new WorkoutNotFoundException();
        }

        public async Task<Workout> GetWorkoutAsync(int workoutId)
        {
            return await _context.Workouts
            .FirstOrDefaultAsync(w => w.Id == workoutId) ?? throw new WorkoutNotFoundException();
        }

        public async Task AddWorkoutAsync(Workout workout)
        {
            await _context.Workouts.AddAsync(workout);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWorkoutAsync(Workout workout)
        {
            _context.Workouts.Update(workout);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWorkoutAsync(int workoutId)
        {
            var workout = await GetWorkoutAsync(workoutId);

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
        }

    }
}