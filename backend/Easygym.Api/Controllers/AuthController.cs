using Easygym.Api.Models.Requests;
using Easygym.Application.Services;
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
            return Ok(new AuthTokenResponse { Token = token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Email, request.Password);
            return Ok(new AuthTokenResponse { Token = token });
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var user = await _currentUserService.GetCurrentUserAsync();
            return Ok(user);
        }
    }
}
