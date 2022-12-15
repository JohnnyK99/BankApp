using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.Existence
{
    public class BankAccountExistenceByNumberQuery : IRequest<bool>
    {
        public string AccountNumber { get; }

        public BankAccountExistenceByNumberQuery(string accountNumber)
        {
            AccountNumber = accountNumber;
        }

        public class Handler : IRequestHandler<BankAccountExistenceByNumberQuery, bool>
        {
            private readonly IBankAccountExistenceDalQuery _bankAccountExistenceDalQuery;

            public Handler(IBankAccountExistenceDalQuery bankAccountExistenceDalQuery)
            {
                _bankAccountExistenceDalQuery = bankAccountExistenceDalQuery;
            }

            public async Task<bool> Handle(BankAccountExistenceByNumberQuery request, CancellationToken cancellationToken)
            {
                return await _bankAccountExistenceDalQuery.DoesBankAccountExistByNumberAsync(request.AccountNumber);
            }
        }
    }
}
