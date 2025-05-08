using Easygym.Application.Services;
using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Easygym.Api.Controllers
{
    public class WorkoutController : Controller
    {
        private readonly WorkoutService _workoutService;

        public WorkoutController(WorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpGet("trainee/{traineeId}")]
        [Authorize(Roles = Role.All)]
        public async Task<IActionResult> GetWorkoutsForTrainee(int traineeId)
        {
            var workouts = await _workoutService.GetWorkoutsForTraineeAsync(traineeId);
            return Ok(workouts);
        }

        [HttpGet("trainee/{traineeId}/{workoutId}")]
        [Authorize(Roles = Role.All)]
        public async Task<IActionResult> GetWorkoutForTrainee(int traineeId, int workoutId)
        {
            var workout = await _workoutService.GetWorkoutForTraineeAsync(workoutId, traineeId);
            return Ok(workout);
        }

        [HttpPost]
        [Authorize(Roles = Role.All)]
        public async Task<IActionResult> CreateWorkout(Workout workout)
        {
            var newWorkout = await _workoutService.CreateWorkoutAsync(workout);
            return Ok(newWorkout);
        }

        [HttpPut("trainee/{traineeId}/{workoutId}")]
        [Authorize(Roles = Role.All)]
        public async Task<IActionResult> UpdateWorkout(int traineeId, int workoutId, [FromBody] UpdateWorkoutRequest workout)
        {
            var updatedWorkout = await _workoutService.UpdateWorkoutAsync(traineeId, workoutId, workout);
            return Ok(updatedWorkout);
        }

        [HttpDelete("trainee/{traineeId}/{workoutId}")]
        [Authorize(Roles = Role.All)]
        public async Task<IActionResult> DeleteWorkout(int traineeId, int workoutId)
        {
            await _workoutService.DeleteWorkoutAsync(traineeId, workoutId);
            return Ok();
        }
    }

}