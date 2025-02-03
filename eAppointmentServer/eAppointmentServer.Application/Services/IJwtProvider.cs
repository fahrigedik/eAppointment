using eAppointmentServer.Domain.Entities;

namespace eAppointmentServer.Application.Services
{
    public interface IJwtProvider
    {
        string GenerateJwtToken(AppUser user);
    }
}
