using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public interface IGetClientBankAccountsDalQuery
    {
        Task<IEnumerable<BankAccountDalDto>> GetClientBankAccountsAsync(string userId);
    }
}
