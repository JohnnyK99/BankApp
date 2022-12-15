using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.Ownership
{
    public interface IBankAccountOwnershipDalQuery
    {
        Task<bool> DoesUserOwnAccountAsync(string username, string accountNumber);
    }
}
