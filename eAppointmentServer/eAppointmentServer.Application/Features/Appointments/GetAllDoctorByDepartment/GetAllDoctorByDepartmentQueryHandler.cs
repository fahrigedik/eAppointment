using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eAppointmentServer.Application.Features.Appointments.GetAllDoctorByDepartment;

internal sealed class GetAllDoctorByDepartmentQueryHandler(IDoctorRepository doctorRepository) : IRequestHandler<GetAllDoctorByDepartmentQuery, Result<List<Doctor>>>
{
    public async Task<Result<List<Doctor>>> Handle(GetAllDoctorByDepartmentQuery request, CancellationToken cancellationToken)
    {
        var doctors =
            await doctorRepository.Where(x => x.Department == request.DepartmentValue).OrderBy(x => x.FirstName).ToListAsync();

        return Result<List<Doctor>>.Succeed(doctors);
    }
}