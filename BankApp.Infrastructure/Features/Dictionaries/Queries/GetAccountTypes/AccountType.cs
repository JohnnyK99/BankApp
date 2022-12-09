using BankApp.Infrastructure.Wrappers;
using System.Collections.Generic;

namespace BankApp.Infrastructure.Features.Dictionaries.Queries.GetAccountTypes
{
    public class AccountType
    {
        public int Id { get; set; }
        public ICollection<Translation> Name { get; set; }
        public ICollection<Translation> Description { get; set; }
    }
}
