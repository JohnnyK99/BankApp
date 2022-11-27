using BankApp.API.Constants.Routes;
using BankApp.API.Dto.Auth.Register;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
using BankApp.Infrastructure.Wrappers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Features.Auth;

namespace BankApp.API.Controllers
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
            Result<bool> result = await _mediator.Send(new RegisterUserCommand(request.FirstName, request.LastName, request.Email, request.Password));
            
            if(!result.Succeeded)
            {
                return StatusCode(500, result);
            }

            return Ok(result);
        }

        [HttpPost(ApiRoutes.Auth.Login)]
        public async Task<IActionResult> Login(LoginDto request)
        {
            Result<TokenModel> result = await _mediator.Send(new LoginCommand(request.Email, request.Password));

            if(!result.Succeeded)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }

    }
}
