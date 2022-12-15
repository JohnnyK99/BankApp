using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Users.Queries.UserExistence
{
    public class UserExistenceQuery : IRequest<bool>
    {
        public string UserEmail { get; set; }

        public UserExistenceQuery(string userEmail)
        {
            UserEmail = userEmail;
        }

        public class Handler : IRequestHandler<UserExistenceQuery, bool>
        {
            private readonly IUserExistenceDalQuery _userExistenceDalQuery;

            public Handler(IUserExistenceDalQuery userExistenceDalQuery)
            {
                _userExistenceDalQuery = userExistenceDalQuery;
            }

            public async Task<bool> Handle(UserExistenceQuery request, CancellationToken token)
            {
                return await _userExistenceDalQuery.DoesUserExistAsync(request.UserEmail);
            }
        }
    }
}
