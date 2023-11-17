import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: GenericHttpService) { }

  login(model: LoginModel, callBack: (res: LoginResponseModel) => void) {
    this.httpService.post<LoginResponseModel>("auth/login", model, res => callBack(res));
  }

  register(model:RegisterModel,callBack:(res:LoginResponseModel)=>void)
  {
    this.httpService.post<LoginResponseModel>("auth/register",model,res=>callBack(res))
  };
}
