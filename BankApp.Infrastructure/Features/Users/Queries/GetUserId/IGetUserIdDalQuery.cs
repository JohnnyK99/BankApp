using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Users.Queries.GetUserId
{
    public interface IGetUserIdDalQuery
    {
        Task<string> GetUserIdAsync(string email);
    }
}
