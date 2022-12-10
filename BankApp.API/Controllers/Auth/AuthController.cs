using BankApp.API.Constants.Routes;
using BankApp.API.Dto.Auth.Register;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
using BankApp.Infrastructure.Wrappers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Features.Auth;
using BankApp.API.Dto.Auth.RefreshToken;
using BankApp.Infrastructure.Features.Auth.RefreshToken;
using BankApp.API.Dto.Auth.Login;

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
        public async Task<IActionResult> Register(RegisterUserDto request)
        {
            await _mediator.Send(new RegisterUserCommand(request.FirstName, request.LastName, request.Email, request.Password, request.AccountTypeId));

            return NoContent();
        }

        [HttpPost(ApiRoutes.Auth.Login)]
        public async Task<IActionResult> Login(LoginDto request)
        {
            Result<TokenModel> result = await _mediator.Send(new LoginCommand(request.Email, request.Password));

            if (!result.Succeeded)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }

        [HttpPost(ApiRoutes.Auth.RefreshToken)]
        public async Task<IActionResult> RefreshToken(RefreshTokenDto request)
        {
            Result<TokenModel> result = await _mediator.Send(new RefreshTokenCommand(request.AccessToken, request.RefreshToken));

            if (!result.Succeeded)
            {
                return StatusCode(500, result);
            }

            return Ok(result);
        }

    }
}
