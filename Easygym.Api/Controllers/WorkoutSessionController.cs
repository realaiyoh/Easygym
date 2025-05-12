using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Easygym.Application.Services;
using Easygym.Domain.Entities;
using Easygym.Domain.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace Easygym.Api.Controllers
{
    public class WorkoutSessionController : Controller
    {
        private readonly WorkoutSessionService _workoutSessionService;

        public WorkoutSessionController(WorkoutSessionService workoutSessionService)
        {
            _workoutSessionService = workoutSessionService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkoutSession(int id)
        {
            var workoutSession = await _workoutSessionService.GetWorkoutSessionAsync(id);
            return Ok(workoutSession);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkoutSession([FromBody] WorkoutSession workoutSession)
        {
            await _workoutSessionService.CreateWorkoutSessionAsync(workoutSession);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkoutSession(int id, [FromBody] UpdateWorkoutSessionRequest workoutSession)
        {
            await _workoutSessionService.UpdateWorkoutSessionAsync(workoutSession);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutSession(int id)
        {
            await _workoutSessionService.DeleteWorkoutSessionAsync(id);
            return Ok();
        }
    }

}