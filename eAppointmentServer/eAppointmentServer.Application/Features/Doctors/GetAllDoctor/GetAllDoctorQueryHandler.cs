using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eAppointmentServer.Application.Features.Doctors.GetAllDoctor;

internal sealed class GetAllDoctorQueryHandler : IRequestHandler<GetAllDoctorQuery, Result<List<Doctor>>>
{
    private readonly IDoctorRepository _doctorRepository;
    public GetAllDoctorQueryHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }
    public async Task<Result<List<Doctor>>> Handle(GetAllDoctorQuery request, CancellationToken cancellationToken)
    {
        List<Doctor> doctors = await _doctorRepository.GetAll().OrderBy(x => x.Department).ThenBy(x => x.FirstName)
            .ToListAsync();
        return doctors;
    }
}