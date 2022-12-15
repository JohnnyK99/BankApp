using FluentValidation;
using BankApp.API.Extensions;
using BankApp.API.Constants.Auth;
using MediatR;
using BankApp.Application.Features.Dictionaries.Queries.Existence.AccountTypeExistence;
using BankApp.Application.Features.Users.Queries.UserExistence;

namespace BankApp.API.Dto.Auth.Register
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(IMediator mediator)
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("First name must not be empty.");

            RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("Last name must not be empty");

            RuleFor(x => x.Email)
                .EmailAddress()
                .WithMessage("Valid email address must be provided.")
                .MustAsync(async (address, token) => !(await mediator.Send(new UserExistenceQuery(address), token)))
                .WithMessage("Account with provided email address already exists");

            RuleFor(x => x.Password)
                .MinimumLength(AuthConstants.MinPasswordLength)
                .WithMessage($"Password must have at least {AuthConstants.MinPasswordLength} characters")
                .Must(password => password.ContainsUpperCase())
                .WithMessage("Password must contain at least one uppercase letter")
                .Must(password => password.ContainsDigit())
                .WithMessage("Password must contain at least one digit")
                .Must(password => password.ContainsSpecialCharacter())
                .WithMessage("Password must contain at least one special character");

            When(x => x.AccountTypeId != null, () =>
            {
                RuleFor(x => x.AccountTypeId)
                    .MustAsync(async (accountTypeId, token) => await mediator.Send(new AccountTypeExistenceQuery(accountTypeId.Value), token))
                    .WithMessage("Invalid account type id");
            });
        }
    }
}
