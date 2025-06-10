using Easygym.Domain.Entities;

namespace Easygym.Domain.Interfaces
{
  public interface ITrainerRepository : IGenericRepository<Trainer>
  {
    Task<Trainer?> GetTrainerWithClientsAsync(int trainerId);
  }
}