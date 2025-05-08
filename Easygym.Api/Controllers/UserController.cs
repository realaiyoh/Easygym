using Easygym.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Easygym.Domain.Constants;
using Easygym.Domain.Interfaces;

namespace Easygym.Api.Controllers
{

    public class UserController : Controller
    {
        private readonly IGenericRepository<User> _userRepository;

        public UserController(IGenericRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }


        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return Ok(user);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            await _userRepository.DeleteAsync(user);
            return NoContent();
        }

    }
}