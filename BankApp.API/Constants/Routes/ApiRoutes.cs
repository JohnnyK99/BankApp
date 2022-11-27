namespace BankApp.API.Constants.Routes
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public static class Auth
        {
            public const string Base = $"{Root}/auth";
            public const string Register = "register";
            public const string Login = "login";
        }
    }
}
