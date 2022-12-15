using BankApp.Application.Features.BankAccounts.Queries.Existence;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.BankAccounts.Queries
{
    public class BankAccountExistenceDalQuery : IDalService, IBankAccountExistenceDalQuery
    {
        private readonly AppDbContext _dbContext;
        
        public BankAccountExistenceDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DoesBankAccountExistByIdAsync(int accountId)
        {
            return await _dbContext.BankAccounts.AnyAsync(acc => acc.Id == accountId);
        }

        public async Task<bool> DoesBankAccountExistByNumberAsync(string accountNumber)
        {
            return await _dbContext.BankAccounts.AnyAsync(acc => acc.AccountNumber == accountNumber);
        }
    }
}
