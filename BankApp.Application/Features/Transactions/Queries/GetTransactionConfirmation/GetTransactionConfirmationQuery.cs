using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using BankApp.Application.Helpers;
using BankApp.Application.Wrappers;
using MediatR;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Queries.GetTransactionConfirmation
{
    public class GetTransactionConfirmationQuery : IRequest<FileResponse>
    {
        public int TransactionId { get; }

        public GetTransactionConfirmationQuery(int transactionId)
        {
            TransactionId = transactionId;
        }

        public class Handler : IRequestHandler<GetTransactionConfirmationQuery, FileResponse>
        {
            private readonly PdfHelpers _pdfHelpers;
            private readonly IGetTransactionDalQuery _getTransactionDalQuery;

            public Handler(PdfHelpers pdfHelpers, IGetTransactionDalQuery getTransactionDalQuery)
            {
                _pdfHelpers = pdfHelpers;
                _getTransactionDalQuery = getTransactionDalQuery;
            }

            public async Task<FileResponse> Handle(GetTransactionConfirmationQuery request, CancellationToken cancellationToken)
            {
                Transaction transaction = await _getTransactionDalQuery.GetTransactionAsync(request.TransactionId);
                Stream confirmation = _pdfHelpers.GetTransactionConfirmation(transaction);
                string filename = $"Potwierdzenie transakcji {transaction.Date:yyyy-MM-dd}-{transaction.Id}.pdf";

                return new FileResponse(confirmation, filename, "application/pdf");
            }
        }
    }
}
