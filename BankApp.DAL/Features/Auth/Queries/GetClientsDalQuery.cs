using BankApp.Application.Features.Auth.Clients.Queries;
using BankApp.DAL.Constants;
using BankApp.DAL.Db.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Auth.Queries
{
    public class GetClientsDalQuery : IDalService, IGetClientsDalQuery
    {
        private readonly UserManager<UserEntity> _userManager;

        public GetClientsDalQuery(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync(string searchBy)
        {
            IEnumerable<UserEntity> users = await _userManager.GetUsersInRoleAsync(UserRoles.Client);

            return users.Where(user => searchBy == default || 
                                       string.Concat(user.FirstName, " ", user.LastName).ToLower().Contains(searchBy.ToLower()) || 
                                       user.Email.Contains(searchBy.ToLower()))
                .OrderBy(user => user.LastName).ThenBy(user => user.FirstName)
                .Select(user => new Client()
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                })
                .ToList();
        }
    }
}
