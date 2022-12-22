using BankApp.DAL.Db;
using BankApp.Application.Features.Users.Queries.GetUserId;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Users.Queries
{
    public class GetUserIdDalQuery : IDalService, IGetUserIdDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetUserIdDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetUserIdAsync(string email)
        {
            var user = await _dbContext.Users.FirstAsync(user => user.NormalizedEmail == email.Normalize());
            return user.Id;
        }
    }
}
