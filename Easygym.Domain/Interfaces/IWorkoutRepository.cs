using Easygym.Domain.Entities;

namespace Easygym.Domain.Interfaces
{
    public interface IWorkoutRepository
    {
        Task<List<Workout>> GetWorkoutsForTraineeAsync(int traineeId);
        Task<Workout> GetWorkoutForTraineeAsync(int workoutId, int traineeId);
        Task AddWorkoutAsync(Workout workout);
        Task UpdateWorkoutAsync(Workout workout);
        Task DeleteWorkoutAsync(int workoutId);
        Task<Workout> GetWorkoutAsync(int workoutId);
    }
}