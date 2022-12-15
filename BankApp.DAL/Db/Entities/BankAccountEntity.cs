using System.Collections.Generic;

namespace BankApp.DAL.Db.Entities
{
    public class BankAccountEntity
    {
        public int Id { get; set; }
        public string AccountNumber { get; set; }
        public double Balance { get; set; }
        public int AccountTypeId { get; set; }
        public string ClientId { get; set; }

        public AccountTypeEntity AccountType { get; set; }
        public UserEntity User { get; set; }
        public ICollection<TransactionEntity> OutgoingTransactions { get; set; }
        public ICollection<TransactionEntity> IncomingTransactions { get; set; }
    }
}
