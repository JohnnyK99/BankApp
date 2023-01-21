using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Commands
{
    public class AddRecipientCommand : IRequest<Unit>
    {
        public string UserId { get; }
        public string AccountNumber { get; }
        public string Name { get; }

        public AddRecipientCommand(string userId, string accountNumber, string name)
        {
            UserId = userId;
            AccountNumber = accountNumber;
            Name = name;
        }

        public class Handler : IRequestHandler<AddRecipientCommand, Unit>
        {
            private readonly IAddRecipientDalCommand _addRecipientDalCommand;
            private readonly IGetBankAccountDalQuery _getBankAccountDalQuery;

            public Handler(IAddRecipientDalCommand addRecipientDalCommand, IGetBankAccountDalQuery getBankAccountDalQuery)
            {
                _addRecipientDalCommand = addRecipientDalCommand;
                _getBankAccountDalQuery = getBankAccountDalQuery;
            }

            public async Task<Unit> Handle(AddRecipientCommand request, CancellationToken cancellationToken)
            {
                var account = await _getBankAccountDalQuery.GetBankAccountByNumberAsync(request.AccountNumber);

                await _addRecipientDalCommand.AddRecipient(request.UserId, account.Id, request.Name);

                return Unit.Value;
            }
        }
    }
}
