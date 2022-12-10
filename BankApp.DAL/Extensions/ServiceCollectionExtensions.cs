using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using BankApp.DAL.Features.Auth.Commands;
using BankApp.DAL.Features.BankAccounts.Commands;
using BankApp.DAL.Features.Dictionaries.Queries;
using BankApp.DAL.Features.Dictionaries.Queries.Existence;
using BankApp.DAL.Features.Users.Queries;
using BankApp.DAL.Helpers;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
using BankApp.Infrastructure.Features.BankAccounts.Commands.CreateBankAccount;
using BankApp.Infrastructure.Features.Dictionaries.Queries.Existence.AccountTypeExistence;
using BankApp.Infrastructure.Features.Dictionaries.Queries.GetAccountTypes;
using BankApp.Infrastructure.Features.Users.Queries.GetUserId;
using BankApp.Infrastructure.Features.Users.Queries.UserExistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BankApp.DAL.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDalLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserExistenceDalQuery, UserExistenceDalQuery>();
            services.AddScoped<IGetUserIdDalQuery, GetUserIdDalQuery>();
            services.AddScoped<IAccountTypeExistenceDalQuery, AccountTypeExistenceDalQuery>();
            services.AddScoped<IRegisterUserDalCommand, RegisterUserDalCommand>();
            services.AddScoped<IGetTokensDalCommand, GetTokensDalCommand>();
            services.AddScoped<IVerifyUserDalCommand, VerifyUserDalCommand>();
            services.AddScoped<IGetAccountTypesDalQuery, GetAccountTypesDalQuery>();
            services.AddScoped<ICreateBankAccountDalCommand, CreateBankAccountDalCommand>();
            services.AddScoped<JwtHelpers>();
            services.AddScoped<BankAccountHelpers>();

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlConnection"))
            );

            services.AddIdentityCore<UserEntity>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();
        }
    }
}
