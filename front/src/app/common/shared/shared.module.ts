import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidatorDirective } from '../directives/validator.directive';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidatorDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidatorDirective
  ]
})
export class SharedModule { }
