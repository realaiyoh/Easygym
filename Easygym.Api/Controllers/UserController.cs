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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return Ok(user);
        }

    }
}