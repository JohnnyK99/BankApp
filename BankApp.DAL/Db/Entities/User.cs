using Microsoft.AspNetCore.Identity;

namespace BankApp.DAL.Db.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? RefreshToken { get; set; }
        public string? RefreshTokenExp { get; set; }
    }
}
