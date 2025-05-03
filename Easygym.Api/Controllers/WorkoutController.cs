using Easygym.Api.Models.Requests;
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
        private readonly WorkoutService _workoutService;

        public WorkoutController(
            IWorkoutRepository workoutRepository,
            CurrentUserService currentUserService,
            WorkoutService workoutService)
        {
            _workoutRepository = workoutRepository;
            _currentUserService = currentUserService;
            _workoutService = workoutService;
        }

        [HttpGet]
        [Authorize(Roles = $"{Role.Admin}, {Role.Client}, {Role.Trainer}")]
        public async Task<IActionResult> GetWorkoutsForTrainee([FromBody] GetWorkoutsForTraineeRequest request)
        {
            var workouts = await _workoutService.GetWorkoutsForTraineeAsync(request.TraineeId);
            return Ok(workouts);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{Role.Admin}, {Role.Trainer}")]
        public async Task<IActionResult> GetWorkoutForTrainee([FromBody] GetWorkoutForTraineeRequest request)
        {
            var workout = await _workoutService.GetWorkoutForTraineeAsync(request.WorkoutId, request.TraineeId);
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

}