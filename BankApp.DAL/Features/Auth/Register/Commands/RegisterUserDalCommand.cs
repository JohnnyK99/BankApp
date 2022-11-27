﻿using BankApp.DAL.Constants;
using BankApp.DAL.Db.Entities;
using BankApp.Infrastructure.Features.Auth;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Auth.Register.Queries
{
    public class RegisterUserDalCommand : IRegisterUserDalCommand
    {
        private readonly UserManager<User> _userManager;

        public RegisterUserDalCommand(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<RegistrationResult> RegisterUserAsync(string firstName, string lastName, string email, string password)
        {
            var user = new User { FirstName = firstName, LastName = lastName, Email = email, UserName = email };

            var result = await _userManager.CreateAsync(user, password);

            if(result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Client);
            }

            return new RegistrationResult { Succeeded = result.Succeeded, ErrorMessages = result.Errors.Select(err => err.Description).ToList() };
        }
    }
}
