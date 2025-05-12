namespace Easygym.Domain.Entities
{
    public class WorkoutSession
    {
        public int Id { get; set; }
        public required int WorkoutId { get; set; }
        public Workout? Workout { get; set; }
        public required int TraineeId { get; set; }
        public User? Trainee { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int? PerceivedDifficulty { get; set; }
        public string? Notes { get; set; }
    }
}