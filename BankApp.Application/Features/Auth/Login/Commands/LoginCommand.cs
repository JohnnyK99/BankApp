using BankApp.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.Login.Commands
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
            private readonly IVerifyUserDalCommand _verifyUserDalCommand;
            private readonly IGetTokensDalCommand _getTokensDalCommand;

            public Handler(IVerifyUserDalCommand verifyUserDalCommand, IGetTokensDalCommand getTokensDalCommand)
            {
                _verifyUserDalCommand = verifyUserDalCommand;
                _getTokensDalCommand = getTokensDalCommand;
            }

            public async Task<Result<TokenModel>> Handle(LoginCommand request, CancellationToken token)
            {
                Result<string> usernameResult = await _verifyUserDalCommand.VerifyUserByCredentialsAsync(request.Email, request.Password);

                if(!usernameResult.Succeeded)
                {
                    return await Result<TokenModel>.FailAsync(usernameResult.Messages);
                }

                Result<TokenModel> tokensResult = await _getTokensDalCommand.GetTokensAsync(usernameResult.Data);

                return tokensResult;
            }
        }
    }
}
