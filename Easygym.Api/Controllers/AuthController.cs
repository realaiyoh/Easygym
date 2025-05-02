using Easygym.Application.Services;
using Easygym.Domain.Entities;
using Easygym.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Easygym.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly CurrentUserService _currentUserService;
        
        public AuthController(
            AuthService authService, 
            CurrentUserService currentUserService)
        {
            _authService = authService;
            _currentUserService = currentUserService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var token = await _authService.RegisterAsync(request.Name, request.Email, request.Password, request.Role);
            return Ok(token);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Email, request.Password);
            return Ok(token);
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var user = await _currentUserService.GetCurrentUserAsync();
            return Ok(user);
        }
    }

    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string? Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}
