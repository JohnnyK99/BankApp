using BankApp.Application.Constants.Enums;
using BankApp.Application.Wrappers;
using System;
using System.Collections.Generic;

namespace BankApp.API.Dto.Transactions.GetTransactions
{
    public class GetTransactionsDto : ListParams
    {
        public string BankAccountNumber { get; set; }
        public List<TransactionType> TransactionTypes { get; set; } = new();
        public string SearchBy { get; set; } = string.Empty;
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

    }
}
