using AutoMapper;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;

namespace BankApp.Application.Mappings.BankAccounts
{
    public class GetClientBankAccountsProfile : Profile
    {
        public GetClientBankAccountsProfile()
        {
            CreateMap<BankAccountDalDto, BankAccount>();
        }
    }
}
