using BankApp.Application.Features.BankAccounts.Queries.Existence;
using BankApp.Application.Features.SavedRecipients.Queries.Existence;
using BankApp.Application.Features.Users.Queries.GetUserId;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BankApp.API.Dto.SavedRecipients.RemoveRecipient
{
    public class RemoveRecipientDtoValidator : AbstractValidator<RemoveRecipientDto>
    {
        public RemoveRecipientDtoValidator(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            RuleFor(x => x.AccountNumber)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                .MustAsync(async (number, token) => await mediator.Send(new BankAccountExistenceByNumberQuery(number), token))
                .WithMessage("Bank account with provided number does not exist")
                .MustAsync(async (number, token) =>
                {
                    var userId = await mediator.Send(new GetUserIdQuery(httpContextAccessor.HttpContext.User.Identity.Name), token);

                    return await mediator.Send(new RecipientExistenceQuery(userId, number), token);
                })
                .WithMessage("Recipient with provided account number does not exist");
        }
    }
}
