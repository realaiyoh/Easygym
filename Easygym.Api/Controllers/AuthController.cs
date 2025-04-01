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
        private readonly IGenericRepository<User> _userRepository;
        public AuthController(AuthService authService, IGenericRepository<User> userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var token = await _authService.RegisterAsync(request.Email, request.Password, request.Role);
            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Email, request.Password);
            return Ok(new { token });
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "") ?? "";

            var userId = _authService.GetUserIdByTokenAsync(authHeader);
            var user = await _userRepository.GetByIdAsync(userId);

            return Ok(new { user });
        }
    }

    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class RegisterRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}
