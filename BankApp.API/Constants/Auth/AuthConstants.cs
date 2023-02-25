namespace BankApp.API.Constants.Auth
{
    public static class AuthConstants
    {
        public const int MinPasswordLength = 10;
        public static char[] PasswordSpecialCharacters => new char[] { '!', '@', '#', '$', '%', '^', '&', '*' };
    }
}
