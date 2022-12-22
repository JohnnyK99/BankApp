using BankApp.Application.Features.BankAccounts.Queries.Ownership;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.BankAccounts.Queries
{
    public class BankAccountOwnershipDalQuery : IDalService, IBankAccountOwnershipDalQuery
    {
        private readonly AppDbContext _dbContext;

        public BankAccountOwnershipDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DoesUserOwnAccountAsync(string username, string accountNumber)
        {
            var account = await _dbContext.BankAccounts.First(acc => acc.AccountNumber == accountNumber).User.;
            var user = await _dbContext.Users.FindAsync(account.ClientId);
            return user.UserName == username;
        }
    }
}
