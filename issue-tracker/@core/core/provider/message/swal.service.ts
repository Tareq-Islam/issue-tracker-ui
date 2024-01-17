import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EyeSwalService {
  confirm({
    message,
    confirmButtonText = '<span class="pi pi-check"></span> Confirm',
    cancelButtonText = '<span class="pi pi-times"></span> Cancel',
    html,
  }: {
    message: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    html?: string;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        html: html,
      })
        .then((result) => {
          const cancel = result.dismiss === Swal.DismissReason.cancel;
          if (cancel) {
            reject(cancel);
          }
          if (result.isConfirmed) {
            resolve(true);
          }
        })
        .catch((error) => reject(false));
    });
  }

  notification({
    message,
    icon,
  }: {
    message: string;
    icon: 'error' | 'success';
  }) {
    const Tost = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Tost.fire({
      icon: icon,
      title: message,
    });
  }
}
