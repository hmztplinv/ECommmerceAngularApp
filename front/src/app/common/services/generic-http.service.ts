import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api: string = "http://localhost:3000/";

  constructor(private httpClient: HttpClient,private toastr:ToastrService) { }

  get<T>(api: string, callBack: (res: T) => void) {
    this.httpClient.get<T>(`${this.api}/${api}`).subscribe({
      next: (res: T) => callBack(res),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void) {
    this.httpClient.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: T) => callBack(res),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.toastr.error(err.message);
      }
    });
  }
}
