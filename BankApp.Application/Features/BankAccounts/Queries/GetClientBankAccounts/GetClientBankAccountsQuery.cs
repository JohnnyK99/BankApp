using AutoMapper;
using BankApp.Application.Wrappers;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class GetClientBankAccountsQuery : IRequest<Result<IEnumerable<BankAccount>>>
    {
        public string UserId { get; set; }
        
        public GetClientBankAccountsQuery(string userId)
        {
            UserId = userId;
        }

        public class Handler : IRequestHandler<GetClientBankAccountsQuery, Result<IEnumerable<BankAccount>>>
        {
            private readonly IGetClientBankAccountsDalQuery _getClientBankAccountsDalQuery;
            private readonly IMapper _mapper;

            public Handler(IGetClientBankAccountsDalQuery getClientBankAccountsDalQuery, IMapper mapper)
            {
                _getClientBankAccountsDalQuery = getClientBankAccountsDalQuery;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<BankAccount>>> Handle(GetClientBankAccountsQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<BankAccountDalDto> bankAccountsDal = await _getClientBankAccountsDalQuery.GetClientBankAccountsAsync(request.UserId);
                IEnumerable <BankAccount> bankAccounts = _mapper.Map<IEnumerable<BankAccount>>(bankAccountsDal);

                return await Result<IEnumerable<BankAccount>>.SuccessAsync(bankAccounts);
            }
        }
    }
}
