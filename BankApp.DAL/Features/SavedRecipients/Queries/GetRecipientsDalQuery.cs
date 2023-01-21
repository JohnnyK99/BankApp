using BankApp.Application.Features.SavedRecipients.Queries.GetRecipients;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.SavedRecipients.Queries
{
    public class GetRecipientsDalQuery : IDalService, IGetRecipientsDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetRecipientsDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<SavedRecipient>> GetRecipients(string userId)
        {
            return await _dbContext.SavedRecipients.Where(recipient => recipient.UserId == userId)
                                                   .Select(recipient => new SavedRecipient()
                                                   {
                                                       AccountNumber = recipient.BankAccount.AccountNumber,
                                                       Name = recipient.Name
                                                   }).ToListAsync();
        }
    }
}
