using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Users.Queries.UserExistence
{
    public class UserExistenceByEmailQuery : IRequest<bool>
    {
        public string UserEmail { get; set; }

        public UserExistenceByEmailQuery(string userEmail)
        {
            UserEmail = userEmail;
        }

        public class Handler : IRequestHandler<UserExistenceByEmailQuery, bool>
        {
            private readonly IUserExistenceDalQuery _userExistenceDalQuery;

            public Handler(IUserExistenceDalQuery userExistenceDalQuery)
            {
                _userExistenceDalQuery = userExistenceDalQuery;
            }

            public async Task<bool> Handle(UserExistenceByEmailQuery request, CancellationToken token)
            {
                return await _userExistenceDalQuery.DoesUserExistByEmailAsync(request.UserEmail);
            }
        }
    }
}
