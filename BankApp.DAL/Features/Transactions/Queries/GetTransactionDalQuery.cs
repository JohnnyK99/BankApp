using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Features.Transactions.Queries.GetTransactionConfirmation;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
            return await _dbContext.Transactions.Where(tr => tr.Id == transactionId)
                .Select(tr => new Transaction()
                {
                    Id = tr.Id,
                    AccountNumberFrom = tr.AccountFrom.AccountNumber,
                    AccountNumberTo = tr.AccountTo.AccountNumber,
                    Title = tr.Title,
                    Description = tr.Description,
                    Date = tr.Date,
                    Amount = tr.Amount,
                })
                .FirstAsync();
        }
    }
}
