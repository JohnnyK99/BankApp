using BankApp.Infrastructure.Wrappers;
using MediatR;

namespace BankApp.Infrastructure.Features.Auth.Registration.Commands
{
    public class RegisterUserCommand : IRequest<IResult>
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

        public class Handler : IRequestHandler<RegisterUserCommand, IResult>
        {
            private readonly IRegisterUserDalCommand _userRegisterDalCommand;

            public Handler(IRegisterUserDalCommand userRegisterDalCommand)
            {
                _userRegisterDalCommand = userRegisterDalCommand;
            }

            public async Task<IResult> Handle(RegisterUserCommand request, CancellationToken token)
            {
                RegistrationResult result = await _userRegisterDalCommand.RegisterUserAsync(request.FirstName, request.LastName, request.Email, request.Password);

                if (!result.Succeeded)
                {
                    return await Result.FailAsync(result.ErrorMessages);
                }

                return await Result.SuccessAsync();
            }
        }
    }
}
