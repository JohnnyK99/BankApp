using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Features.Transactions.Queries.GetTransactionConfirmation;
using BankApp.DAL.Db;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Transactions.Queries
{
    public class GetTransactionDalQuery : IDalService, IGetTransactionDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetTransactionDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Transaction> GetTransactionAsync(int transactionId)
        {
            var transaction = await _dbContext.Transactions.FindAsync(transactionId);

            return new()
            {
                Id = transaction.Id,
                AccountNumberFrom = transaction.AccountFrom.AccountNumber,
                AccountNumberTo = transaction.AccountTo.AccountNumber,
                Title = transaction.Title,
                Description = transaction.Description,
                Date = transaction.Date,
                Amount = transaction.Amount,
            };
        }
    }
}
