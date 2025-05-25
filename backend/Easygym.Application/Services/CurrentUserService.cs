using Easygym.Domain.Entities;
using Easygym.Domain.Exceptions;
using Easygym.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Easygym.Application.Services
{
    public class CurrentUserService
    {
        private readonly AuthService _authService;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(
            AuthService authService, 
            IGenericRepository<User> userRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _authService = authService;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<User> GetCurrentUserAsync()
        {
            var authHeader = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"]
                .FirstOrDefault()?.Replace("Bearer ", "") ?? "";

            var userId = _authService.GetUserIdByTokenAsync(authHeader);
            var user = await _userRepository.GetByIdAsync(userId);

            return user ?? throw new UserNotFoundException();
        }
    }
} 