namespace Easygym.Domain.Entities
{
    public enum InvitationStatus
    {
        Pending,
        Accepted,
        Rejected
    }
    public class Invitation
    {
        public int Id { get; set; }
        public required int ClientId { get; set; }
        public User? Client { get; set; }
        public required int TrainerId { get; set; }
        public User? Trainer { get; set; }
        public InvitationStatus? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ResolvedAt { get; set; }
    }
}