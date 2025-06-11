using System.Text.Json.Serialization;
using Easygym.Domain.Entities;

namespace Easygym.Domain.Models.Responses
{
    public class CurrentUserResponse : User
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public User? Trainer { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? InvitationAcceptedAt { get; set; }
    }
}