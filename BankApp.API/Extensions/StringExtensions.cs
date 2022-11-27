using BankApp.API.Constants.Auth;
using System.Linq;

namespace BankApp.API.Extensions
{
    public static class StringExtensions
    {
        public static bool ContainsUpperCase(this string s) => s.Any(char.IsUpper);
        public static bool ContainsDigit(this string s) => s.Any(char.IsDigit);
        public static bool ContainsSpecialCharacter(this string s) => s.Any(c => AuthConstants.PasswordSpecialCharacters.Contains(c));
    }
}
