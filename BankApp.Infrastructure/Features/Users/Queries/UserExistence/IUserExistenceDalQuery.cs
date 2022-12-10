using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Users.Queries.UserExistence
{
    public interface IUserExistenceDalQuery
    {
        Task<bool> DoesUserExistAsync(string userEmail);
    }
}
