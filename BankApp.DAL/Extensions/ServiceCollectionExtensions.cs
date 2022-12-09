using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using BankApp.DAL.Features.Auth.Commands;
using BankApp.DAL.Features.Dictionaries.Queries;
using BankApp.DAL.Helpers;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
using BankApp.Infrastructure.Features.Dictionaries.Queries.GetAccountTypes;
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
            services.AddScoped<IRegisterUserDalCommand, RegisterUserDalCommand>();
            services.AddScoped<IGetTokensDalCommand, GetTokensDalCommand>();
            services.AddScoped<IVerifyUserDalCommand, VerifyUserDalCommand>();
            services.AddScoped<IGetAccountTypesDalQuery, GetAccountTypesDalQuery>();
            services.AddScoped<JwtHelpers>();

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlConnection"))
            );

            services.AddIdentityCore<UserEntity>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();
        }
    }
}
