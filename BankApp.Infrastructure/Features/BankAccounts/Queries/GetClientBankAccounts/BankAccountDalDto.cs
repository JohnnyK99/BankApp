using BankApp.Infrastructure.Wrappers;

namespace BankApp.Infrastructure.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class BankAccountDalDto
    {
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public double Balance { get; set; }
        public IdTranslationsDalDto AccountType { get; set; }
    }
}
