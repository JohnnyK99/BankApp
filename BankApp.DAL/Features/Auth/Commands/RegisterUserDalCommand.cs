using BankApp.DAL.Constants;
using BankApp.DAL.Db.Entities;
using BankApp.Application.Features.Auth.Registration.Commands;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Auth.Commands
{
    public class RegisterUserDalCommand : IDalService, IRegisterUserDalCommand
    {
        private readonly UserManager<UserEntity> _userManager;

        public RegisterUserDalCommand(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> RegisterUserAsync(string firstName, string lastName, string email, string password)
        {
            var user = new UserEntity 
            { 
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                UserName = email
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Client);
            }

            return user.Id;
        }
    }
}
