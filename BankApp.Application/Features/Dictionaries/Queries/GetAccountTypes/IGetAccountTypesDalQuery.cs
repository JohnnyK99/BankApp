using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Dictionaries.Queries.GetAccountTypes
{
    public interface IGetAccountTypesDalQuery
    {
        Task<IEnumerable<AccountTypeDalDto>> GetAccountTypesAsync();
    }
}
