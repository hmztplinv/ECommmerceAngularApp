import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from 'src/app/common/models/request.model';
import { ProductService } from '../products/services/product.service';
import { ProductModel } from '../products/models/product.model';
import { BasketModel } from '../baskets/models/basket.model';
import { BasketService } from '../baskets/services/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  categories: CategoryModel[] = [];
  requestModel : RequestModel=new RequestModel();
  products:ProductModel[]=[];

  constructor(private categoryService:CategoryService,private productService:ProductService,private basketService:BasketService,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getAll();
  }

  getAll(){
    this.productService.getAllForHomePage(this.requestModel,res => this.products = res);
  }

  getCategories() {
    this.categoryService.getAll(res => this.categories = res);
  }

  changeCategory(categoryId:string,categoryName:string) {
    this.requestModel.categoryName = categoryName;
    this.requestModel.categoryId = categoryId;
    this.getAll();
  }

  addBasket(productId:string,price:number){
    let model =new BasketModel();
    model.productId=productId;
    model.price=price;
    model.quantity=1;
    this.basketService.add(model,res=>{
      this.toastrService.success(res.message);
      this.getAll();
    });

  }



}
