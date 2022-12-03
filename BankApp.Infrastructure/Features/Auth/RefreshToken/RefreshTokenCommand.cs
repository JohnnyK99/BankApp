﻿using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BankApp.Infrastructure.Features.Auth.RefreshToken
{
    public class RefreshTokenCommand : IRequest<Result<TokenModel>> 
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

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

                Result<TokenModel> tokensResult = await _getTokensDalCommand.GetTokensAsync(usernameResult.Data);

                return tokensResult;
            }
        }

    }
}
