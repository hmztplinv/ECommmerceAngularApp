import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { NgForm } from '@angular/forms';
import { SwalService } from 'src/app/common/services/swal.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:CategoryModel[]=[];
  updateCategory:CategoryModel=new CategoryModel();

  constructor(private toastr:ToastrService,private categoryService:CategoryService,private swal:SwalService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.categoryService.getAll(res=>{
      this.categories=res;
    });
  }

  get(model:CategoryModel){
    this.updateCategory={...model};
  }

  update(form:NgForm){
    if(form.valid){
      this.categoryService.update(this.updateCategory,res=>{
        this.toastr.success(res.message);
        let element=document.getElementById('updateModalCloseButton');
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }

  removeById(model: CategoryModel){
    this.swal.callSwal(`${model.name} delete this`,"","Sil","",()=>{
      this.categoryService.removeById(model._id, (res: any) => {
        this.toastr.info(res.message);
        this.getAll();
      });
    });
  }

  add(form:NgForm){
    if(form.valid){
      this.categoryService.add(form.controls["name"].value,res=>{
        this.toastr.success(res.message);
        let element=document.getElementById('addModalCloseButton');
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }
}
