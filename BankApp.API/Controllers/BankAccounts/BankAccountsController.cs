using BankApp.API.Constants.Routes;
using BankApp.API.Dto.BankAccounts.CreateBankAccount;
using BankApp.DAL.Constants;
using BankApp.Infrastructure.Features.BankAccounts.Commands.CreateBankAccount;
using BankApp.Infrastructure.Features.Users.Queries.GetUserId;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.API.Controllers.BankAccounts
{
    [Route(ApiRoutes.BankAccounts.Base)]
    [ApiController]
    public class BankAccountsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BankAccountsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost(ApiRoutes.BankAccounts.Create)]
        [Authorize(Roles = $"{UserRoles.Employee}, {UserRoles.Client}")]
        public async Task<IActionResult> CreateBankAccount(CreateBankAccountDto request, CancellationToken cancellationToken)
        {
            if (User.IsInRole(UserRoles.Client))
            {
                var userId = await _mediator.Send(new GetUserIdQuery(User.Identity.Name), cancellationToken);
                request.UserId = userId;
            }

            await _mediator.Send(new CreateBankAccountCommand(request.UserId, request.AccountTypeId), cancellationToken);
            return NoContent();
        }
    }
}
