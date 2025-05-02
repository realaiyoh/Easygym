using Easygym.Application.Services;
using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Easygym.Api.Controllers
{
    public class WorkoutController : Controller
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly CurrentUserService _currentUserService;

        public WorkoutController(
            IWorkoutRepository workoutRepository, 
            CurrentUserService currentUserService)
        {
            _workoutRepository = workoutRepository;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        [Authorize(Roles = $"{Role.Admin}, {Role.Client}, {Role.Trainer}")]
        public async Task<IActionResult> GetWorkoutsForTrainee([FromBody] GetWorkoutsForTraineeRequest request)
        {
            var currentUser = await _currentUserService.GetCurrentUserAsync();
            
            // Only allow trainers and admins to see other users' workouts,
            // while clients can only see their own workouts
            if (currentUser.Role == Role.Client && currentUser.Id != request.TraineeId)
            {
                return Forbid();
            }
            
            var workouts = await _workoutRepository.GetWorkoutsForTraineeAsync(request.TraineeId);
            return Ok(workouts);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{Role.Admin}, {Role.Trainer}")]
        public async Task<IActionResult> GetWorkoutForTrainee(int workoutId, int traineeId)
        {
            var workout = await _workoutRepository.GetWorkoutForTraineeAsync(workoutId, traineeId);
            return Ok(workout);
        }   

        [HttpPost]
        [Authorize(Roles = $"{Role.Admin}, {Role.Trainer}")]
        public async Task<IActionResult> CreateWorkout(Workout workout)
        {
            await _workoutRepository.AddWorkoutAsync(workout);
            return Ok(workout);
        }

        // [HttpDelete("{id}")]
        // [Authorize(Roles = $"{Role.Admin}, {Role.Trainer}")]
        // public async Task<IActionResult> DeleteWorkout(int id)
        // {
        //     await _workoutRepository.DeleteWorkoutAsync(id);
        //     return Ok();
        // }
        
        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateWorkout(int id, Workout workout)
        // {
        //     await _workoutRepository.UpdateAsync(id, workout);
        //     return Ok(workout);
        // }
    }
    
    public class GetWorkoutsForTraineeRequest
    {
        public int TraineeId { get; set; }
    }
}