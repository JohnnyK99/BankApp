using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Commands.AddRecipient
{
    public interface IAddRecipientDalCommand
    {
        Task AddRecipient(string userId, int accountId, string name);
    }
}
