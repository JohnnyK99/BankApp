namespace BankApp.Application.Wrappers.Translations
{
    public class Translation
    {
        public string CountryCode { get; set; }
        public string Value { get; set; }

        public Translation(string countryCode, string value)
        {
            CountryCode = countryCode;
            Value = value;
        }
    }
}
