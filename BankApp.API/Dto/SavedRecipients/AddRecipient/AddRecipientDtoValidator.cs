using BankApp.Application.Features.BankAccounts.Queries.Existence;
using FluentValidation;
using MediatR;

namespace BankApp.API.Dto.SavedRecipients.AddRecipient
{
    public class AddRecipientDtoValidator : AbstractValidator<AddRecipientDto>
    {
        public AddRecipientDtoValidator(IMediator mediator)
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Recipient name is required");

            RuleFor(x => x.AccountNumber)
                .NotEmpty()
                .MustAsync(async (number, token) => await mediator.Send(new BankAccountExistenceByNumberQuery(number), token))
                .WithMessage("Bank account with provided number does not exist");
        }
    }
}
