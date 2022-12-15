using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.Ownership
{
    public class BankAccountOwnershipQuery : IRequest<bool>
    {
        public string Username { get; }
        public string AccountNumber { get; }

        public BankAccountOwnershipQuery(string username, string accountNumber)
        {
            Username = username;
            AccountNumber = accountNumber;
        }

        public class Handler : IRequestHandler<BankAccountOwnershipQuery, bool>
        {
            private readonly IBankAccountOwnershipDalQuery _bankAccountOwnershipDalQuery;

            public Handler(IBankAccountOwnershipDalQuery bankAccountOwnershipDalQuery)
            {
                _bankAccountOwnershipDalQuery = bankAccountOwnershipDalQuery;
            }

            public async Task<bool> Handle(BankAccountOwnershipQuery request, CancellationToken cancellationToken)
            {
                return await _bankAccountOwnershipDalQuery.DoesUserOwnAccountAsync(request.Username, request.AccountNumber);
            }
        }
    }
}
