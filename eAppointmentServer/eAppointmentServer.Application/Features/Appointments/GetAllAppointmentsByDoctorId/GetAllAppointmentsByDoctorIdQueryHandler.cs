using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eAppointmentServer.Application.Features.Appointments.GetAllAppointments;

internal sealed class GetAllAppointmentsByDoctorIdQueryHandler(IAppointmentRepository appointmentRepository) : IRequestHandler<GetAllAppointmentsByDoctorIdQuery, Result<List<GetAllAppointmentsByDoctorIdQueryResponse0>>>
{
    public async Task<Result<List<GetAllAppointmentsByDoctorIdQueryResponse0>>> Handle(GetAllAppointmentsByDoctorIdQuery request, CancellationToken cancellationToken)
    {
        List<Appointment> appointments = await appointmentRepository.Where(p => p.DoctorId == request.DoctorId)
            .Include(x => x.Patient).ToListAsync();

        List<GetAllAppointmentsByDoctorIdQueryResponse0> response = appointments.Select(x => new GetAllAppointmentsByDoctorIdQueryResponse0(x.Id, x.StartDate, x.EndDate, (x.Patient.FirstName + x.Patient.LastName), x.Patient)).ToList();

        return response;
    }
}