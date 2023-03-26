using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Helpers;
using BankApp.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.GetTransactionConfirmation
{
    public class GetTransactionConfirmationQuery : IRequest<FileResponse>
    {
        public int TransactionId { get; }
        public string Language { get; }

        public GetTransactionConfirmationQuery(int transactionId, string language)
        {
            TransactionId = transactionId;
            Language = language;
        }

        public class Handler : IRequestHandler<GetTransactionConfirmationQuery, FileResponse>
        {
            private readonly IPdfHelpers _pdfHelpers;
            private readonly IGetTransactionDalQuery _getTransactionDalQuery;

            public Handler(IPdfHelpers pdfHelpers, IGetTransactionDalQuery getTransactionDalQuery)
            {
                _pdfHelpers = pdfHelpers;
                _getTransactionDalQuery = getTransactionDalQuery;
            }

            public async Task<FileResponse> Handle(GetTransactionConfirmationQuery request, CancellationToken cancellationToken)
            {
                Transaction transaction = await _getTransactionDalQuery.GetTransactionAsync(request.TransactionId);
                byte[] confirmation = _pdfHelpers.GetTransactionConfirmation(transaction, request.Language);
                string filename = $"Transaction confirmation {transaction.Date:yyyy-MM-dd}-{transaction.Id}.pdf";

                return new FileResponse(confirmation, filename, "application/pdf");
            }
        }
    }
}
