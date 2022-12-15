using System.Threading.Tasks;

namespace BankApp.Application.Features.Users.Queries.UserExistence
{
    public interface IUserExistenceDalQuery
    {
        Task<bool> DoesUserExistAsync(string userEmail);
    }
}
