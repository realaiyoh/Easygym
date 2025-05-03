using System.ComponentModel.DataAnnotations;

namespace Easygym.Domain.Entities
{
    public class Workout
    {
        public int Id { get; set; }
        [StringLength(50, MinimumLength = 1)]
        public string? Name { get; set; }
        [StringLength(50, MinimumLength = 1)]
        public string? Description { get; set; }
        public required int TraineeId { get; set; }
        public User? Trainee { get; set; }
        public List<Set>? Sets { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}