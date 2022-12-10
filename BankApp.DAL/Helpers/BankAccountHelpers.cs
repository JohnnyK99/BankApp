using Microsoft.Extensions.Configuration;

namespace BankApp.DAL.Helpers
{
    public class BankAccountHelpers
    {
        private readonly IConfigurationSection _accountNumberSettings;

        public BankAccountHelpers(IConfiguration configuration)
        {
            _accountNumberSettings = configuration.GetSection("AccountNumberSettings");
        }

        public string GenerateAccountNumber(int accountId)
        {
            var bankId = _accountNumberSettings["BankIdentifier"];
            var userIdLength = int.Parse(_accountNumberSettings["UserIdentifierLength"]);

            var accountIdString = accountId.ToString();
            var accountIdPadded = accountIdString.PadLeft(userIdLength, '0');
            var baseAccountNumber = bankId + accountIdPadded;

            return GetControlNumber(baseAccountNumber) + baseAccountNumber;
        }

        private string GetControlNumber(string baseAccountNumber)
        {
            //TODO: Implement generation logic
            return "48";
        }
    }
}
