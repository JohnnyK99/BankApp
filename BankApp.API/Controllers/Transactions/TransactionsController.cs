using BankApp.API.Constants.Routes;
using BankApp.API.Dto.BankAccounts.CreateBankAccount;
using BankApp.API.Dto.Transactions.GetTransactionConfirmation;
using BankApp.API.Dto.Transactions.GetTransactions;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Features.Transactions.Commands.CreateTransaction;
using BankApp.Application.Features.Transactions.Queries.Existence;
using BankApp.Application.Features.Transactions.Queries.GetTransactionConfirmation;
using BankApp.Application.Features.Transactions.Queries.GetTransactions;
using BankApp.Application.Wrappers;
using BankApp.Application.Wrappers.Result;
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

        [HttpGet]
        [Authorize(Roles = $"{UserRoles.Client}, {UserRoles.Employee}")]
        public async Task<IActionResult> GetAll([FromQuery] GetTransactionsDto request, CancellationToken cancellationToken)
        {
            GetTransactionsQuery query = new(
                request.BankAccountNumber,
                request.TransactionTypes,
                request.SearchBy,
                request.DateFrom,
                request.DateTo,
                request.PageNumber,
                request.PageSize,
                request.SortColumn,
                request.SortDirection);

            Result<PagedResponse<Transaction>> transactions = await _mediator.Send(query, cancellationToken);

            return Ok(transactions);
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Client)]
        public async Task<IActionResult> CreateTransaction(CreateTransactionDto request, CancellationToken cancellationToken)
        {
            CreateTransactionCommand command = new(
                request.AccountNumberFrom,
                request.AccountNumberTo,
                request.Title,
                request.Description,
                request.Amount);

            Result<int> transactionId = await _mediator.Send(command, cancellationToken);

            return Ok(transactionId);
        }

        [HttpGet(ApiRoutes.Transactions.Confirmation)]
        [Authorize(Roles = $"{UserRoles.Client}, {UserRoles.Employee}")]
        public async Task<IActionResult> GetTransactionConfirmation([FromRoute] GetTransactionConfirmationDto request, CancellationToken cancellationToken)
        {
            bool existsTransaction = await _mediator.Send(new TransactionExistenceQuery(request.TransactionId), cancellationToken);
            if (!existsTransaction)
            {
                return NotFound();
            }

            string language = Request.Headers.AcceptLanguage.ToString();

            FileResponse confirmation = await _mediator.Send(new GetTransactionConfirmationQuery(request.TransactionId, language), cancellationToken);
            return File(confirmation.Content, confirmation.ContentType, confirmation.FileName);
        }
    }
}
