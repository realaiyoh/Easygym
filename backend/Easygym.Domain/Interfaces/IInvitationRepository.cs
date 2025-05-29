using Easygym.Domain.Entities;

namespace Easygym.Domain.Interfaces
{
    public interface IInvitationRepository : IGenericRepository<Invitation>
    {
        Task<IEnumerable<Invitation>> GetAllAsync(int userId);
        Task<bool> IsInvitationAlreadySent(int clientId, int trainerId);
    }
}