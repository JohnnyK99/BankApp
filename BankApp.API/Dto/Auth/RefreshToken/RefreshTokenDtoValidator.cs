using FluentValidation;

namespace BankApp.API.Dto.Auth.RefreshToken
{
    public class RefreshTokenDtoValidator : AbstractValidator<RefreshTokenDto>
    {
        public RefreshTokenDtoValidator()
        {
            RuleFor(x => x.AccessToken)
                .NotEmpty()
                .WithMessage("Access token must not be empty");

            RuleFor(x => x.RefreshToken)
                .NotEmpty()
                .WithMessage("Refresh token must not be empty");
        }
    }
}
