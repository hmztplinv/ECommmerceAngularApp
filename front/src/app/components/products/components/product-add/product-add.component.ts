import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from 'src/app/components/categories/models/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/components/categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];

  constructor(private categoryService: CategoryService,private toastr:ToastrService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll(res => this.categories = res);
  }


  getImages(event: any) {
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);

    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.addImage(imageUrl, file);
      }

    }
  }

  addImage(imageUrl: string, file: any) {
    this.imageUrls.push({ imageUrl:imageUrl, name:file.name,size:file.size });
  }

  add(form: NgForm) {

    if (form.value["categoriesSelect"].length==0){
      this.toastr.error("Please select at least one category");
      return;
    }

    if(form.valid){
      let product=form.value;
      let categories:string[]=product["categoriesSelect"];
      let name=product["name"];
      let price=product["price"];
      let stock=product["stock"];
      price=price.toString().replace(",",".");
      let formData=new FormData();
      formData.append("name",name);
      formData.append("price",price);
      formData.append("stock",stock);
      for(const category of categories){
        formData.append("categories",category);
      }
      for(const image of this.images){
        formData.append("images",image,image.name);
      }
      this.productService.add(formData,res=>{
        this.toastr.success("Product added successfully");
        form.reset();
        this.imageUrls=[];

        this.router.navigate(["/products"]);

      })
    }

  }

  removeImage(name:string,index:number,size:number) {
    this.imageUrls.splice(index,1);
    let i=this.images.findIndex(x=>x.name==name && x.size==size);
    this.images.splice(i,1);
  }


}
