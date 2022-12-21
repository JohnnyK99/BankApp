using BankApp.Application.Helpers;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace BankApp.Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureLayer(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IPdfHelpers, PdfHelpers>();
        }
    }
}
