using BankApp.Application.Features.Dictionaries.Queries.GetAccountTypes;
using BankApp.Application.Wrappers;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class BankAccount
    {
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public double Balance { get; set; }
        public IdTranslations AccountType { get; set; }
    }
}
