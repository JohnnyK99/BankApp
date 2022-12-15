using AutoMapper;
using BankApp.Application.Wrappers;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Dictionaries.Queries.GetAccountTypes
{
    public class GetAccountTypesQuery : IRequest<Result<IEnumerable<AccountType>>>
    {
        public class Handler : IRequestHandler<GetAccountTypesQuery, Result<IEnumerable<AccountType>>>
        {
            private readonly IGetAccountTypesDalQuery _getAccountTypesDalQuery;
            private readonly IMapper _mapper;

            public Handler(IGetAccountTypesDalQuery getAccountTypesDalQuery, IMapper mapper)
            {
                _getAccountTypesDalQuery = getAccountTypesDalQuery;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<AccountType>>> Handle(GetAccountTypesQuery request, CancellationToken cancllationToken)
            {
                IEnumerable<AccountTypeDalDto> accountTypesDal = await _getAccountTypesDalQuery.GetAccountTypesAsync();
                IEnumerable<AccountType> accountTypes = _mapper.Map<IEnumerable<AccountType>>(accountTypesDal);

                return await Result<IEnumerable<AccountType>>.SuccessAsync(accountTypes);
            }
        }
    }
}
