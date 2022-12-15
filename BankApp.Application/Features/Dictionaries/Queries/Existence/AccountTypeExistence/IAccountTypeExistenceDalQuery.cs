using System.Threading.Tasks;

namespace BankApp.Application.Features.Dictionaries.Queries.Existence.AccountTypeExistence
{
    public interface IAccountTypeExistenceDalQuery
    {
        Task<bool> DoesAccountTypeExistAsync(int accountTypeId);
    }
}
