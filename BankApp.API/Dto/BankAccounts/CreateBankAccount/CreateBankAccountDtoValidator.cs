using BankApp.DAL.Constants;
using BankApp.Application.Features.Dictionaries.Queries.Existence.AccountTypeExistence;
using BankApp.Application.Features.Users.Queries.UserExistence;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BankApp.API.Dto.BankAccounts.CreateBankAccount
{
    public class CreateBankAccountDtoValidator : AbstractValidator<CreateBankAccountDto>
    {
        public CreateBankAccountDtoValidator(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            RuleFor(x => x.AccountTypeId)
                .NotEmpty()
                .MustAsync(async (accountTypeId, token) => await mediator.Send(new AccountTypeExistenceQuery(accountTypeId), token))
                .WithMessage("Invalid account type id");

            When(_ => httpContextAccessor.HttpContext.User.IsInRole(UserRoles.Employee), () =>
            {
                RuleFor(x => x.UserId)
                    .NotEmpty()
                    .MustAsync(async (id, token) => await mediator.Send(new UserExistenceQuery(id), token))
                    .WithMessage("Invalid user id");
            });
        }
    }
}
