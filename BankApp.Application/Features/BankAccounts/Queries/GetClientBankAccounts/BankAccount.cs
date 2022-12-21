using BankApp.Application.Wrappers.Translations;
using System.Collections.Generic;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class BankAccount
    {
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public double Balance { get; set; }
        public IdTranslations AccountType { get; set; }
        public IEnumerable<Transaction> RecentTransactions { get; set; }
    }
}
