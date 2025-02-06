import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DepartmentModel, DoctorModel } from '../../models/doctor.model';
import { departments } from '../../constants';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { ResultModel } from '../../models/result.model';
import { SwalService } from '../../services/swal.service';
import { DoctorPipe } from '../../pipes/doctor.pipe';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, FormsModule, FormValidateDirective, DoctorPipe],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[] = [];
  search : string = "";
  departments : DepartmentModel[] = departments;
  createModel : DoctorModel = new DoctorModel();
  updateModel : DoctorModel = new DoctorModel();

  constructor(private http: HttpService, private swal : SwalService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.post<DoctorModel[]>('Doctors/GetAllDoctors', {}, (res) => {
      this.doctors = res.data;
    });
  }

  add(form : NgForm)
  {
    if(form.valid)
    {
      this.http.post<ResultModel<string>>('Doctors/CreateDoctor', this.createModel, (res) => {
        console.log(res);
        this.swal.callToast('Doctor is created','success');
        this.getAll();
      });
    }
  }


  delete(id : string)
  {
    this.swal.callSwal('Are you sure?','Do you want to delete this doctor?','Yes',() => {
      this.http.post<ResultModel<string>>('Doctors/DeleteDoctor', {id : id}, (res) => {
        this.swal.callToast('Doctor is deleted','success');
        this.getAll();
      });
    });
  }
  beforeEdit(selectedDoctor : DoctorModel)
  {
    this.updateModel = selectedDoctor;
  }
  update(form : NgForm)
  {
    this.swal.callSwal('Are you sure?','Do you want to update this doctor?','Yes',() => {
      this.http.post<ResultModel<string>>('Doctors/UpdateDoctor', this.updateModel , (res) => {
        this.swal.callToast('Doctor is updated','success');
        this.getAll();
      });
    });
  }

}
