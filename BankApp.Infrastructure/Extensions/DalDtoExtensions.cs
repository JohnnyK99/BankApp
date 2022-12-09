using BankApp.Infrastructure.Constants;
using BankApp.Infrastructure.Wrappers;
using System.Collections.Generic;

namespace BankApp.Infrastructure.Extensions
{
    public static class DalDtoExtensions
    {
        public static ICollection<Translation> CreateTranslations<T>(this T dto, string propertyName)
        {
            string propertyPl = dto.GetType().GetProperty(propertyName).GetValue(dto, null) as string;
            string propertyEn = dto.GetType().GetProperty($"{propertyName}Eng").GetValue(dto, null) as string;
            return new List<Translation>()
            {
                new(CountryCodes.PL, propertyPl),
                new(CountryCodes.EN, propertyEn),
            };
        }
    }
}
