using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.Existence
{
    public interface ITransactionExistenceDalQuery
    {
        Task<bool> DoesTransactionExistAsync(int transactionId);
    }
}
