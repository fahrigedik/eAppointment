using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eAppointmentServer.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        public readonly IMediator _mediator;

        public BaseApiController(IMediator mediator)
        {
            _mediator = mediator;
        }
    }
}
