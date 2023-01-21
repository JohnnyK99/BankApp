using BankApp.API.Constants.Routes;
using BankApp.API.Dto.SavedRecipients.AddRecipient;
using BankApp.Application.Features.SavedRecipients.Commands;
using BankApp.Application.Features.Users.Queries.GetUserId;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.API.Controllers.SavedRecipients
{
    [Route(ApiRoutes.SavedRecipients.Base)]
    [ApiController]
    public class SavedRecipientsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SavedRecipientsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecipient(AddRecipientDto request, CancellationToken cancellationToken)
        {
            var userId = await _mediator.Send(new GetUserIdQuery(User.Identity.Name), cancellationToken);

            await _mediator.Send(new AddRecipientCommand(userId, request.AccountNumber, request.Name), cancellationToken);

            return NoContent();
        }
    }
}
