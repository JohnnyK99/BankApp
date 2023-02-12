using BankApp.Application.Wrappers.Result;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.Clients.Queries
{
    public class GetClientsQuery : IRequest<Result<IEnumerable<Client>>>
    {
        public string SearchBy { get; }

        public GetClientsQuery(string searchBy)
        {
            SearchBy = searchBy;
        }

        public class Handler : IRequestHandler<GetClientsQuery, Result<IEnumerable<Client>>>
        {
            private readonly IGetClientsDalQuery _getClientsDalQuery;

            public Handler(IGetClientsDalQuery getClientsDalQuery)
            {
                _getClientsDalQuery = getClientsDalQuery;
            }

            public async Task<Result<IEnumerable<Client>>> Handle(GetClientsQuery request, CancellationToken cancllationToken)
            {
                IEnumerable<Client> clients = await _getClientsDalQuery.GetClientsAsync(request.SearchBy);

                return await Result<IEnumerable<Client>>.SuccessAsync(clients);
            }
        }
    }
}
