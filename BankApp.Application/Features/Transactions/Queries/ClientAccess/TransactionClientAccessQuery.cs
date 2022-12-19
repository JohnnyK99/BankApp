using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.ClientAccess
{
    public class TransactionClientAccessQuery : IRequest<bool>
    {
        public string Username { get; }
        public int TransactionId { get; }

        public TransactionClientAccessQuery(string username, int transactionId)
        {
            Username = username;
            TransactionId = transactionId;
        }

        public class Handler : IRequestHandler<TransactionClientAccessQuery, bool>
        {
            private readonly ITransactionClientAccessDalQuery _transactionClientAccessDalQuery;

            public Handler(ITransactionClientAccessDalQuery transactionClientAccessDalQuery)
            {
                _transactionClientAccessDalQuery = transactionClientAccessDalQuery;
            }

            public async Task<bool> Handle(TransactionClientAccessQuery request, CancellationToken cancellationToken)
            {
                return await _transactionClientAccessDalQuery.CanClientAccessTransactionAsync(request.Username, request.TransactionId);
            }
        }
    }
}
