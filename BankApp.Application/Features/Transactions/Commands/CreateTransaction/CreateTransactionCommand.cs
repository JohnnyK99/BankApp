using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using BankApp.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Commands.CreateTransaction
{
    public class CreateTransactionCommand : IRequest<Result<int>>
    {
        public string AccountNumberFrom { get; }
        public string AccountNumberTo { get; }
        public string Title { get; }
        public string Description { get; }
        public double Amount { get; }

        public CreateTransactionCommand(
            string accountNumberFrom,
            string accountNumberTo,
            string title,
            string description,
            double amount)
        {
            AccountNumberFrom = accountNumberFrom;
            AccountNumberTo = accountNumberTo;
            Title = title;
            Description = description;
            Amount = amount;
        }

        public class Handler : IRequestHandler<CreateTransactionCommand, Result<int>>
        {
            private readonly ICreateTransactionDalCommand _createTransactionDalCommand;

            public Handler(ICreateTransactionDalCommand createTransactionDalCommand)
            {
                _createTransactionDalCommand = createTransactionDalCommand;
            }

            public async Task<Result<int>> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
            {

                int transactionId = await _createTransactionDalCommand.CreateTransactionAsync(
                    request.AccountNumberFrom,
                    request.AccountNumberTo,
                    request.Title,
                    request.Description,
                    request.Amount,
                    DateTime.Now);

                return await Result<int>.SuccessAsync(transactionId);
            }
        }
    }
}
