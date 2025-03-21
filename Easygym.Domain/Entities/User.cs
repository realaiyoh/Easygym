namespace Easygym.Domain.Entities
{
    public enum UserRole
    {
        Client,
        Trainer,
        Staff
    }
    public class User
    {

        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public UserRole Role { get; set; } = UserRole.Client;
    }
}