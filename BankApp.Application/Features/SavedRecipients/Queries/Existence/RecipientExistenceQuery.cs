using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Queries.Existence
{
    public class RecipientExistenceQuery : IRequest<bool>
    {
        public string UserId { get; }
        public string AccountNumber { get; }

        public RecipientExistenceQuery(string userId, string accountNumber)
        {
            UserId = userId;
            AccountNumber = accountNumber;
        }

        public class Handler : IRequestHandler<RecipientExistenceQuery, bool>
        {
            private readonly IGetBankAccountDalQuery _getBankAccountDalQuery;
            private readonly IRecipientExistenceDalQuery _recipientExistenceDalQuery;

            public Handler(IGetBankAccountDalQuery getBankAccountDalQuery, IRecipientExistenceDalQuery recipientExistenceDalQuery)
            {
                _getBankAccountDalQuery = getBankAccountDalQuery;
                _recipientExistenceDalQuery = recipientExistenceDalQuery;
            }

            public async Task<bool> Handle(RecipientExistenceQuery request, CancellationToken cancellationToken)
            {
                var account = await _getBankAccountDalQuery.GetBankAccountByNumberAsync(request.AccountNumber);

                return await _recipientExistenceDalQuery.ExistsRecipient(request.UserId, account.Id);
            }
        }
    }
}
