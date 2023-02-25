using BankApp.Application.Constants;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Commands.CreateBankAccount
{
    public class CreateBankAccountCommand : IRequest<Unit>
    {
        public string UserId { get; }
        public int AccountTypeId { get; }

        public CreateBankAccountCommand(string userId, int accountTypeId)
        {
            UserId = userId;
            AccountTypeId = accountTypeId;
        }

        public class Handler : IRequestHandler<CreateBankAccountCommand, Unit>
        {
            private readonly ICreateBankAccountDalCommand _createBankAccountDalCommand;

            public Handler(ICreateBankAccountDalCommand createBankAccountDalCommand)
            {
                _createBankAccountDalCommand = createBankAccountDalCommand;
            }

            public async Task<Unit> Handle(CreateBankAccountCommand request, CancellationToken cancellationToken)
            {
                await _createBankAccountDalCommand.CreateBankAccountAsync(request.UserId, request.AccountTypeId, BankAccountConstants.InitialBankAccountBalance);
                return Unit.Value;
            }
        }
    }
}
