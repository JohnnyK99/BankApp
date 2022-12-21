using System.Threading.Tasks;
using BankApp.Application.Wrappers.Result;

namespace BankApp.Application.Features.Auth.Login.Commands
{
    public interface IGetTokensDalCommand
    {
        Task<Result<TokenModel>> GetTokensAsync(string username);
    }
}
