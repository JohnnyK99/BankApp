namespace BankApp.API.Constants.Routes
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public static class Auth
        {
            public const string Base = $"{Root}/auth";
            public const string Clients = "clients";
            public const string Register = "register";
            public const string Login = "login";
            public const string RefreshToken = "refresh";
        }

        public static class BankAccounts
        {
            public const string Base = $"{Root}/bank-accounts";
            public const string Create = "";
            public const string GetAll = "";
        }

        public static class Dictionaries
        {
            public const string Base = $"{Root}/dictionaries";
            public const string AccountTypes = "account-types";
        }

        public static class SavedRecipients
        {
            public const string Base = $"{Root}/recipients";
        }

        public static class Transactions
        {
            public const string Base = $"{Root}/transactions";
            public const string Confirmation = "{transactionId}/confirmation";
        }
    }
}
