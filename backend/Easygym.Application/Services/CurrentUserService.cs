using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Exceptions;
using Easygym.Domain.Interfaces;
using Easygym.Domain.Models.Responses;
using Microsoft.AspNetCore.Http;

namespace Easygym.Application.Services
{
    public class CurrentUserService
    {
        private readonly AuthService _authService;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IGenericRepository<Client> _clientRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(
            AuthService authService,
            IGenericRepository<User> userRepository,
            IGenericRepository<Client> clientRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _authService = authService;
            _userRepository = userRepository;
            _clientRepository = clientRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CurrentUserResponse> GetCurrentUserAsync()
        {
            var authHeader = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"]
                .FirstOrDefault()?.Replace("Bearer ", "") ?? "";

            var userId = _authService.GetUserIdByTokenAsync(authHeader);
            var user = await _userRepository.GetByIdAsync(userId) ?? throw new UserNotFoundException();

            User? trainerUser = null;
            Client? client = null;

            if (user.Role == Role.Client)
            {
                client = await _clientRepository.GetByIdAsync(userId) ?? throw new UserNotFoundException();
                trainerUser = await _userRepository.GetByIdAsync(client.TrainerId ?? 0);
            }

            return new CurrentUserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Trainer = trainerUser,
                InvitationAcceptedAt = client?.InvitationAcceptedAt
            };
        }
    }
}