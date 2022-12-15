using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.GetBankAccount
{
    public interface IGetBankAccountDalQuery
    {
        Task<BankAccountDalDto> GetBankAccountByNumberAsync(string accountNumber);
    }
}
