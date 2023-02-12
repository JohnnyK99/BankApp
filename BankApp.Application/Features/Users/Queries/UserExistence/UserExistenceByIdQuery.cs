using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Users.Queries.UserExistence
{
    public class UserExistenceByIdQuery : IRequest<bool>
    {
        public string UserId { get; }

        public UserExistenceByIdQuery(string userId)
        {
            UserId = userId;
        }

        public class Handler : IRequestHandler<UserExistenceByIdQuery, bool>
        {
            private readonly IUserExistenceDalQuery _userExistenceDalQuery;

            public Handler(IUserExistenceDalQuery userExistenceDalQuery)
            {
                _userExistenceDalQuery = userExistenceDalQuery;
            }

            public async Task<bool> Handle(UserExistenceByIdQuery request, CancellationToken token)
            {
                return await _userExistenceDalQuery.DoesUserExistByIdAsync(request.UserId);
            }
        }
    }
}
