using eAppointmentServer.Domain.Entities;

namespace eAppointmentServer.Application.Features.Appointments.GetAllAppointments;

public sealed record GetAllAppointmentsByDoctorIdQueryResponse0(
    Guid Id,
    DateTime StartDate,
    DateTime EndDate,
    string Title,
    Patient patient);