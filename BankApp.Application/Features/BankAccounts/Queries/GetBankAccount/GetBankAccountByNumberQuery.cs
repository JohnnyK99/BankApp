using AutoMapper;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.GetBankAccount
{
    public class GetBankAccountByNumberQuery : IRequest<BankAccount>
    {
        public string AccountNumber { get; }

        public GetBankAccountByNumberQuery(string accountNumber)
        {
            AccountNumber = accountNumber;
        }

        public class Handler : IRequestHandler<GetBankAccountByNumberQuery, BankAccount>
        {
            private readonly IGetBankAccountDalQuery _getBankAccountDalQuery;
            private readonly IMapper _mapper;

            public Handler(IGetBankAccountDalQuery getBankAccountDalQuery, IMapper mapper)
            {
                _getBankAccountDalQuery = getBankAccountDalQuery;
                _mapper = mapper;
            }

            public async Task<BankAccount> Handle(GetBankAccountByNumberQuery request, CancellationToken cancellationToken)
            {
                BankAccountDalDto bankAccountDal = await _getBankAccountDalQuery.GetBankAccountByNumberAsync(request.AccountNumber);
                BankAccount bankAccount = _mapper.Map<BankAccount>(bankAccountDal);

                return bankAccount;
            }
        }
    }
}
