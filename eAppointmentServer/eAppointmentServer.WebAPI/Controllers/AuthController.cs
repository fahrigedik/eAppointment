using eAppointmentServer.Application.Features.Auth.Login;
using eAppointmentServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace eAppointmentServer.WebAPI.Controllers
{
    public sealed class AuthController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public AuthController(IMediator mediator, UserManager<AppUser> userManager) : base(mediator)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginCommand request, CancellationToken cancellationToken)
        {

            //var randomUser = new AppUser
            //{
            //    UserName = $"Farcanim9978",
            //    Email = $"fahrican9978@example.com",
            //    FirstName = "fahri",
            //    LastName = "gedik"
            //};

            //var result = await _userManager.CreateAsync(randomUser, "Password123!");

            //if (result.Succeeded)
            //{
            //    return Ok(randomUser);
            //}


            var response = await _mediator.Send(request, cancellationToken);
            return StatusCode(response.StatusCode, response);
        }

    }
}
