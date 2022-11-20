namespace BankApp.API.Constants.Auth
{
    public static class AuthConstants
    {
        public const int MinPasswordLength = 8;
        public static char[] PasswordSpecialCharacters => new char[] { '!', '@', '#', '$', '%', '^', '&', '*' };
    }
}
