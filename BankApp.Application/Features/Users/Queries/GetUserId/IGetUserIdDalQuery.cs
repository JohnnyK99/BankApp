using System.Threading.Tasks;

namespace BankApp.Application.Features.Users.Queries.GetUserId
{
    public interface IGetUserIdDalQuery
    {
        Task<string> GetUserIdAsync(string email);
    }
}
