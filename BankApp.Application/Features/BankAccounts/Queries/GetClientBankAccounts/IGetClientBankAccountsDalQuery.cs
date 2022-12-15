using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public interface IGetClientBankAccountsDalQuery
    {
        Task<IEnumerable<BankAccountDalDto>> GetClientBankAccountsAsync(string userId);
    }
}
