using BankApp.Application.Constants;
using BankApp.Application.Constants.Enums;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Wrappers;
using BankApp.Application.Wrappers.Result;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.GetTransactions
{
    public class GetTransactionsQuery : IRequest<Result<PagedResponse<Transaction>>>
    {
        public string BankAccountNumber { get; }
        public IEnumerable<TransactionType> TransactionTypes { get; }
        public string SearchBy { get; }
        public DateTime? DateFrom { get; }
        public DateTime? DateTo { get; }
        public int PageNumber { get; }
        public int PageSize { get; }
        public string SortColumn { get; }
        public SortDirection SortDirection { get; }

        public GetTransactionsQuery(
            string bankAccountNumbers,
            IEnumerable<TransactionType> transactionTypes,
            string searchBy,
            DateTime? dateFrom,
            DateTime? dateTo,
            int pageNumber,
            int pageSize,
            string sortColumn,
            SortDirection? sortDirection)
        {
            BankAccountNumber = bankAccountNumbers;
            TransactionTypes = transactionTypes;
            SearchBy = searchBy;
            DateFrom = dateFrom;
            DateTo = dateTo;
            PageNumber = pageNumber;
            PageSize = pageSize;
            SortColumn = sortColumn;
            SortDirection = sortDirection ?? TransactionConstants.DefaultSortDirection;
        }

        public class Handler : IRequestHandler<GetTransactionsQuery, Result<PagedResponse<Transaction>>>
        {
            private readonly IGetTransactionsDalQuery _getTransactionsDalQuery;

            public Handler(IGetTransactionsDalQuery getTransactionsDalQuery)
            {
                _getTransactionsDalQuery = getTransactionsDalQuery;
            }

            public async Task<Result<PagedResponse<Transaction>>> Handle(GetTransactionsQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<Transaction> transactions = await _getTransactionsDalQuery.GetTransactions(
                    request.BankAccountNumber,
                    request.TransactionTypes,
                    request.SearchBy,
                    request.DateFrom,
                    request.DateTo,
                    request.SortColumn ?? TransactionConstants.DefaultSortColumn,
                    request.SortDirection);

                var pagedTransactions = new PagedResponse<Transaction>(transactions, request.PageNumber, request.PageSize);

                return await Result<PagedResponse<Transaction>>.SuccessAsync(pagedTransactions);
            }
        }
    }
}
