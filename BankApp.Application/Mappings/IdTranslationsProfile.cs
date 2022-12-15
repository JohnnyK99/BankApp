using AutoMapper;
using BankApp.Application.Extensions;
using BankApp.Application.Wrappers;

namespace BankApp.Application.Mappings
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
