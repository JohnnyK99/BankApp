using AutoMapper;
using BankApp.Infrastructure.Extensions;
using BankApp.Infrastructure.Features.Dictionaries.Queries.GetAccountTypes;

namespace BankApp.Infrastructure.Mappings.Dictionaries
{
    public class GetAccountTypesProfile : Profile
    {
        public GetAccountTypesProfile()
        {
            CreateMap<AccountTypeDalDto, AccountType>()
                .ForMember(dest => dest.Name,
                    opt => opt.MapFrom(src =>
                        src.CreateTranslations(nameof(src.Name))))
                .ForMember(dest => dest.Description,
                    opt => opt.MapFrom(src =>
                        src.CreateTranslations(nameof(src.Description))));
        }
    }
}
