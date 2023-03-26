using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;

namespace BankApp.Application.Helpers
{
    public interface IPdfHelpers
    {
        byte[] GetTransactionConfirmation(Transaction transaction, string language);
    }
}
