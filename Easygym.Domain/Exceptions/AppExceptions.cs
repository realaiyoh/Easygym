namespace Easygym.Domain.Exceptions
{
    // Base exception for all application exceptions
    public abstract class AppException : Exception
    {
        public AppException(string message) : base(message) { }
    }

    // Authentication related exceptions
    public class AuthenticationException : AppException
    {
        public AuthenticationException(string message) : base(message) { }
    }

    public class UserNotFoundException : AuthenticationException
    {
        public UserNotFoundException() : base("User not found") { }
    }

    public class InvalidCredentialsException : AuthenticationException
    {
        public InvalidCredentialsException() : base("Invalid credentials") { }
    }

    public class UserAlreadyExistsException : AppException
    {
        public UserAlreadyExistsException() : base("User already exists") { }
    }

    public class InvalidRoleException : AppException
    {
        public InvalidRoleException() : base("Invalid role") { }
    }

    public class InvalidTokenException : AuthenticationException
    {
        public InvalidTokenException(string message = "Invalid token") : base(message) { }
    }

    public class MissingTokenException : AuthenticationException
    {
        public MissingTokenException() : base("Authorization token is missing") { }
    }

    // For general validation errors
    public class ValidationException : AppException
    {
        public ValidationException(string message) : base(message) { }
    }
}