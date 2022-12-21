using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using BankApp.Application.Features.BankAccounts.Commands.CreateBankAccount;
using System.Linq;
using System.Threading.Tasks;
using BankApp.DAL.Helpers.BankAccount;

namespace BankApp.DAL.Features.BankAccounts.Commands
{
    public class CreateBankAccountDalCommand : IDalService, ICreateBankAccountDalCommand
    {
        private readonly AppDbContext _dbContext;
        private readonly IBankAccountHelpers _bankAccountHelpers;

        public CreateBankAccountDalCommand(AppDbContext dbContext, IBankAccountHelpers bankAccountHelpers)
        {
            _dbContext = dbContext;
            _bankAccountHelpers = bankAccountHelpers;
        }

        public async Task CreateBankAccountAsync(string userId, int accountTypeId, int initialBalance)
        {
            int maxAccountId = _dbContext.BankAccounts.Any() ? _dbContext.BankAccounts.Max(acc => acc.Id) : 0;
            string accountNumber = _bankAccountHelpers.GenerateAccountNumber(maxAccountId + 1);

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
