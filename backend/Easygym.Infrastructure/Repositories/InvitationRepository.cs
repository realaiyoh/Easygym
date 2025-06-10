using Easygym.Domain.Entities;
using Easygym.Domain.Interfaces;
using Easygym.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Easygym.Infrastructure.Repositories
{
    public class InvitationRepository : GenericRepository<Invitation>, IInvitationRepository
    {
        private readonly EasygymDbContext _context;

        public InvitationRepository(EasygymDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Invitation>> GetAllAsync(int userId)
        {
            return await _context.Invitations
                .Include(i => i.Client)
                .Include(i => i.Trainer)
                .Where(i => i.ClientId == userId || i.TrainerId == userId)
                .ToListAsync();
        }

        public async Task<bool> IsInvitationAlreadySent(int clientId, int trainerId)
        {
            var invitation = await _context.Invitations.FirstOrDefaultAsync(i => i.ClientId == clientId && i.TrainerId == trainerId);
            return invitation != null && invitation.Status == InvitationStatus.Pending;
        }
    }
}