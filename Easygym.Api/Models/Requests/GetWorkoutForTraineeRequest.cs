namespace Easygym.Api.Models.Requests
{
    public class GetWorkoutForTraineeRequest
    {
        public int WorkoutId { get; set; }
        public int TraineeId { get; set; }
    }
}