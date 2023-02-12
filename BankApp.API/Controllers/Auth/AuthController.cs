using BankApp.API.Constants.Routes;
using BankApp.API.Dto.Auth.Register;
using BankApp.Application.Features.Auth.Registration.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BankApp.Application.Features.Auth.Login.Commands;
using BankApp.Application.Features.Auth;
using BankApp.API.Dto.Auth.RefreshToken;
using BankApp.Application.Features.Auth.RefreshToken;
using BankApp.API.Dto.Auth.Login;
using System.Threading;
using BankApp.Application.Wrappers.Result;
using Microsoft.AspNetCore.Authorization;
using BankApp.DAL.Constants;
using System.Collections.Generic;
using BankApp.Application.Features.Auth.Clients.Queries;

namespace BankApp.API.Controllers.Auth
{
    [Route(ApiRoutes.Auth.Base)]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost(ApiRoutes.Auth.Register)]
        public async Task<IActionResult> Register(RegisterUserDto request, CancellationToken cancellationToken)
        {
            RegisterUserCommand command = new(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Password,
                request.AccountTypeId);

            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpPost(ApiRoutes.Auth.Login)]
        public async Task<IActionResult> Login(LoginDto request, CancellationToken cancellationToken)
        {
            LoginCommand command = new(
                request.Email,
                request.Password);

            Result<TokenModel> result = await _mediator.Send(command, cancellationToken);

            if (!result.Succeeded)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }

        [HttpPost(ApiRoutes.Auth.RefreshToken)]
        public async Task<IActionResult> RefreshToken(RefreshTokenDto request, CancellationToken cancellationToken)
        {
            RefreshTokenCommand command = new(
                request.AccessToken,
                request.RefreshToken);

            Result<TokenModel> result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet(ApiRoutes.Auth.Clients)]
        [Authorize(Roles = $"{UserRoles.Employee}, {UserRoles.Client}")]
        public async Task<IActionResult> GetClients(string searchBy, CancellationToken cancellationToken)
        {
            Result<IEnumerable<Client>> clients = await _mediator.Send(new GetClientsQuery(searchBy), cancellationToken);
            return Ok(clients);
        }
    }
}
