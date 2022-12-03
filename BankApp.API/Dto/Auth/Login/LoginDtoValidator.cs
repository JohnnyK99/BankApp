using FluentValidation;

namespace BankApp.API.Dto.Auth.Login
{
    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.Email)
                .EmailAddress()
                .WithMessage("Valid email address must be provided");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password must not be empty");
        }
    }
}

