using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankApp.Application.Constants.Enums;

namespace BankApp.DAL.Features.Transactions.Queries
{
    public class GetRecentTransactionsDalQuery : IDalService, IGetRecentTransactionsDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetRecentTransactionsDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Transaction>> GetRecentTransactions(int accountId, int numberOfTransactions)
        {
            return await _dbContext.Transactions.Where(tr => tr.AccountFromId == accountId || tr.AccountToId == accountId)
                                          .OrderByDescending(tr => tr.Date)
                                          .Take(numberOfTransactions)
                                          .Select(tr => new Transaction()
                                          {
                                              Id = tr.Id,
                                              AccountNumberTo = _dbContext.BankAccounts.First(acc => acc.Id == tr.AccountToId).AccountNumber,
                                              AccountNumberFrom = _dbContext.BankAccounts.First(acc => acc.Id == tr.AccountFromId).AccountNumber,
                                              Title = tr.Title,
                                              Description = tr.Description,
                                              Date = tr.Date,
                                              Amount = tr.Amount,
                                              TransactionType = tr.AccountFromId == accountId ? TransactionType.Outcoming : TransactionType.Incoming
                                          })
                                          .ToListAsync();
        }
    }
}
