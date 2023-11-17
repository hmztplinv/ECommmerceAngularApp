import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  template:`<router-outlet></router-outlet>
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "default" color = "#fff" type = "pacman" 
  [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner>
  `,
  standalone: true,
  imports: [RouterModule,NgxSpinnerModule],
})
export class AppComponent {
  
}
