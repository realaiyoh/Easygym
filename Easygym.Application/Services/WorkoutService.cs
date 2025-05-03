using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Easygym.Domain.Exceptions;
namespace Easygym.Application.Services
{
    public class WorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly CurrentUserService _currentUserService;

        public WorkoutService(IWorkoutRepository workoutRepository, CurrentUserService currentUserService)
        {
            _workoutRepository = workoutRepository;
            _currentUserService = currentUserService;
        }
        public async Task<List<Workout>> GetWorkoutsForTraineeAsync(int traineeId)
        {
            await CanAccessWorkout(traineeId);

            var workouts = await _workoutRepository.GetWorkoutsForTraineeAsync(traineeId);
            return workouts;
        }

        public async Task<Workout> GetWorkoutForTraineeAsync(int workoutId, int traineeId)
        {
            await CanAccessWorkout(traineeId);

            var workout = await _workoutRepository.GetWorkoutForTraineeAsync(workoutId, traineeId);
            return workout;
        }

        private async Task<bool> CanAccessWorkout(int traineeId)
        {
            var currentUser = await _currentUserService.GetCurrentUserAsync();

            // Only allow trainers and admins to see other users' workouts,
            // while clients can only see their own workouts
            if (currentUser.Role == Role.Client && currentUser.Id != traineeId)
            {
                throw new ForbiddenAccessException();
            }

            return true;
        }
    }
}