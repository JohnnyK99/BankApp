using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Commands.CreateBankAccount
{
    public interface ICreateBankAccountDalCommand
    {
        Task CreateBankAccountAsync(string userId, int accountTypeId, int initialBalance);
    }
}
