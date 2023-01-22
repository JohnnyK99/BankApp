using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Commands.RemoveRecipient
{
    public interface IRemoveRecipientDalCommand
    {
        Task RemoveRecipient(string userId, int accountId);
    }
}
