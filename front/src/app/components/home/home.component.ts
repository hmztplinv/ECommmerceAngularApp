import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from 'src/app/common/models/request.model';

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

  constructor(private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll(res => this.categories = res);
  }

  changeCategory(categoryId:string,categoryName:string) {
    this.requestModel.categoryName = categoryName;
    this.requestModel.categoryId = categoryId;
  }



}
