using Easygym.Domain.Entities;

namespace Easygym.Domain.Models.Requests
{
  public class ResolveInvitationRequest
  {
    public required InvitationStatus Status { get; set; }
  }
}