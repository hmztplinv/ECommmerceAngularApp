import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private toastr:ToastrService,private spinner:NgxSpinnerService,private router:Router) { }

  login(form:NgForm)
  {
    if(form.valid)
    {
      let model=new LoginModel();
      model.email=form.value.email;
      model.password=form.value.password;

      this.authService.login(model,res=>{
        
          this.toastr.success("Login successful");
          localStorage.setItem("token",res.token);
          localStorage.setItem("user",JSON.stringify(res.user));
          this.router.navigateByUrl("/");
      
      });
    }
  }
}
