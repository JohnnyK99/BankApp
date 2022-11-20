namespace BankApp.Infrastructure.Features.Auth.Registration.Commands
{
    public interface IRegisterUserDalCommand
    {
        Task<RegistrationResult> RegisterUserAsync(string firstName, string lastName, string email, string password);
    }
}
