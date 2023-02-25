using BankApp.DAL.Db.Entities;
using BankApp.Application.Features.Auth;
using BankApp.Application.Features.Auth.Login.Commands;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using BankApp.DAL.Helpers.Jwt;

namespace BankApp.DAL.Features.Auth.Commands
{
    public class GetTokensDalCommand : IDalService, IGetTokensDalCommand
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IJwtHelpers _jwtHelpers;

        public GetTokensDalCommand(UserManager<UserEntity> userManager, IJwtHelpers jwtHelpers)
        {
            _userManager = userManager;
            _jwtHelpers = jwtHelpers;
        }

        public async Task<TokenModel> GetTokensAsync(string username)
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

            return model;
        }
    }
}
