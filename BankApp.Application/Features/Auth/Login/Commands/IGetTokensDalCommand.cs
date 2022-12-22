using System.Threading.Tasks;
using BankApp.Application.Wrappers.Result;

namespace BankApp.Application.Features.Auth.Login.Commands
{
    public interface IGetTokensDalCommand
    {
        Task<TokenModel> GetTokensAsync(string username);
    }
}
