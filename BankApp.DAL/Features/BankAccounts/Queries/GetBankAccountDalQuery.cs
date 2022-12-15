using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.BankAccounts.Queries
{
    public class GetBankAccountDalQuery : IDalService, IGetBankAccountDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetBankAccountDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<BankAccountDalDto> GetBankAccountByNumberAsync(string accountNumber)
        {
            var account = await _dbContext.BankAccounts.FirstAsync(acc => acc.AccountNumber == accountNumber);
            var accountType = await _dbContext.AccountTypes.FindAsync(account.AccountTypeId);

            return new()
            {
                Id = account.Id,
                AccountNumber = account.AccountNumber,
                Balance = account.Balance,
                AccountType = new()
                {
                    Id = accountType.Id,
                    Value = accountType.Name,
                    ValueEng = accountType.NameEng
                }
            };
        }
    }
}
