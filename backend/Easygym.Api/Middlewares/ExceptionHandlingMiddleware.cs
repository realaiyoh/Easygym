using System.Net;
using System.Text.Json;
using Easygym.Domain.Exceptions;

namespace Easygym.Api.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            var (statusCode, message) = exception switch
            {
                // Auth exceptions
                UserNotFoundException => (HttpStatusCode.NotFound, exception.Message),
                InvalidCredentialsException => (HttpStatusCode.Unauthorized, exception.Message),
                UserAlreadyExistsException => (HttpStatusCode.Conflict, exception.Message),
                InvalidRoleException => (HttpStatusCode.BadRequest, exception.Message),
                InvalidTokenException => (HttpStatusCode.BadRequest, exception.Message),
                MissingTokenException => (HttpStatusCode.Unauthorized, exception.Message),
                AuthenticationException => (HttpStatusCode.Unauthorized, exception.Message),

                // Validation exceptions
                ValidationException => (HttpStatusCode.BadRequest, exception.Message),

                // Workout exceptions
                WorkoutsNotFoundException => (HttpStatusCode.NotFound, exception.Message),
                WorkoutNotFoundException => (HttpStatusCode.NotFound, exception.Message),
                WorkoutSessionNotFoundException => (HttpStatusCode.NotFound, exception.Message),
                // Other app exceptions
                ForbiddenAccessException => (HttpStatusCode.Forbidden, exception.Message),
                AppException => (HttpStatusCode.BadRequest, exception.Message),

                // Fallback for unhandled exceptions
                _ => (HttpStatusCode.InternalServerError, "An error occurred. Please try again later.")
            };

            context.Response.StatusCode = (int)statusCode;

            var response = new
            {
                status = (int)statusCode,
                message
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}