using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using eAppointmentServer.Infrastructure.Context;
using eAppointmentServer.Infrastructure.Repositories;
using GenericRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;

namespace eAppointmentServer.Infrastructure.Extensions
{
    public static class InfrastructureExtension
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("SqlServer"));
            });
            services.AddIdentity<AppUser, AppRole>(action =>
            {
                action.Password.RequiredLength = 5;
                action.Password.RequireDigit = false;
                action.Password.RequireLowercase = false;
                action.Password.RequireUppercase = false;
                action.Password.RequireNonAlphanumeric = false;
                action.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<ApplicationDbContext>();


            services.Scan(action =>
            {
                action.FromAssemblies(typeof(InfrastructureAssembly).Assembly)
                    .AddClasses(publicOnly: false)
                    .UsingRegistrationStrategy(registrationStrategy: RegistrationStrategy.Skip)
                    .AsImplementedInterfaces()
                    .WithScopedLifetime();
            });

            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<IUnitOfWork>(srv => srv.GetRequiredService<ApplicationDbContext>());

            return services;
        }

    }
}
