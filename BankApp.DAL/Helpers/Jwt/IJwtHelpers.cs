using BankApp.DAL.Db.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankApp.DAL.Helpers.Jwt
{
    public interface IJwtHelpers
    {
        SigningCredentials GetSigningCredentials();
        List<Claim> GetClaims(UserEntity user, IList<string> userRoles);
        JwtSecurityToken GetTokenOptions(SigningCredentials credentials, List<Claim> claims);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        string GetRefreshToken();
        double GetRefreshTokenExp();
    }
}
