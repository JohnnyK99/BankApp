using BankApp.API.Constants.Routes;
using BankApp.API.Dto.BankAccounts.CreateBankAccount;
using BankApp.DAL.Constants;
using BankApp.Application.Features.BankAccounts.Commands.CreateBankAccount;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Features.Users.Queries.GetUserId;
using BankApp.Application.Features.Users.Queries.UserExistence;
using BankApp.Application.Wrappers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpGet(ApiRoutes.BankAccounts.GetAll)]
        [Authorize(Roles = $"{UserRoles.Employee}, {UserRoles.Client}")]
        public async Task<IActionResult> GetClientBankAccounts(string userId, CancellationToken cancellationToken)
        {
            if (User.IsInRole(UserRoles.Client))
            {
                userId = await _mediator.Send(new GetUserIdQuery(User.Identity.Name), cancellationToken);
            } 
            else
            {
                bool existsClient = await _mediator.Send(new UserExistenceQuery(userId), cancellationToken);
                if (!existsClient)
                {
                    return NotFound();
                }
            }

            Result<IEnumerable<BankAccount>> result = await _mediator.Send(new GetClientBankAccountsQuery(userId), cancellationToken);

            return Ok(result);
        }
    }
}
