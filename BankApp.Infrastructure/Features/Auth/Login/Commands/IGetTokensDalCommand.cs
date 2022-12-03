using System.Threading.Tasks;
using BankApp.Infrastructure.Wrappers;

namespace BankApp.Infrastructure.Features.Auth.Login.Commands
{
    public interface IGetTokensDalCommand
    {
        Task<Result<TokenModel>> GetTokensAsync(string username);
    }
}
