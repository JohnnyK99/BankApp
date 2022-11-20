namespace BankApp.Infrastructure.Features.Auth
{
    public class RegistrationResult
    {
        public bool Succeeded { get; set; }
        public List<string> ErrorMessages { get; set; }
    }
}
