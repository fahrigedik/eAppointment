using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using eAppointmentServer.Application.Services;
using eAppointmentServer.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace eAppointmentServer.Infrastructure.Services
{
    internal sealed class JwtProvider : IJwtProvider
    {
        public string GenerateJwtToken(AppUser user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("UserName", user.UserName ?? string.Empty)
            };

            DateTime expires = DateTime.Now.AddMinutes(1);

            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes("FahriGedikSecurityKey!"));
            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha512);

            JwtSecurityToken securityToken = new(
                issuer: "Fahri Gedik",
                audience: "eAppointment",
                claims: claims,
                notBefore: DateTime.Now, // Token will be valid after this time
                expires: expires,
                signingCredentials: credentials);

            JwtSecurityTokenHandler tokenHandler = new();

            return tokenHandler.WriteToken(securityToken);

        }
    }
}
