using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.Existence
{
    public class TransactionExistenceQuery : IRequest<bool>
    {
        public int TransactionId { get; }

        public TransactionExistenceQuery(int transactionId)
        {
            TransactionId = transactionId;
        }

        public class Handler : IRequestHandler<TransactionExistenceQuery, bool>
        {
            private readonly ITransactionExistenceDalQuery _transactionExistenceDalQuery;

            public Handler(ITransactionExistenceDalQuery transactionExistenceDalQuery)
            {
                _transactionExistenceDalQuery = transactionExistenceDalQuery;
            }

            public async Task<bool> Handle(TransactionExistenceQuery request, CancellationToken cancellationToken)
            {
                return await _transactionExistenceDalQuery.DoesTransactionExistAsync(request.TransactionId);
            }
        }
    }
}
