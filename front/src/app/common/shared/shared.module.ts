import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidatorDirective } from '../directives/validator.directive';
import { BlankComponent } from '../components/blank/blank.component';
import { GenericTableComponent } from '../components/generic-table/generic-table.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidatorDirective,
    BlankComponent,
    GenericTableComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidatorDirective,
    BlankComponent,
    GenericTableComponent,
  ]
})
export class SharedModule { }
