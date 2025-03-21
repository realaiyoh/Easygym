using Easygym.Domain.Entities;
using Easygym.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Easygym.Api.Controllers
{

    public class UserController : Controller
    {
        private readonly IGenericRepository<User> _userRepository;

        public UserController(IGenericRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAllAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            await _userRepository.AddAsync(user);
            return Created();
        }

    }
}