namespace BankApp.Application.Features.Auth
{
    public class TokenModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public double RefreshTokenExp { get; set; }
    }
}
