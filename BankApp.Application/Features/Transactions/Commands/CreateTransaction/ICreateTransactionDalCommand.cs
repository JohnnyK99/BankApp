using System;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Commands.CreateTransaction
{
    public interface ICreateTransactionDalCommand
    {
        Task<int> CreateTransactionAsync(
            string accountNumberFrom,
            string accountNumberTo,
            string title,
            string description,
            double amount,
            DateTime date);
    }
}
