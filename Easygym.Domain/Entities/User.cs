namespace Easygym.Domain.Entities
{
    public class User
    {
        public required string Id { get; set; }
        public string? Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}