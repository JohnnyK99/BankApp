using BankApp.Application.Features.Transactions.Queries.Existence;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Transactions.Queries
{
    internal class TransactionExistenceDalQuery : IDalService, ITransactionExistenceDalQuery
    {
        private readonly AppDbContext _dbContext;

        public TransactionExistenceDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DoesTransactionExistAsync(int transactionId)
        {
            return await _dbContext.Transactions.AnyAsync(tr => tr.Id == transactionId);
        }
    }
}
