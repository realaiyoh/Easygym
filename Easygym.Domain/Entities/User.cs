using System.ComponentModel.DataAnnotations;

namespace Easygym.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Range(1, 50)]
        public string? Name { get; set; }
        [EmailAddress]
        public required string Email { get; set; }
        [MinLength(8)]
        public required string Password { get; set; }
        public required string Role { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}