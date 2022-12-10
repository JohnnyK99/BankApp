using System.Collections.Generic;

namespace BankApp.DAL.Db.Entities
{
    public class AccountTypeEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameEng { get; set; }
        public string Description { get; set; }
        public string DescriptionEng { get; set; }

        public ICollection<BankAccountEntity> BankAccounts { get; set; }
    }
}
