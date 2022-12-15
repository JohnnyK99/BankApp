using BankApp.Application.Constants;
using BankApp.Application.Features.BankAccounts.Queries.Existence;
using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using BankApp.Application.Features.BankAccounts.Queries.Ownership;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BankApp.API.Dto.BankAccounts.CreateBankAccount
{
    public class CreateTransactionDtoValidator : AbstractValidator<CreateTransactionDto>
    {
        public bool ExistsProposal { get; set; }

        public CreateTransactionDtoValidator(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            RuleFor(x => x.Amount)
                .NotEmpty()
                .Must(amount => amount >= TransactionConstants.MinTransactionAmount)
                .WithMessage($"Transaction amount must be higher than {TransactionConstants.MinTransactionAmount}");

            RuleFor(x => x.Title)
                .NotEmpty()
                .MinimumLength(1)
                .WithMessage("Transaction title must contain at least one character");

            RuleFor(x => x.AccountNumberFrom)
                .NotEmpty()
                .MustAsync(async (id, token) =>
                {
                    ExistsProposal = await mediator.Send(new BankAccountExistenceByNumberQuery(id), token);
                    return ExistsProposal;
                })
                .WithMessage("Source account does not exist");

            When(_ => ExistsProposal, () =>
            {
                RuleFor(x => new { x.AccountNumberFrom, x.AccountNumberTo })
                .Must(x => x.AccountNumberFrom != x.AccountNumberTo)
                .WithMessage("Target and source account numbers cannot be the same");

                RuleFor(x => x.AccountNumberFrom)
                    .MustAsync(async (accountNumber, token) =>
                    {
                        var username = httpContextAccessor.HttpContext.User.Identity.Name;
                        return await mediator.Send(new BankAccountOwnershipQuery(username, accountNumber), token);
                    })
                    .WithMessage("Source account does not belong to the user");

                RuleFor(x => x.AccountNumberTo)
                    .NotEmpty()
                    .MustAsync(async (accountId, token) => await mediator.Send(new BankAccountExistenceByNumberQuery(accountId), token))
                    .WithMessage("Target account does not exist");

                RuleFor(x => new { x.AccountNumberFrom, x.Amount })
                    .MustAsync(async (values, token) =>
                    {
                        var account = await mediator.Send(new GetBankAccountByNumberQuery(values.AccountNumberFrom), token);
                        return values.Amount <= account.Balance;
                    })
                    .WithMessage("Transaction amount cannot be higher than source account balance");


            });


        }
    }
}

