using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.GetTransactionConfirmation
{
    public interface IGetTransactionDalQuery
    {
        Task<Transaction> GetTransactionAsync(int transactionId);
    }
}
