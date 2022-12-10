using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Users.Queries.GetUserId
{
    public class GetUserIdQuery : IRequest<string>
    {
        public string UserEmail { get; set; }

        public GetUserIdQuery(string userEmail)
        {
            UserEmail = userEmail;
        }

        public class Handler : IRequestHandler<GetUserIdQuery, string>
        {
            private readonly IGetUserIdDalQuery _getUserIdDalQuery;

            public Handler(IGetUserIdDalQuery getUserIdDalQuery)
            {
                _getUserIdDalQuery = getUserIdDalQuery;
            }

            public async Task<string> Handle(GetUserIdQuery request, CancellationToken cancellationToken)
            {
                return await _getUserIdDalQuery.GetUserIdAsync(request.UserEmail);
            }
        }
    }
}
