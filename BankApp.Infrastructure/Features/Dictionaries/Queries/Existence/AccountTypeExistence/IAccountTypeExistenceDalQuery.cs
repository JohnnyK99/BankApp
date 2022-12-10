using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Dictionaries.Queries.Existence.AccountTypeExistence
{
    public interface IAccountTypeExistenceDalQuery
    {
        Task<bool> DoesAccountTypeExistAsync(int accountTypeId);
    }
}
