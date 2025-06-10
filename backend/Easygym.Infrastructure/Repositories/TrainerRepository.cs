using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Easygym.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Easygym.Infrastructure.Repositories
{
  public class TrainerRepository : GenericRepository<Trainer>, ITrainerRepository
  {
    private readonly EasygymDbContext _context;

    public TrainerRepository(EasygymDbContext context) : base(context)
    {
      _context = context;
    }

    public async Task<Trainer?> GetTrainerWithClientsAsync(int trainerId)
    {
      return await _context.Trainers
          .Include(t => t.Clients)
          .FirstOrDefaultAsync(t => t.Id == trainerId);
    }
  }
}