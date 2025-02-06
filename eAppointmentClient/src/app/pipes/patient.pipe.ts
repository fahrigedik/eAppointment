import { Pipe, PipeTransform } from '@angular/core';
import { PatientModel } from '../models/patient.model';

@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {

  transform(value: PatientModel[], search: string): PatientModel[] {
  
      if(!search)
      {
        return value;
      }
  
      return value.filter(p => 
        p.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.identityNumber.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
  
    }

}
