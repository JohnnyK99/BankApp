using BankApp.Application.Wrappers.Translations;
using System.Collections.Generic;

namespace BankApp.Application.Features.Dictionaries.Queries.GetAccountTypes
{
    public class AccountType
    {
        public int Id { get; set; }
        public ICollection<Translation> Name { get; set; }
        public ICollection<Translation> Description { get; set; }
    }
}
