using BankApp.Application.Features.SavedRecipients.Queries.Existence;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.SavedRecipients.Queries
{
    public class RecipientExistenceDalQuery : IDalService, IRecipientExistenceDalQuery
    {
        private readonly AppDbContext _dbContext;

        public RecipientExistenceDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> ExistsRecipient(string userId, int accountId)
        {
            return await _dbContext.SavedRecipients.AnyAsync(recipient => recipient.UserId == userId && recipient.AccountId == accountId);
        }
    }
}
