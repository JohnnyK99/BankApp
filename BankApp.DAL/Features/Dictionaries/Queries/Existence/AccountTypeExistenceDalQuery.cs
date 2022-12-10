using BankApp.DAL.Db;
using BankApp.Infrastructure.Features.Dictionaries.Queries.Existence.AccountTypeExistence;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Dictionaries.Queries.Existence
{
    public class AccountTypeExistenceDalQuery : IAccountTypeExistenceDalQuery
    {
        private readonly AppDbContext _dbContext;

        public AccountTypeExistenceDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DoesAccountTypeExistAsync(int accountTypeId)
        {
            return await _dbContext.AccountTypes.AnyAsync(accType => accType.Id == accountTypeId);
        }
    }
}
