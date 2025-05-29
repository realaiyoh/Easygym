using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Easygym.Domain.Exceptions;
using Easygym.Domain.Interfaces;

namespace Easygym.Application.Services
{
    public class InvitationService
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly CurrentUserService _currentUserService;

        public InvitationService(IInvitationRepository invitationRepository, CurrentUserService currentUserService)
        {
            _invitationRepository = invitationRepository;
            _currentUserService = currentUserService;
        }

        private async Task<Invitation> GetInvitation(int id)
        {
            return await _invitationRepository.GetByIdAsync(id) ?? throw new InvitationNotFoundException();
        }

        public async Task<List<Invitation>> GetInvitations()
        {
            var currentUser = await _currentUserService.GetCurrentUserAsync();

            return [.. await _invitationRepository.GetAllAsync(currentUser.Id)];
        }

        public async Task<Invitation> CreateInvitation(Invitation invitation)
        {
            await CanAccessInvitation(invitation.ClientId, invitation.TrainerId);

            invitation.Status = InvitationStatus.Pending;
            return await _invitationRepository.AddAsync(invitation);
        }

        public async Task DeleteInvitation(int id)
        {
            var invitation = await GetInvitation(id);
            await _invitationRepository.DeleteAsync(invitation);
        }

        public async Task<Invitation> ResolveInvitation(int id, InvitationStatus status)
        {
            var invitation = await GetInvitation(id);

            await CanAccessInvitation(invitation.ClientId, invitation.TrainerId);

            invitation.Status = status;
            invitation.ResolvedAt = DateTime.UtcNow;

            await _invitationRepository.UpdateAsync(invitation);

            return invitation;
        }

        public async Task CanAccessInvitation(int clientId, int trainerId)
        {
            var currentUser = await _currentUserService.GetCurrentUserAsync();

            // Only allow clients and trainers to see their own invitations.
            // Admins can see all invitations.
            if (currentUser.Id != clientId && currentUser.Id != trainerId && currentUser.Role != Role.Admin)
            {
                throw new ForbiddenAccessException();
            }
        }
    }
}