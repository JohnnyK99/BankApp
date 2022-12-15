using System;

namespace BankApp.DAL.Db.Entities
{
    public class TransactionEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public int AccountFromId { get; set; }
        public int AccountToId { get; set; }
        public DateTime Date { get; set; }

        public BankAccountEntity AccountFrom { get; set; }
        public BankAccountEntity AccountTo { get; set; }
    }
}
