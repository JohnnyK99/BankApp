using BankApp.Application.Features.Transactions.Queries.ClientAccess;
using BankApp.DAL.Db;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Transactions.Queries
{
    public class TransactionClientAccessDalQuery : IDalService, ITransactionClientAccessDalQuery
    {
        private readonly AppDbContext _dbContext;

        public TransactionClientAccessDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CanClientAccessTransactionAsync(string username, int transactionId)
        {
            var transaction = await _dbContext.Transactions.FindAsync(transactionId);

            var accountFrom = await _dbContext.BankAccounts.FindAsync(transaction.AccountFromId);
            var accountTo = await _dbContext.BankAccounts.FindAsync(transaction.AccountToId);

            var userFrom = await _dbContext.Users.FindAsync(accountFrom.ClientId);
            var userTo = await _dbContext.Users.FindAsync(accountTo.ClientId);

            return userFrom.UserName == username || userTo.UserName == username;
        }
    }
}
