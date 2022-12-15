using System.Threading.Tasks;

namespace BankApp.Application.Features.BankAccounts.Queries.Existence
{
    public interface IBankAccountExistenceDalQuery
    {
        Task<bool> DoesBankAccountExistByNumberAsync(string accountNumber);
    }
}
