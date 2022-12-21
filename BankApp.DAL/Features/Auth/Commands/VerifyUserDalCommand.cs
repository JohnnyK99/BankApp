using BankApp.DAL.Db.Entities;
using BankApp.Application.Features.Auth.Login.Commands;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using BankApp.DAL.Helpers.Jwt;
using BankApp.Application.Wrappers.Result;

namespace BankApp.DAL.Features.Auth.Commands
{
    public class VerifyUserDalCommand : IDalService, IVerifyUserDalCommand
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IJwtHelpers _jwtHelpers;

        public VerifyUserDalCommand(UserManager<UserEntity> userManager, IJwtHelpers jwtHelpers)
        {
            _userManager = userManager;
            _jwtHelpers = jwtHelpers;
        }

        public async Task<Result<string>> VerifyUserByCredentialsAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return await Result<string>.FailAsync("Invalid email or password");
            }

            return await Result<string>.SuccessAsync(data: user.UserName);
        }

        public async Task<Result<string>> VerifyUserByTokensAsync(string accessToken, string refreshToken)
        {
            var principal = _jwtHelpers.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name;

            var user = await _userManager.FindByNameAsync(username);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExp < (long)(DateTime.Now - DateTime.UnixEpoch).TotalMilliseconds)
            {
                return await Result<string>.FailAsync("Invalid tokens");
            }

            return await Result<string>.SuccessAsync(data: user.UserName);
        }
    }
}
