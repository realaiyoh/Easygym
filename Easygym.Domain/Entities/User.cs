using System.ComponentModel.DataAnnotations;

namespace Easygym.Domain.Entities
{
    public class User
    {
        [Key]
        public string? Id { get; set; }
        [Range(1, 50)]
        public string? Name { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        [MinLength(8)]
        public string? Password { get; set; }
        [Required]
        public string? Role { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}