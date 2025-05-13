using Easygym.Domain.Entities;

namespace Easygym.Domain.Interfaces
{
    public interface IWorkoutSessionRepository : IGenericRepository<WorkoutSession>
    {
        new Task<WorkoutSession?> GetByIdAsync(int id);
        new Task<IEnumerable<WorkoutSession>> GetAllAsync();
    }
}