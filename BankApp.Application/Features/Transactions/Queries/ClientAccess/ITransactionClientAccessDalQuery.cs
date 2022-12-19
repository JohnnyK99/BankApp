using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.ClientAccess
{
    public interface ITransactionClientAccessDalQuery
    {
        Task<bool> CanClientAccessTransactionAsync(string username, int transactionId);
    }
}
