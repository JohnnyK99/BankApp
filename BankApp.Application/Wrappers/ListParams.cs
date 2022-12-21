using BankApp.Application.Constants;
using BankApp.Application.Constants.Enums;

namespace BankApp.Application.Wrappers
{
    public abstract class ListParams
    {
        public int PageNumber { get; set; }
        public string SortColumn { get; set; }
        public SortDirection? SortDirection { get; set; }
        private int _pageSize = ListConstants.DefaultPageSize;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > ListConstants.MaxPageSize ? ListConstants.MaxPageSize : value;
        }
    }
}
