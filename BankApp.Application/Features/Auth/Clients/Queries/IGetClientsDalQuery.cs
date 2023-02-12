using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BankApp.Application.Features.Auth.Clients.Queries
{
    public interface IGetClientsDalQuery
    {
        Task<IEnumerable<Client>> GetClientsAsync(string searchBy);
    }
}
