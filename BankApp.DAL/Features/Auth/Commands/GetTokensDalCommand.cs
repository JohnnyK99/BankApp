using BankApp.DAL.Db.Entities;
using BankApp.DAL.Helpers;
using BankApp.Infrastructure.Features.Auth;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Wrappers;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Auth.Commands
{
    public class GetTokensDalCommand : IGetTokensDalCommand
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly JwtHelpers _jwtHelpers;

        public GetTokensDalCommand(UserManager<UserEntity> userManager, JwtHelpers jwtHelpers)
        {
            _userManager = userManager;
            _jwtHelpers = jwtHelpers;
        }

        public async Task<Result<TokenModel>> GetTokensAsync(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            var userRoles = await _userManager.GetRolesAsync(user);
            var signingCredentials = _jwtHelpers.GetSigningCredentials();
            var claims = _jwtHelpers.GetClaims(user, userRoles);
            var tokenOptions = _jwtHelpers.GetTokenOptions(signingCredentials, claims);
            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            var refreshToken = _jwtHelpers.GetRefreshToken();
            var refreshTokenExp = _jwtHelpers.GetRefreshTokenExp();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExp = refreshTokenExp;

            await _userManager.UpdateAsync(user);

            TokenModel model = new()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                RefreshTokenExp = refreshTokenExp,
            };

            return await Result<TokenModel>.SuccessAsync(model);
        }
    }
}
