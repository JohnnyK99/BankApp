using BankApp.Application.Features.Transactions.Commands.CreateTransaction;
using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Transactions.Commands
{
    public class CreateTransactionDalCommand : IDalService, ICreateTransactionDalCommand
    {
        private readonly AppDbContext _dbContext;

        public CreateTransactionDalCommand(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateTransactionAsync(
            string accountNumberFrom,
            string accountNumberTo,
            string title,
            string description,
            double amount,
            DateTime date)
        {
            var accountFrom = await _dbContext.BankAccounts.FirstAsync(acc => acc.AccountNumber == accountNumberFrom);
            var accountTo = await _dbContext.BankAccounts.FirstAsync(acc => acc.AccountNumber == accountNumberTo);

            TransactionEntity transaction = new()
            {
                Title = title,
                Description = description,
                Amount = amount,
                AccountFromId = accountFrom.Id,
                AccountToId = accountTo.Id,
                Date = date,
            };

            accountFrom.Balance -= amount;
            accountTo.Balance += amount;

            _dbContext.Transactions.Add(transaction);

            await _dbContext.SaveChangesAsync();
        }
    }
}
