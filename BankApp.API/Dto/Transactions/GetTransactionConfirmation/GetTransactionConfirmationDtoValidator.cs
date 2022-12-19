using BankApp.Application.Features.Transactions.Queries.ClientAccess;
using BankApp.Application.Features.Transactions.Queries.Existence;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BankApp.API.Dto.Transactions.GetTransactionConfirmation
{
    public class GetTransactionConfirmationDtoValidator : AbstractValidator<GetTransactionConfirmationDto>
    {
        public GetTransactionConfirmationDtoValidator(IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            WhenAsync(async (x, token) => await mediator.Send(new TransactionExistenceQuery(x.TransactionId), token), () =>
            {
                RuleFor(x => x.TransactionId)
                    .MustAsync(async (id, token) =>
                    {
                        var username = httpContextAccessor.HttpContext.User.Identity.Name;
                        return await mediator.Send(new TransactionClientAccessQuery(username, id), token);
                    })
                    .WithMessage("User does not have access to this transaction");
            });
        }
    }
}
