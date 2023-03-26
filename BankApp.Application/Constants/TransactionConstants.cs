using BankApp.Application.Constants.Enums;

namespace BankApp.Application.Constants
{
    public static class TransactionConstants
    {
        public const double MinTransactionAmount = 0.01;
        public const string DefaultSortColumn = "Date";
        public const SortDirection DefaultSortDirection = SortDirection.Desc;
        public static readonly string[] SortColumns = new[] { "Title", "Description", "Date", "Amount", "TransactionType" };
        public const int MinTitleLength = 1;
        public const int MaxTitleLength = 50;
        public const int MinDescriptionLength = 1;
        public const int MaxDescriptionLength = 500;
        public const int MaxSearchByLength = 100;
    }
}
