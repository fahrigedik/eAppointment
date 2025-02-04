import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  callToast(title: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      timer: 3000,
      icon: icon,
      position: 'bottom-right',
      showCancelButton: false,
      showConfirmButton: false,
      toast: true,
    });
  }

  callSwal(title: string, text: string, confirmButtonText: string, callBack: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
    }).then(res=> {
      if(res.isConfirmed)
      {
        callBack();
      }
    })
  }
}

export type SweetAlertIcon =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'question';
