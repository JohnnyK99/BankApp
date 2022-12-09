using BankApp.API.Constants.Routes;
using BankApp.DAL.Constants;
using BankApp.Infrastructure.Features.Dictionaries.Queries.GetAccountTypes;
using BankApp.Infrastructure.Wrappers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.API.Controllers.Dictionaries
{
    [Route(ApiRoutes.Dictionaries.Base)]
    [ApiController]
    public class DictionariesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DictionariesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet(ApiRoutes.Dictionaries.AccountTypes)]
        public async Task<IActionResult> GetAccountTypes(CancellationToken cancellationToken)
        {
            Result<IEnumerable<AccountType>> accountTypes = await _mediator.Send(new GetAccountTypesQuery(), cancellationToken);
            return Ok(accountTypes);
        }
    }
}
