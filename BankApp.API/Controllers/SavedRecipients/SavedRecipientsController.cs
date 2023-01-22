using BankApp.API.Constants.Routes;
using BankApp.API.Dto.SavedRecipients.AddRecipient;
using BankApp.API.Dto.SavedRecipients.RemoveRecipient;
using BankApp.Application.Features.SavedRecipients.Commands.AddRecipient;
using BankApp.Application.Features.SavedRecipients.Commands.RemoveRecipient;
using BankApp.Application.Features.SavedRecipients.Queries.GetRecipients;
using BankApp.Application.Features.Users.Queries.GetUserId;
using BankApp.Application.Wrappers.Result;
using BankApp.DAL.Constants;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpGet]
        [Authorize(Roles = UserRoles.Client)]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var userId = await _mediator.Send(new GetUserIdQuery(User.Identity.Name), cancellationToken);

            Result<IEnumerable<SavedRecipient>> recipients = await _mediator.Send(new GetRecipientsQuery(userId), cancellationToken);

            return Ok(recipients);
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Client)]
        public async Task<IActionResult> AddRecipient(AddRecipientDto request, CancellationToken cancellationToken)
        {
            var userId = await _mediator.Send(new GetUserIdQuery(User.Identity.Name), cancellationToken);

            await _mediator.Send(new AddRecipientCommand(userId, request.AccountNumber, request.Name), cancellationToken);

            return NoContent();
        }

        [HttpDelete]
        [Authorize(Roles = UserRoles.Client)]
        public async Task<IActionResult> RemoveRecipient([FromQuery] RemoveRecipientDto request, CancellationToken cancellationToken)
        {
            var userId = await _mediator.Send(new GetUserIdQuery(User.Identity.Name), cancellationToken);

            await _mediator.Send(new RemoveRecipientCommand(userId, request.AccountNumber), cancellationToken);

            return NoContent();
        }
    }
}
