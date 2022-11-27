using BankApp.Infrastructure.Wrappers;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Auth.Login.Commands
{
    public interface ILoginDalCommand
    {
        Task<Result<TokenModel>> LoginAsync(string email, string password);
    }
}
