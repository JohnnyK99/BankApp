using BankApp.Application.Constants;
using BankApp.Application.Features.BankAccounts.Commands.CreateBankAccount;
using BankApp.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.Registration.Commands
{
    public class RegisterUserCommand : IRequest<Unit>
    {
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
        public string Password { get; set; }
        public int? AccountTypeId { get; set; }

        public RegisterUserCommand(
            string firstName,
            string lastName,
            string email,
            string password,
            int? accountTypeId)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            AccountTypeId = accountTypeId;
        }

        public class Handler : IRequestHandler<RegisterUserCommand, Unit>
        {
            private readonly IRegisterUserDalCommand _userRegisterDalCommand;
            private readonly ICreateBankAccountDalCommand _createBankAccountDalCommand;

            public Handler(IRegisterUserDalCommand userRegisterDalCommand, ICreateBankAccountDalCommand createBankAccountDalCommand)
            {
                _userRegisterDalCommand = userRegisterDalCommand;
                _createBankAccountDalCommand = createBankAccountDalCommand;
            }

            public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken token)
            {
                var userId = await _userRegisterDalCommand.RegisterUserAsync(request.FirstName, request.LastName, request.Email, request.Password);

                if(request.AccountTypeId.HasValue)
                {
                    await _createBankAccountDalCommand.CreateBankAccountAsync(userId, request.AccountTypeId.Value, BankAccountConstants.InitialBankAccountBalance);
                }

                return Unit.Value;
            }
        }
    }
}
