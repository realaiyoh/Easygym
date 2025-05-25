using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Easygym.Domain.Exceptions;
using Easygym.Domain.Models.Requests;
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

        public async Task<Workout> CreateWorkoutAsync(Workout workout)
        {
            await CanAccessWorkout(workout.TraineeId);

            if (workout.Sets.Count == 0)
            {
                throw new ValidationException("Workout must have at least one set");
            }

            await _workoutRepository.AddWorkoutAsync(workout);
            return workout;
        }


        public async Task<Workout> UpdateWorkoutAsync(int traineeId, int workoutId, UpdateWorkoutRequest workout)
        {
            await CanAccessWorkout(traineeId);
            return await _workoutRepository.UpdateWorkoutAsync(workoutId, workout);
        }


        public async Task DeleteWorkoutAsync(int traineeId, int workoutId)
        {
            await CanAccessWorkout(traineeId);
            await _workoutRepository.DeleteWorkoutAsync(workoutId);
        }

        public async Task CanAccessWorkout(int traineeId)
        {
            var currentUser = await _currentUserService.GetCurrentUserAsync();

            // Only allow trainers and admins to see other users' workouts,
            // while clients can only see their own workouts
            if (currentUser.Role == Role.Client && currentUser.Id != traineeId)
            {
                throw new ForbiddenAccessException();
            }
        }
    }
}