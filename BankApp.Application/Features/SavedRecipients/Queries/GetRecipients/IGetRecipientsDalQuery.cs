using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Queries.GetRecipients
{
    public interface IGetRecipientsDalQuery
    {
        Task<IEnumerable<SavedRecipient>> GetRecipients(string userId);
    }
}
