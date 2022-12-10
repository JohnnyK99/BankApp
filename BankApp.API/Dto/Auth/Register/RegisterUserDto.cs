namespace BankApp.API.Dto.Auth.Register
{
    public class RegisterUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? AccountTypeId { get; set; }
    }
}
