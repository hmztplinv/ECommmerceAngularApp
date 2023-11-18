import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";

import { importProvidersFrom } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from "./app/router";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app/app.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      CommonModule,
      NgxSpinnerModule,
      SweetAlert2Module.forRoot(),
      ToastrModule.forRoot(),
      RouterModule.forRoot(routes)
    )
  ]
})