using AutoMapper;
using BankApp.Infrastructure.Features.BankAccounts.Queries.GetClientBankAccounts;

namespace BankApp.Infrastructure.Mappings.BankAccounts
{
    public class GetClientBankAccountsProfile : Profile
    {
        public GetClientBankAccountsProfile()
        {
            CreateMap<BankAccountDalDto, BankAccount>();
        }
    }
}
