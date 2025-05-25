namespace Easygym.Domain.Models.Requests
{
    public class UpdateWorkoutSessionRequest
    {
        public int Id { get; set; }
        public int TraineeId { get; set; }
        public int? PerceivedDifficulty { get; set; }
        public string? Notes { get; set; }
    }
}