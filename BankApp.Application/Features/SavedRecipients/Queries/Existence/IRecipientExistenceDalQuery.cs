using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Queries.Existence
{
    public interface IRecipientExistenceDalQuery
    {
        Task<bool> ExistsRecipient(string userId, int accountId);
    }
}
