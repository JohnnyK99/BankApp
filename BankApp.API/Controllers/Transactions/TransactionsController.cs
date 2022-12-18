using BankApp.API.Constants.Routes;
using BankApp.API.Dto.BankAccounts.CreateBankAccount;
using BankApp.Application.Features.Transactions.Commands.CreateTransaction;
using BankApp.Application.Wrappers;
using BankApp.DAL.Constants;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.API.Controllers.BankAccounts
{
    [Route(ApiRoutes.Transactions.Base)]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TransactionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Client)]
        public async Task<IActionResult> CreateTransaction(CreateTransactionDto request, CancellationToken cancellationToken)
        {
            Result<int> transactionId = await _mediator.Send(new CreateTransactionCommand(
                request.AccountNumberFrom,
                request.AccountNumberTo,
                request.Title,
                request.Description,
                request.Amount
                ), cancellationToken);

            return Ok(transactionId);
        }
    }
}
