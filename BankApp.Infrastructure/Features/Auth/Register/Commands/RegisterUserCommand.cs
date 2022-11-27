using BankApp.Infrastructure.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Auth.Registration.Commands
{
    public class RegisterUserCommand : IRequest<Result<bool>>
    {
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
        public string Password { get; set; }

        public RegisterUserCommand(
            string firstName,
            string lastName,
            string email,
            string password)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
        }

        public class Handler : IRequestHandler<RegisterUserCommand, Result<bool>>
        {
            private readonly IRegisterUserDalCommand _userRegisterDalCommand;

            public Handler(IRegisterUserDalCommand userRegisterDalCommand)
            {
                _userRegisterDalCommand = userRegisterDalCommand;
            }

            public async Task<Result<bool>> Handle(RegisterUserCommand request, CancellationToken token)
            {
                RegistrationResult result = await _userRegisterDalCommand.RegisterUserAsync(request.FirstName, request.LastName, request.Email, request.Password);

                if (!result.Succeeded)
                {
                    return await Result<bool>.FailAsync(result.ErrorMessages);
                }

                return await Result<bool>.SuccessAsync();
            }
        }
    }
}
