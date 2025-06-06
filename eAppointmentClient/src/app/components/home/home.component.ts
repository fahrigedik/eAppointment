import { Component, ElementRef, ViewChild } from '@angular/core';
import { departments } from '../../constants';
import { DepartmentModel, DoctorModel } from '../../models/doctor.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular'; 
import { HttpService } from '../../services/http.service';
import { AppointmentModel } from '../../models/appointment.model';
import { CreateAppointmentModel } from '../../models/create-appointment.model';
import { PatientModel } from '../../models/patient.model';
import { identity } from 'rxjs';
import { SwalService } from '../../services/swal.service';

declare const $ : any;

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, DxSchedulerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]
})
export class HomeComponent {

  departments : DepartmentModel[] = departments;
  doctors : DoctorModel[] = [];

  @ViewChild("addModalCloseBtn") addModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;

  selectedDepartmentValue : number = 0;
  selectedDoctorValue : number = 0;
  selectedDoctorId : string = "";
  createModel : CreateAppointmentModel = new CreateAppointmentModel();
  appointments : any = [
    {
      startDate: new Date("2025-02-09 09:00"),
      endDate: new Date("2025-02-09 09:30"),
      title: "Fahri Gedik - Cardiology",
    },
    {
      startDate: new Date("2025-02-10 10:00"),
      endDate: new Date("2025-02-10 11:30"),
      title: "Şehide Sena Demirel - Kalp Hastalıkları",
    },
    {
      startDate: new Date("2025-02-13 15:00"),
      endDate: new Date("2025-02-13 16:00"),
      title: "Fahri Gedik - Cardiology",
    },
  ]

  constructor(private http : HttpService,
    private date : DatePipe,
    private swal : SwalService
  ) {}

  getAllDoctor(){
    if(this.selectedDepartmentValue > 0){
      this.http.post<DoctorModel[]>('Appointments/GetAllDoctorByDepartment', {departmentValue : +this.selectedDepartmentValue}, (res) => {
        this.doctors = res.data;
      })
    }
  }

  getAllAppointmentsByDoctorId(){
    if(this.selectedDoctorId !== ""){
      this.http.post<AppointmentModel[]>('Appointments/GetAllAppointmentsByDoctorId', {doctorId : this.selectedDoctorId}, (res) => {
        this.appointments = res.data;
      });
    }
  }

  onAppointmentFormOpening(e : any){
    e.cancel = true;
    this.createModel.startDate = this.date.transform(e.appointmentData.startDate, 'dd.MM.yyyy HH:mm')?.toString() ?? "";
    this.createModel.endDate = this.date.transform(e.appointmentData.endDate, 'dd.MM.yyyy HH:mm')?.toString() ?? "";
    this.createModel.doctorId = this.selectedDoctorId.toString();
    $("#addModal").modal("show");
  }

  onAppointmentDeleted(e: any) {
    e.cancel = true;
  }

  onAppointmentDeleting(e: any) {
    e.cancel = true;

    console.log(e);

    this.swal.callSwal("Are you sure?", "Do you want to delete this appointment?", "Yes", () => {
      this.http.post('Appointments/DeleteById', { id: e.appointmentData.id }, (res) => {
        this.swal.callToast(res.data, 'info');
        this.getAllAppointmentsByDoctorId();
      });
    });
  }


  getPatient(){
    this.http.post<PatientModel>('Appointments/GetPatientByIdentityNumber', {identityNumber : this.createModel.identityNumber }, (res) => {
      if (res.data === null) {
        this.createModel.firstName = "";
        this.createModel.lastName = "";
        this.createModel.city = "";
        this.createModel.town = "";
        this.createModel.fullAddress = "";
        this.createModel.patientId = null;
        return;
      }

      this.createModel.patientId = res.data.id;
      this.createModel.firstName = res.data.firstName;
      this.createModel.lastName = res.data.lastName;
      this.createModel.city = res.data.city;
      this.createModel.town = res.data.town;
      this.createModel.fullAddress = res.data.fullAddress;
    });
  }

  create(form : NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.http.post('Appointments/Create', this.createModel, (res) => {
      this.swal.callToast(res.data, 'info');
      this.addModalCloseBtn?.nativeElement.click();
      this.createModel = new CreateAppointmentModel();
      this.getAllAppointmentsByDoctorId();
    });
  }

  onAppointmentUpdating(e: any) {
    e.cancel = true;

    const data = {
      id: e.oldData.id,
      startDate: this.date.transform(e.newData.startDate, "dd.MM.yyyy HH:mm"),
      endDate: this.date.transform(e.newData.endDate, "dd.MM.yyyy HH:mm"),
    };

    this.http.post<string>("Appointments/Update", data, res => {
      this.swal.callToast(res.data, "info");
      this.getAllAppointmentsByDoctorId();
    });
  }
}
