namespace BankApp.API.Dto.BankAccounts.CreateBankAccount
{
    public class CreateTransactionDto
    {
        public string AccountNumberFrom { get; set; }
        public string AccountNumberTo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
    }
}
