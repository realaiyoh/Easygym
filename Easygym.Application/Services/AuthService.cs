using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;

namespace Easygym.Application.Services
{
    public class AuthService
    {
        private readonly JwtService _jwtService;
        private readonly IUserRepository _userRepository;
        public AuthService(JwtService jwtService, IUserRepository userRepository)
        {
            _jwtService = jwtService;
            _userRepository = userRepository;
        }

        public async Task<string> RegisterAsync(string email, string password, string role)
        {
            role = role.ToLower();
            if (!new[] { Role.Admin, Role.Trainer, Role.Client }.Contains(role, StringComparer.Ordinal))
            {
                throw new Exception("Invalid role");
            }


            var userExists = await _userRepository.GetUserByEmailAsync(email);
            if (userExists != null)
            {
                throw new Exception("User already exists");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = email,
                Password = passwordHash,
                Role = role,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.AddUserAsync(user);

            return _jwtService.GenerateToken(user.Id, role);
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null || !VerifyPassword(password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            return _jwtService.GenerateToken(user.Id, user.Role);
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}