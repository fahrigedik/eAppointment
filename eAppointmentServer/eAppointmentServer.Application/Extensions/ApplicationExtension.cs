using Microsoft.Extensions.DependencyInjection;
using AutoMapper;


namespace eAppointmentServer.Application.Extensions
{
    public static class ApplicationExtension
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ApplicationAssembly).Assembly);

            services.AddMediatR(configuration =>
            {
                configuration.RegisterServicesFromAssembly(typeof(ApplicationAssembly).Assembly);
            });

            return services;
        }
    }
}
