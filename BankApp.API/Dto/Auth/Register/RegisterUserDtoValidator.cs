using FluentValidation;
using BankApp.API.Extensions;
using BankApp.API.Constants.Auth;

namespace BankApp.API.Dto.Auth.Register
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("First name must not be empty.");

            RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("Last name must not be empty");

            RuleFor(x => x.Email)
                .EmailAddress()
                .WithMessage("Valid email address must be provided.");

            RuleFor(x => x.Password)
                .MinimumLength(AuthConstants.MinPasswordLength)
                .WithMessage($"Password must have at least {AuthConstants.MinPasswordLength} characters")
                .Must(password => password.ContainsUpperCase())
                .WithMessage("Password must contain at least one uppercase letter")
                .Must(password => password.ContainsDigit())
                .WithMessage("Password must contain at least one digit")
                .Must(password => password.ContainsSpecialCharacter())
                .WithMessage("Password must contain at least one special character");
        }
    }
}
