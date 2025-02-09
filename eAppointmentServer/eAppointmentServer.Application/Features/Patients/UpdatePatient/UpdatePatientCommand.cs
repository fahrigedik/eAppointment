using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using GenericRepository;
using MediatR;
using TS.Result;

namespace eAppointmentServer.Application.Features.Patients.UpdatePatient
{
    public sealed record UpdatePatientCommand(
        Guid Id, 
        string FirstName, 
        string LastName, 
        string IdentityNumber, 
        string City, 
        string Town, 
        string FullAddress ) : IRequest<Result<string>>;


    internal sealed class UpdatePatientCommandHandler(IPatientRepository patientRepository, IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<UpdatePatientCommand, Result<string>>
    {
        public async Task<Result<string>> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {
            Patient? patient = await patientRepository.GetByExpressionWithTrackingAsync(p => p.Id == request.Id, cancellationToken);
            if (patient == null)
            {
                return Result<string>.Failure("Patient Not Found");
            }
            var updatedPatient = mapper.Map(request, patient);
            patientRepository.Update(patient);
            await unitOfWork.SaveChangesAsync(cancellationToken);
            return Result<string>.Succeed("Patient update is successful");

        }
    }
}
