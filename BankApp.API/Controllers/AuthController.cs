using BankApp.API.Constants.Routes;
using BankApp.API.Dto.Auth.Register;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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
            var result = await _mediator.Send(new RegisterUserCommand(request.FirstName, request.LastName, request.Email, request.Password));
            
            if(!result.Succeeded)
            {
                return StatusCode(500, result);
            }

            return Ok(result);
        }
    }
}
