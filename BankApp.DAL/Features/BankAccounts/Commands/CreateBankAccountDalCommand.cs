using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using BankApp.DAL.Helpers;
using BankApp.Infrastructure.Features.BankAccounts.Commands.CreateBankAccount;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.BankAccounts.Commands
{
    public class CreateBankAccountDalCommand : ICreateBankAccountDalCommand
    {
        private readonly AppDbContext _dbContext;
        private readonly BankAccountHelpers _bankAccountHelpers;

        public CreateBankAccountDalCommand(AppDbContext dbContext, BankAccountHelpers bankAccountHelpers)
        {
            _dbContext = dbContext;
            _bankAccountHelpers = bankAccountHelpers;
        }

        public async Task CreateBankAccountAsync(string userId, int accountTypeId, int initialBalance)
        {
            int newAccountId = _dbContext.BankAccounts.Any() ? _dbContext.BankAccounts.Max(acc => acc.Id) : 1;
            string accountNumber = _bankAccountHelpers.GenerateAccountNumber(newAccountId);

            BankAccountEntity account = new()
            {
                AccountNumber = accountNumber,
                Balance = initialBalance,
                AccountTypeId = accountTypeId,
                ClientId = userId
            };

            _dbContext.BankAccounts.Add(account);

            await _dbContext.SaveChangesAsync();
        }
    }
}
