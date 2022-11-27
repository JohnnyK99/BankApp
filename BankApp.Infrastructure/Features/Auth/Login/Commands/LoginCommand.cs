using BankApp.Infrastructure.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Auth.Login.Commands
{
    public class LoginCommand : IRequest<Result<TokenModel>>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public LoginCommand(
            string email,
            string password)
        {
            Email = email;
            Password = password;
        }

        public class Handler : IRequestHandler<LoginCommand, Result<TokenModel>>
        {
            private readonly ILoginDalCommand _loginDalCommand;

            public Handler(ILoginDalCommand loginDalCommand)
            {
                _loginDalCommand = loginDalCommand;
            }

            public async Task<Result<TokenModel>> Handle(LoginCommand request, CancellationToken token)
            {
                Result<TokenModel> result = await _loginDalCommand.LoginAsync(request.Email, request.Password);

                return result;
            }
        }
    }
}
