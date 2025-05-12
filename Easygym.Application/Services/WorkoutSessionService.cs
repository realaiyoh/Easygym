using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Easygym.Domain.Exceptions;
using Easygym.Domain.Models.Requests;
using Easygym.Domain.Constants;
namespace Easygym.Application.Services
{
    public class WorkoutSessionService
    {
        private readonly IWorkoutSessionRepository _workoutSessionRepository;
        private readonly WorkoutService _workoutService;
        private readonly CurrentUserService _currentUserService;
        public WorkoutSessionService(IWorkoutSessionRepository workoutSessionRepository, WorkoutService workoutService, CurrentUserService currentUserService)
        {
            _workoutSessionRepository = workoutSessionRepository;
            _workoutService = workoutService;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<WorkoutSession>> GetWorkoutSessionsForTraineeAsync(int traineeId)
        {
            var currentUser = await _currentUserService.GetCurrentUserAsync();
            // Only allow trainees to see their own workout sessions
            if (currentUser.Id != traineeId && currentUser.Role == Role.Client)
            {
                throw new ForbiddenAccessException();
            }

            return (await _workoutSessionRepository.GetAllAsync()).Where(w => w.TraineeId == traineeId);
        }

        public async Task<WorkoutSession> GetWorkoutSessionAsync(int workoutSessionId)
        {
            var workoutSession = await _workoutSessionRepository.GetByIdAsync(workoutSessionId) ?? throw new WorkoutSessionNotFoundException();

            await _workoutService.CanAccessWorkout(workoutSession.TraineeId);
            return workoutSession;
        }

        public async Task CreateWorkoutSessionAsync(WorkoutSession workoutSession)
        {
            await _workoutService.CanAccessWorkout(workoutSession.TraineeId);
            await _workoutSessionRepository.AddAsync(workoutSession);
        }

        public async Task UpdateWorkoutSessionAsync(UpdateWorkoutSessionRequest workoutSession)
        {
            await _workoutService.CanAccessWorkout(workoutSession.TraineeId);

            var existingWorkoutSession = await _workoutSessionRepository.GetByIdAsync(workoutSession.Id) ?? throw new WorkoutSessionNotFoundException();

            if (workoutSession.PerceivedDifficulty != null)
            {
                existingWorkoutSession.PerceivedDifficulty = workoutSession.PerceivedDifficulty;
            }

            if (workoutSession.Notes != null)
            {
                existingWorkoutSession.Notes = workoutSession.Notes;
            }

            await _workoutSessionRepository.UpdateAsync(existingWorkoutSession);
        }

        public async Task DeleteWorkoutSessionAsync(int workoutSessionId)
        {
            var workoutSession = await GetWorkoutSessionAsync(workoutSessionId);

            await _workoutService.CanAccessWorkout(workoutSession.TraineeId);
            await _workoutSessionRepository.DeleteAsync(workoutSession);
        }
    }
}