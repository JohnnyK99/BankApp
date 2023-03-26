using BankApp.Application.Constants;
using BankApp.Application.Features.BankAccounts.Queries.Existence;
using BankApp.Application.Features.BankAccounts.Queries.Ownership;
using BankApp.DAL.Constants;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace BankApp.API.Dto.Transactions.GetTransactions
{
    public class GetTransactionsDtoValidator : AbstractValidator<GetTransactionsDto>
    {
        public GetTransactionsDtoValidator(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            var username = httpContextAccessor.HttpContext.User.Identity.Name;

            this.CascadeMode = CascadeMode.Stop;

            RuleFor(x => x.BankAccountNumber)
                .NotEmpty()
                .MustAsync(async (number, token) => await mediator.Send(new BankAccountExistenceByNumberQuery(number), token))
                .WithMessage("Account does not exist");

            When(x => httpContextAccessor.HttpContext.User.IsInRole(UserRoles.Client), () =>
            {
                RuleFor(x => x.BankAccountNumber)
                    .MustAsync(async (number, token) => await mediator.Send(new BankAccountOwnershipQuery(username, number), token))
                    .WithMessage("Bank account does not belong to the user");
            });

            When(x => x.DateFrom is not null && x.DateTo is not null, () =>
            {
                RuleFor(x => new { x.DateFrom, x.DateTo })
                    .Must(dates => dates.DateFrom is null || dates.DateTo is null || dates.DateFrom <= dates.DateTo)
                    .WithMessage("Incorrect date range");
            });

            RuleFor(x => x.SortColumn)
                .Must(col => col is null || TransactionConstants.SortColumns.Contains(col))
                .WithMessage("Incorrect sort column");

            RuleFor(x => x.SearchBy)
                .MaximumLength(TransactionConstants.MaxSearchByLength)
                .WithMessage($"Search by cannot contain more than {TransactionConstants.MaxSearchByLength} characters");
        }
    }
}
