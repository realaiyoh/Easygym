using System.IdentityModel.Tokens.Jwt;
using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Exceptions;
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

        public async Task<string> RegisterAsync(string? name, string email, string password, string role)
        {
            role = role.ToLower();
            if (!new[] { Role.Admin, Role.Trainer, Role.Client }.Contains(role, StringComparer.Ordinal))
            {
                throw new InvalidRoleException();
            }

            var userExists = await _userRepository.GetUserByEmailAsync(email);
            if (userExists != null)
            {
                throw new UserAlreadyExistsException();
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            var user = new User
            {
                Name = name,
                Email = email,
                Password = passwordHash,
                Role = role,
            };

            await _userRepository.AddUserAsync(user);

            return _jwtService.GenerateToken(user.Id.ToString(), role);
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new UserNotFoundException();
            }

            if (!VerifyPassword(password, user.Password))
            {
                throw new InvalidCredentialsException();
            }

            return _jwtService.GenerateToken(user.Id.ToString(), user.Role);
        }

        public int GetUserIdByTokenAsync(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new MissingTokenException();
            }

            var decodedToken = _jwtService.DecodeToken(token);
            var userId = decodedToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value!;

            if (userId == null)
            {
                throw new InvalidTokenException("Can't get user id from token");
            }

            return int.Parse(userId);
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}