using BankApp.DAL.Db.Entities;
using BankApp.DAL.Helpers;
using BankApp.Infrastructure.Features;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Wrappers;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using BankApp.Infrastructure.Features.Auth;

namespace BankApp.DAL.Features.Auth.Login.Commands
{
    public class LoginDalCommand : ILoginDalCommand
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtHelpers _jwtHelpers;

        public LoginDalCommand(UserManager<User> userManager, JwtHelpers jwtHelpers)
        {
            _userManager = userManager;
            _jwtHelpers = jwtHelpers;
        }

        public async Task<Result<TokenModel>> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            
            if(user == null || !(await _userManager.CheckPasswordAsync(user, password)))
            {
                return await Result<TokenModel>.FailAsync("Invalid email or password");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            var signingCredentials = _jwtHelpers.GetSigningCredentials();
            var claims = _jwtHelpers.GetClaims(user, userRoles);
            var tokenOptions = _jwtHelpers.GetTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return await Result<TokenModel>.SuccessAsync(new TokenModel { AccessToken = token});
        }
    }
}
