using BankApp.Application.Constants.Enums;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.GetTransactions
{
    public interface IGetTransactionsDalQuery
    {
        Task<IEnumerable<Transaction>> GetTransactions(
            string bankAccountNumber,
            IEnumerable<TransactionType> transactionTypes,
            string searchBy,
            DateTime? dateFrom,
            DateTime? dateTo,
            string sortColumn,
            SortDirection sortDirection);
    }
}
