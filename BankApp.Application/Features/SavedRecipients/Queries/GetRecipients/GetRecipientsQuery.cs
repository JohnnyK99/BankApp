using BankApp.Application.Wrappers.Result;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.SavedRecipients.Queries.GetRecipients
{
    public class GetRecipientsQuery : IRequest<Result<IEnumerable<SavedRecipient>>>
    {
        public string UserId { get; }

        public GetRecipientsQuery(string userId)
        {
            UserId = userId;
        }

        public class Handler : IRequestHandler<GetRecipientsQuery, Result<IEnumerable<SavedRecipient>>>
        {
            private readonly IGetRecipientsDalQuery _getRecipientsDalQuery;

            public Handler(IGetRecipientsDalQuery getRecipientsDalQuery)
            {
                _getRecipientsDalQuery = getRecipientsDalQuery;
            }

            public async Task<Result<IEnumerable<SavedRecipient>>> Handle(GetRecipientsQuery request, CancellationToken cancellationToken)
            {
                IEnumerable<SavedRecipient> recipients = await _getRecipientsDalQuery.GetRecipients(request.UserId);

                return await Result<IEnumerable<SavedRecipient>>.SuccessAsync(recipients);
            }
        }
    }
}
