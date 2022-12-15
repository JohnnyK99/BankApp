using BankApp.DAL.Db;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.BankAccounts.Queries
{
    internal class GetClientBankAccountsDalQuery : IDalService, IGetClientBankAccountsDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetClientBankAccountsDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<BankAccountDalDto>> GetClientBankAccountsAsync(string userId)
        {
            return await _dbContext.BankAccounts.Where(acc => acc.ClientId == userId).Select(acc => new BankAccountDalDto(){
                Id = acc.Id,
                AccountNumber = acc.AccountNumber,
                Balance = acc.Balance,
                AccountType = new()
                {
                    Id = acc.AccountType.Id,
                    Value = acc.AccountType.Name,
                    ValueEng = acc.AccountType.NameEng
                }
            }).ToListAsync();
        }
    }
}
