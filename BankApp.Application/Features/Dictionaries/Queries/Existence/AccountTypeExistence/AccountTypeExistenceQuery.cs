using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Dictionaries.Queries.Existence.AccountTypeExistence
{
    public class AccountTypeExistenceQuery : IRequest<bool>
    {
        public int AccountTypeId { get; }

        public AccountTypeExistenceQuery(int accountTypeId)
        {
            AccountTypeId = accountTypeId;
        }

        public class Handler : IRequestHandler<AccountTypeExistenceQuery, bool>
        {
            private readonly IAccountTypeExistenceDalQuery _accountTypeExistenceDalQuery;

            public Handler(IAccountTypeExistenceDalQuery accountTypeExistenceDalQuery)
            {
                _accountTypeExistenceDalQuery = accountTypeExistenceDalQuery;
            }

            public async Task<bool> Handle(AccountTypeExistenceQuery request, CancellationToken cancellationToken)
            {
                return await _accountTypeExistenceDalQuery.DoesAccountTypeExistAsync(request.AccountTypeId);
            }
        }
    }
}
