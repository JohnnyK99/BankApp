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
        public bool ExistsBankAccount { get; set; }

        public CreateTransactionDtoValidator(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            RuleFor(x => x.Amount)
                .NotEmpty()
                .Must(amount => amount >= TransactionConstants.MinTransactionAmount)
                .WithMessage($"Transaction amount must be higher than {TransactionConstants.MinTransactionAmount}");

            RuleFor(x => x.Title)
                .NotEmpty()
                .MinimumLength(TransactionConstants.MinTitleLength)
                .MaximumLength(TransactionConstants.MaxTitleLength)
                .WithMessage($"Transaction title must contain between {TransactionConstants.MinTitleLength} and {TransactionConstants.MaxTitleLength} characters");

            RuleFor(x => x.AccountNumberFrom)
                .NotEmpty()
                .MustAsync(async (id, token) =>
                {
                    ExistsBankAccount = await mediator.Send(new BankAccountExistenceByNumberQuery(id), token);
                    return ExistsBankAccount;
                })
                .WithMessage("Source account does not exist");

            When(_ => ExistsBankAccount, () =>
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
                    .Must(number =>
                    {
                        if(number.Length != 26)
                        {
                            return false;
                        }

                        var controlSum = number.Substring(0, 2);
                        var baseNumber = number.Substring(2, 24);

                        return decimal.Parse(baseNumber + controlSum) % 97 == 1;
                    })
                    .WithMessage("Invalid target account number")
                    .MustAsync(async (accountId, token) => await mediator.Send(new BankAccountExistenceByNumberQuery(accountId), token))
                    .WithMessage("Target account does not exist");

                RuleFor(x => new { x.AccountNumberFrom, x.Amount })
                    .MustAsync(async (values, token) =>
                    {
                        var account = await mediator.Send(new GetBankAccountByNumberQuery(values.AccountNumberFrom), token);
                        return values.Amount <= account.Balance;
                    })
                    .WithMessage("Transaction amount cannot be higher than source account balance");

                RuleFor(x => x.Description)
                    .MaximumLength(TransactionConstants.MaxDescriptionLength)
                    .WithMessage($"Description cannot contain more than {TransactionConstants.MaxDescriptionLength} characters");
            });


        }
    }
}

