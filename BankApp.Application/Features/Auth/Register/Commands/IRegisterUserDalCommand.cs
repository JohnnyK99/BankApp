using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.Registration.Commands
{
    public interface IRegisterUserDalCommand
    {
        Task<string> RegisterUserAsync(string firstName, string lastName, string email, string password);
    }
}
