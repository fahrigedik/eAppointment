using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eAppointmentServer.Domain.Entities;
using MediatR;
using TS.Result;

namespace eAppointmentServer.Application.Features.Doctors.GetAllDoctor
{
    public sealed record GetAllDoctorQuery : IRequest<Result<List<Doctor>>>;
}
