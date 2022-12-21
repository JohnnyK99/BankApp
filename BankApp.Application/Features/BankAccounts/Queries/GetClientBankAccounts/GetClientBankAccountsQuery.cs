using AutoMapper;
using BankApp.Application.Constants;
using BankApp.Application.Wrappers.Result;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class GetClientBankAccountsQuery : IRequest<Result<IEnumerable<BankAccount>>>
    {
        public string UserId { get; }
        
        public GetClientBankAccountsQuery(string userId)
        {
            UserId = userId;
        }

        public class Handler : IRequestHandler<GetClientBankAccountsQuery, Result<IEnumerable<BankAccount>>>
        {
            private readonly IGetClientBankAccountsDalQuery _getClientBankAccountsDalQuery;
            private readonly IGetRecentTransactionsDalQuery _getRecentTransactionsDalQuery;
            private readonly IMapper _mapper;

            public Handler(IGetClientBankAccountsDalQuery getClientBankAccountsDalQuery, IGetRecentTransactionsDalQuery getRecentTransactionsDalQuery, IMapper mapper)
            {
                _getClientBankAccountsDalQuery = getClientBankAccountsDalQuery;
                _getRecentTransactionsDalQuery = getRecentTransactionsDalQuery;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<BankAccount>>> Handle(GetClientBankAccountsQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<BankAccountDalDto> bankAccountsDal = await _getClientBankAccountsDalQuery.GetClientBankAccountsAsync(request.UserId);
                IEnumerable<BankAccount> bankAccounts = _mapper.Map<IEnumerable<BankAccount>>(bankAccountsDal);

                foreach(var account in bankAccounts)
                {
                    account.RecentTransactions = await _getRecentTransactionsDalQuery.GetRecentTransactions(account.Id, BankAccountConstants.NumberOfRecentTransactions);
                }

                return await Result<IEnumerable<BankAccount>>.SuccessAsync(bankAccounts);
            }
        }
    }
}
