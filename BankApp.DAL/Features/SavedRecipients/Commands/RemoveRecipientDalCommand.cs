using BankApp.Application.Features.SavedRecipients.Commands.RemoveRecipient;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.SavedRecipients.Commands
{
    public class RemoveRecipientDalCommand : IDalService, IRemoveRecipientDalCommand
    {
        private readonly AppDbContext _dbContext;

        public RemoveRecipientDalCommand(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task RemoveRecipient(string userId, int accountId)
        {
            var recipient = await _dbContext.SavedRecipients.FirstAsync(recipient => recipient.UserId == userId && recipient.AccountId == accountId);

            _dbContext.SavedRecipients.Remove(recipient);

            await _dbContext.SaveChangesAsync();
        }
    }
}
