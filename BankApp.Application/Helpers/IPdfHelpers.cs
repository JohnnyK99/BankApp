using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using System.IO;

namespace BankApp.Application.Helpers
{
    public interface IPdfHelpers
    {
        Stream GetTransactionConfirmation(Transaction transaction);
    }
}
