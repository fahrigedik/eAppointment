import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DepartmentModel, DoctorModel } from '../../models/doctor.model';
import { departments } from '../../constants';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { ResultModel } from '../../models/result.model';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, FormsModule, FormValidateDirective],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorModel[] = [];
  departments : DepartmentModel[] = departments;
  createModel : DoctorModel = new DoctorModel();

  constructor(private http: HttpService) {}

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
        this.getAll();
      });
    }
  }


}
