import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(text:string,title:string,icon: any,btnName:string,callBack:()=>void){
    Swal.fire({
      title: title,
      text: text,
      icon: icon, 
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(res =>{
      if(res.isConfirmed){
        callBack();
      }
    })
  }
}
