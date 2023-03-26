using System.Text.RegularExpressions;

namespace BankApp.Application.Extensions
{
    public static class StringExtensions
    {
        public static string ToAccountNumberFormat(this string value)
        {
            return Regex.Replace(value, @"(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})", "$1 $2 $3 $4 $5 $6 $7");
        }
    }
}
