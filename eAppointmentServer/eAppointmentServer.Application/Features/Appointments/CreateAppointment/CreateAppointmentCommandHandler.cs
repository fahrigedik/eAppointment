using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using GenericRepository;
using MediatR;
using TS.Result;

namespace eAppointmentServer.Application.Features.Appointments.CreateAppointment;

internal sealed class CreateAppointmentCommandHandler(IAppointmentRepository appointmentRepository, IUnitOfWork unitOfWork, IPatientRepository patientRepository) : IRequestHandler<CreateAppointmentCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
    {
        Patient patient = new();
        if (request.PatientId is null)
        {
            patient = new()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                IdentityNumber = request.IdentityNumber,
                City = request.City,
                Town = request.Town,
                FullAddress = request.FullAddress
            };
            await patientRepository.AddAsync(patient);
        }

        Appointment appointment = new()
        {
            DoctorId = request.DoctorId,
            StartDate = Convert.ToDateTime(request.StartDate),
            EndDate = Convert.ToDateTime(request.EndDate),
            PatientId = request.PatientId ?? patient.Id,
            IsCompleted = false
        };

        await appointmentRepository.AddAsync(appointment);
        await unitOfWork.SaveChangesAsync();
        return Result<string>.Succeed("Appointmed created");
    }
}