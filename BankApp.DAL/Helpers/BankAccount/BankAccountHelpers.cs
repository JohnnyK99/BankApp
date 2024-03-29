﻿using Microsoft.Extensions.Configuration;

namespace BankApp.DAL.Helpers.BankAccount
{
    public class BankAccountHelpers : IBankAccountHelpers
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
            var baseRemainder = decimal.Parse(baseAccountNumber) * 100 % 97;
            var controlSum = 97 - baseRemainder + 1;
            return controlSum.ToString().PadLeft(2, '0');
        }
    }
}
