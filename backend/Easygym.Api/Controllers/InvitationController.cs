using Easygym.Application.Services;
using Easygym.Domain.Constants;
using Easygym.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Easygym.Api.Controllers
{
    public class InvitationController : Controller
    {
        private readonly InvitationService _invitationService;

        public InvitationController(InvitationService invitationService)
        {
            _invitationService = invitationService;
        }

        [Authorize(Roles = Role.All)]
        [HttpGet]
        public async Task<IActionResult> GetInvitations()
        {
            var invitations = await _invitationService.GetInvitations();
            return Ok(invitations);
        }

        [Authorize(Roles = $"{Role.Trainer}, {Role.Client}")]
        [HttpPost]
        public async Task<IActionResult> CreateInvitation(Invitation invitation)
        {
            var newInvitation = await _invitationService.CreateInvitation(invitation);
            return Ok(newInvitation);
        }

        [Authorize(Roles = $"{Role.Trainer}, {Role.Client}")]
        [HttpPut("{id}")]
        public async Task<IActionResult> ResolveInvitation(int id, [FromBody] InvitationStatus status)
        {
            var resolvedInvitation = await _invitationService.ResolveInvitation(id, status);
            return Ok(resolvedInvitation);
        }

        [Authorize(Roles = Role.All)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitation(int id)
        {
            await _invitationService.DeleteInvitation(id);
            return Ok();
        }

    }
}