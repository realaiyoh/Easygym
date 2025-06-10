namespace Easygym.Domain.Entities
{
    public class Trainer
    {
        public int Id { get; set; }
        public List<Client> Clients { get; set; } = [];
    }
}