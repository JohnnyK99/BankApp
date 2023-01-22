using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Commands.RemoveRecipient
{
    public class RemoveRecipientCommand : IRequest<Unit>
    {
        public string UserId { get; }
        public string AccountNumber { get; }

        public RemoveRecipientCommand(string userId, string accountNumber)
        {
            UserId = userId;
            AccountNumber = accountNumber;
        }

        public class Handler : IRequestHandler<RemoveRecipientCommand, Unit>
        {
            private readonly IGetBankAccountDalQuery _getBankAccountDalQuery;
            private readonly IRemoveRecipientDalCommand _removeRecipientDalCommand;

            public Handler(IGetBankAccountDalQuery getBankAccountDalQuery, IRemoveRecipientDalCommand removeRecipientDalCommand)
            {
                _getBankAccountDalQuery = getBankAccountDalQuery;
                _removeRecipientDalCommand = removeRecipientDalCommand;
            }

            public async Task<Unit> Handle(RemoveRecipientCommand request, CancellationToken cancellationToken)
            {
                var account = await _getBankAccountDalQuery.GetBankAccountByNumberAsync(request.AccountNumber);

                await _removeRecipientDalCommand.RemoveRecipient(request.UserId, account.Id);

                return Unit.Value;
            }
        }
    }
}
