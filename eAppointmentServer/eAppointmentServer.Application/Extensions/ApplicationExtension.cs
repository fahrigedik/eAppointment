using eAppointmentServer.Domain;
using Microsoft.Extensions.DependencyInjection;

namespace eAppointmentServer.Application.Extensions
{
    public static class ApplicationExtension
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(configuration =>
            {
                configuration.RegisterServicesFromAssembly(typeof(ApplicationAssembly).Assembly);
            });
            return services;
        }
    }
}
