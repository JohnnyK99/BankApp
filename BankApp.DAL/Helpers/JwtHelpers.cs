using BankApp.DAL.Db.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BankApp.DAL.Helpers
{
    public class JwtHelpers
    {
        private readonly IConfigurationSection _jwtSettings;

        public JwtHelpers(IConfiguration configuration)
        {
            _jwtSettings = configuration.GetSection("JwtSettings");
        }

        public SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_jwtSettings["SecurityKey"]);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public List<Claim> GetClaims(User user, IList<string> userRoles)
        {
            var claims = new List<Claim>()
            { 
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("name", user.Email)
            };

            foreach(var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("role", role));
            }

            return claims;
        }

        public JwtSecurityToken GetTokenOptions(SigningCredentials credentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken
            (
                issuer: _jwtSettings["validIssuer"],
                audience: _jwtSettings["validAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtSettings["expiryInMinutes"])),
                signingCredentials: credentials
            );

            return tokenOptions;
        }
    }
}
