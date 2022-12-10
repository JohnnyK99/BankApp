using System.Collections.Generic;

namespace BankApp.Infrastructure.Wrappers
{
    public class IdTranslations
    {
        public int Id { get; set; }
        public ICollection<Translation> Translations { get; set; }

        public IdTranslations()
        { 
        }

        public IdTranslations(int id, ICollection<Translation> translations)
        {
            Id = id;
            Translations = translations;
        }
    }
}
