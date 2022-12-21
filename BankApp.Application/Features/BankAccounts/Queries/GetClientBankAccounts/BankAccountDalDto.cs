using BankApp.Application.Wrappers.Translations;

namespace BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts
{
    public class BankAccountDalDto
    {
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public double Balance { get; set; }
        public IdTranslationsDalDto AccountType { get; set; }
    }
}
