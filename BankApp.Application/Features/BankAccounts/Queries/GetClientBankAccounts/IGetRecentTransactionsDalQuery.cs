using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public interface IGetRecentTransactionsDalQuery
    {
        Task<IEnumerable<Transaction>> GetRecentTransactions(int accountId, int numberOfTransactions);
    }
}
