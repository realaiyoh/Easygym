namespace Easygym.Api.Models.Requests
{
    public class RegisterRequest
    {
        public string? Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}