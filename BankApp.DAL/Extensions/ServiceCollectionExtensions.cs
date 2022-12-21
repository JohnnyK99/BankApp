using BankApp.Application.Helpers;
using BankApp.DAL.Db;
using BankApp.DAL.Db.Entities;
using BankApp.DAL.Features;
using BankApp.DAL.Features.Dictionaries.Queries;
using BankApp.DAL.Helpers.BankAccount;
using BankApp.DAL.Helpers.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;

namespace BankApp.DAL.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDalLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDalServices();
            services.AddScoped<IJwtHelpers, JwtHelpers>();
            services.AddScoped<IBankAccountHelpers, BankAccountHelpers>();

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlConnection"))
            );

            services.AddIdentityCore<UserEntity>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();
        }

        private static IServiceCollection AddDalServices(this IServiceCollection services)
        {
            Type baseType = typeof(IDalService);
            Assembly assembly = typeof(GetAccountTypesDalQuery).Assembly;
            return services.AddScopedSelfWithInterfaces(baseType, assembly);
        }

        private static IServiceCollection AddScopedSelfWithInterfaces(this IServiceCollection services, Type baseType, params Assembly[] assemblies)
        {
            return AddSelfWithInterfaces(services, baseType, ServiceLifetime.Scoped, assemblies);
        }

        private static IServiceCollection AddSelfWithInterfaces(this IServiceCollection services, Type baseType, ServiceLifetime serviceLifetime, params Assembly[] assemblies)
        {
            return services.Scan(s => s.FromAssemblies(assemblies)
                .AddClasses(typeFilter => typeFilter.AssignableTo(baseType))
                .AsSelfWithInterfaces()
                .WithLifetime(serviceLifetime));
        }
    }
}
