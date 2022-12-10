using AutoMapper;
using BankApp.Infrastructure.Extensions;
using BankApp.Infrastructure.Wrappers;

namespace BankApp.Infrastructure.Mappings
{
    public class IdTranslationsProfile : Profile
    {
        public IdTranslationsProfile()
        {
            CreateMap<IdTranslationsDalDto, IdTranslations>()
                .ForMember(dest => dest.Translations,
                    opt => opt.MapFrom(src => src.CreateTranslations(nameof(src.Value))));
        }
    }
}
