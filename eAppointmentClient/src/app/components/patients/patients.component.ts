import { Component } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { PatientPipe } from '../../pipes/patient.pipe';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { ResultModel } from '../../models/result.model';

@Component({
  selector: 'app-patients',
  imports: [RouterLink, FormsModule, FormValidateDirective, PatientPipe],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients: PatientModel[] = [];
    search : string = "";
    // departments : DepartmentModel[] = departments;
    createModel : PatientModel = new PatientModel();
    updateModel : PatientModel = new PatientModel();
  
    constructor(private http: HttpService, private swal : SwalService) {}
  
    ngOnInit(): void {
      this.getAll();
    }
  
    getAll() {
      this.http.post<PatientModel[]>('Patients/GetAllPatients', {}, (res) => {
        this.patients = res.data;
      });
    }
  
    add(form : NgForm)
    {
      if(form.valid)
      {
        this.http.post<ResultModel<string>>('Patients/CreatePatient', this.createModel, (res) => {
          console.log(res);
          this.swal.callToast('Patient is created','success');
          this.getAll();
        });
      }
    }
  
    delete(id : string)
    {
      this.swal.callSwal('Are you sure?','Do you want to delete this doctor?','Yes',() => {
        this.http.post<ResultModel<string>>('Patients/DeletePatient', {id : id}, (res) => {
          this.swal.callToast('Patient is deleted','success');
          this.getAll();
        });
      });
    }

    beforeEdit(selectedPatient : PatientModel )
    {
      this.updateModel = selectedPatient;
    }

    update(form : NgForm)
    {
      this.swal.callSwal('Are you sure?','Do you want to update this patient?','Yes',() => {
        this.http.post<ResultModel<string>>('Patients/UpdatePatient', this.updateModel , (res) => {
          this.swal.callToast('Patient is updated','success');
          this.getAll();
        });
      });
    }
}
