using BankApp.Application.Constants.Enums;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Features.Transactions.Queries.GetTransactions;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Transactions.Queries
{
    public class GetTransactionsDalQuery : IDalService, IGetTransactionsDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetTransactionsDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Transaction>> GetTransactions(
            string bankAccountNumber,
            IEnumerable<TransactionType> transactionTypes,
            string searchBy,
            DateTime? dateFrom,
            DateTime? dateTo,
            string sortColumn,
            SortDirection sortDirection)
        {
            var transactions = await _dbContext.Transactions.Where(tr => 
            (tr.AccountFrom.AccountNumber == bankAccountNumber || tr.AccountTo.AccountNumber == bankAccountNumber) &&
            (searchBy == null || tr.Title.ToLower().Contains(searchBy) || tr.Description.ToLower().Contains(searchBy)) &&
            (dateFrom == null || tr.Date >= dateFrom) &&
            (dateTo == null || tr.Date <= dateTo))
            .Select(tr => new Transaction()
            {
                Id = tr.Id,
                AccountNumberFrom = tr.AccountFrom.AccountNumber,
                AccountNumberTo = tr.AccountTo.AccountNumber,
                Title = tr.Title,
                Description = tr.Description,
                Date = tr.Date,
                Amount = tr.Amount,
                TransactionType = tr.AccountFrom.AccountNumber == bankAccountNumber ? TransactionType.Outcoming : TransactionType.Incoming
            })
            .Where(tr => transactionTypes.Contains(tr.TransactionType))
            .ToListAsync();

            if(sortColumn == null)
            {
                return transactions;
            }

            PropertyInfo sortProperty = typeof(Transaction).GetProperty(sortColumn);

            if(sortDirection == SortDirection.Asc)
            {
                return transactions.OrderBy(tr => sortProperty.GetValue(tr, null));
            }

            return transactions.OrderByDescending(tr => sortProperty.GetValue(tr, null));
        }
    }
}
