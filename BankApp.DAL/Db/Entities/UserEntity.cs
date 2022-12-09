﻿using Microsoft.AspNetCore.Identity;

namespace BankApp.DAL.Db.Entities
{
    public class UserEntity : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? RefreshToken { get; set; }
        public double? RefreshTokenExp { get; set; }
    }
}