using BankApp.Infrastructure.Wrappers;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Auth.Login.Commands
{
    public interface IVerifyUserDalCommand
    {
        Task<Result<string>> VerifyUserByCredentialsAsync(string email, string password);
        Task<Result<string>> VerifyUserByTokensAsync(string accessToken, string refreshToken);
    }
}
