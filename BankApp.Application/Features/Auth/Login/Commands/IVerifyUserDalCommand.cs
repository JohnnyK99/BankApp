using BankApp.Application.Wrappers;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.Login.Commands
{
    public interface IVerifyUserDalCommand
    {
        Task<Result<string>> VerifyUserByCredentialsAsync(string email, string password);
        Task<Result<string>> VerifyUserByTokensAsync(string accessToken, string refreshToken);
    }
}
