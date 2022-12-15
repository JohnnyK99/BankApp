using BankApp.Application.Features.BankAccounts.Queries.GetBankAccount;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Transactions.Commands.CreateTransaction
{
    public class CreateTransactionCommand : IRequest<Unit>
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

        public class Handler : IRequestHandler<CreateTransactionCommand, Unit>
        {
            private readonly ICreateTransactionDalCommand _createTransactionDalCommand;

            public Handler(ICreateTransactionDalCommand createTransactionDalCommand)
            {
                _createTransactionDalCommand = createTransactionDalCommand;
            }

            public async Task<Unit> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
            {

                await _createTransactionDalCommand.CreateTransactionAsync(
                    request.AccountNumberFrom,
                    request.AccountNumberTo,
                    request.Title,
                    request.Description,
                    request.Amount,
                    DateTime.Now);

                return Unit.Value;
            }
        }
    }
}
