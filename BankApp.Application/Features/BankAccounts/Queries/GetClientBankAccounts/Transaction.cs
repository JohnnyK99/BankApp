using BankApp.Application.Constants.Enums;
using System;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class Transaction
    {
        public int Id { get; set; }
        public string AccountNumberFrom { get; set; }
        public string AccountNumberTo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}
