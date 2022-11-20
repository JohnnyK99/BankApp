using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace BankApp.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureLayer(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
        }
    }
}
