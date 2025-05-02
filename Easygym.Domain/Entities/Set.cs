using System.ComponentModel.DataAnnotations;

namespace Easygym.Domain.Entities
{
    public class Set
    {
        public int Id {get; set;}
        [Range(1, 50)]
        public string? Name {get; set;}
        [Range(1, 50)]  
        public string? Description {get; set;}
        public required int Repetitions {get; set;}
        public int? Weight {get; set;}
    }
}