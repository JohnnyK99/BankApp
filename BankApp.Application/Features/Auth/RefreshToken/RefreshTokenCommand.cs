using BankApp.Application.Features.Auth.Login.Commands;
using BankApp.Application.Wrappers.Result;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.RefreshToken
{
    public class RefreshTokenCommand : IRequest<Result<TokenModel>> 
    {
        public string AccessToken { get; }
        public string RefreshToken { get; }

        public RefreshTokenCommand(
            string accessToken,
            string refreshToken)
        {
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }

        public class Handler : IRequestHandler<RefreshTokenCommand, Result<TokenModel>>
        {
            private readonly IVerifyUserDalCommand _verifyUserDalCommand;
            private readonly IGetTokensDalCommand _getTokensDalCommand;

            public Handler(IVerifyUserDalCommand verifyUserDalCommand, IGetTokensDalCommand getTokensDalCommand)
            {
                _verifyUserDalCommand = verifyUserDalCommand;
                _getTokensDalCommand = getTokensDalCommand;
            }

            public async Task<Result<TokenModel>> Handle(RefreshTokenCommand request, CancellationToken token)
            {
                Result<string> usernameResult = await _verifyUserDalCommand.VerifyUserByTokensAsync(request.AccessToken, request.RefreshToken);

                if (!usernameResult.Succeeded)
                {
                    return await Result<TokenModel>.FailAsync(usernameResult.Messages);
                }

                TokenModel tokens = await _getTokensDalCommand.GetTokensAsync(usernameResult.Data);

                return await Result<TokenModel>.SuccessAsync(tokens);
            }
        }

    }
}
