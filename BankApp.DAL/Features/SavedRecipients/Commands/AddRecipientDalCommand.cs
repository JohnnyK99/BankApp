using BankApp.Application.Features.SavedRecipients.Commands.AddRecipient;
using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.SavedRecipients.Commands
{
    public class AddRecipientDalCommand : IDalService, IAddRecipientDalCommand
    {
        private readonly AppDbContext _dbContext;

        public AddRecipientDalCommand(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddRecipient(string userId, int accountId, string name)
        {
            SavedRecipientEntity recipient = new()
            {
                UserId = userId,
                AccountId = accountId,
                Name = name
            };

            _dbContext.SavedRecipients.Add(recipient);

            await _dbContext.SaveChangesAsync();
        }
    }
}
