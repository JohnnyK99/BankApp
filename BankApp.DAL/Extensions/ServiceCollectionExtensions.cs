using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using BankApp.DAL.Features.Auth.Login.Commands;
using BankApp.DAL.Features.Auth.Register.Queries;
using BankApp.DAL.Helpers;
using BankApp.Infrastructure.Features.Auth.Login.Commands;
using BankApp.Infrastructure.Features.Auth.Registration.Commands;
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
            services.AddScoped<ILoginDalCommand, LoginDalCommand>();
            services.AddScoped<JwtHelpers>();

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlConnection"))
            );

            services.AddIdentityCore<User>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();
        }
    }
}
