using System;
using System.Collections.Generic;
using System.Linq;

namespace BankApp.Application.Wrappers
{
    public class PagedResponse<T>
    {
        public IEnumerable<T> Data { get; }
        public int PageNumber { get; }
        public int PageSize { get; }
        public int TotalPages { get; }
        public int TotalRecords { get; }

        public PagedResponse(IEnumerable<T> data, int pageNumber, int pageSize)
        {
            TotalRecords = data.Count();
            var totalPages = TotalRecords == 0 ? 1 : ((double)TotalRecords / pageSize);
            TotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
            PageNumber = Math.Min(pageNumber, TotalPages);
            Data = data.Skip((PageNumber - 1) * pageSize).Take(pageSize);
            PageSize = pageSize;
        }
    }
}
