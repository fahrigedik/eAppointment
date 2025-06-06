﻿using AutoMapper;
using eAppointmentServer.Domain.Entities;
using eAppointmentServer.Domain.Repositories;
using GenericRepository;
using MediatR;
using TS.Result;

namespace eAppointmentServer.Application.Features.Doctors.UpdateDoctor;

internal sealed class UpdateDoctorCommandHandler(
    IDoctorRepository doctorRepository, 
    IUnitOfWork unitOfWork, 
    IMapper mapper) : IRequestHandler<UpdateDoctorCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateDoctorCommand request, CancellationToken cancellationToken)
        {
        Doctor? doctor =
            await doctorRepository.GetByExpressionWithTrackingAsync(p => p.Id == request.Id, cancellationToken);

        if (doctor == null)
        {
            return Result<string>.Failure("Doctor Not Found");
        }

        var updatedDoctor = mapper.Map(request, doctor);
        doctorRepository.Update(doctor);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<string>.Succeed("Doctor update is successful");
    }
}