using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.BankAccounts.Commands.CreateBankAccount
{
    public interface ICreateBankAccountDalCommand
    {
        Task CreateBankAccountAsync(string userId, int accountTypeId, int initialBalance);
    }
}
