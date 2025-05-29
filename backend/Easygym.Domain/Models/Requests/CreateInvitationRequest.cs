namespace Easygym.Api.Models.Requests
{
  public class CreateInvitationRequest
  {
    public string? ClientEmail { get; set; }
    public string? TrainerEmail { get; set; }
    public string? Message { get; set; }
  }
}