using AutoMapper;
using BankApp.DAL.Db;
using BankApp.Application.Features.Dictionaries.Queries.GetAccountTypes;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankApp.DAL.Features.Dictionaries.Queries
{
    public class GetAccountTypesDalQuery : IDalService, IGetAccountTypesDalQuery
    {
        private readonly AppDbContext _dbContext;

        public GetAccountTypesDalQuery(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<AccountTypeDalDto>> GetAccountTypesAsync()
        {
            return await _dbContext.AccountTypes.Select(entity => new AccountTypeDalDto
            {
                Id = entity.Id,
                Name = entity.Name,
                NameEng  = entity.NameEng,
                Description = entity.Description,
                DescriptionEng = entity.DescriptionEng
            }).ToListAsync();
        }
    }
}
