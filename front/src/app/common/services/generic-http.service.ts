import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api: string = "http://localhost:5000/api";

  constructor(private httpClient: HttpClient,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  get<T>(api: string, callBack: (res: T) => void) {
    this.spinner.show();
    this.httpClient.get<T>(`${this.api}/${api}`).subscribe({
      next: (res: T) => {
        callBack(res);
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const errorResponse = err.error;
        const errorMessage = errorResponse && errorResponse.message ? errorResponse.message : 'An unexpected error occurred';
        this.toastr.error(errorMessage);
        this.spinner.hide();
      }
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void) {
    this.spinner.show();
    this.httpClient.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: T) => {
        callBack(res);
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const errorResponse = err.error;
        const errorMessage = errorResponse && errorResponse.message ? errorResponse.message : 'An unexpected error occurred';
        this.toastr.error(errorMessage);
        this.spinner.hide();
      }
    });
  }
}
