namespace BankApp.DAL.Db.Entities
{
    public class SavedRecipientEntity
    {
        public string UserId { get; set; }
        public int AccountId { get; set; }
        public string Name { get; set; }

        public UserEntity User { get; set; }
        public BankAccountEntity BankAccount { get; set; }
    }
}
