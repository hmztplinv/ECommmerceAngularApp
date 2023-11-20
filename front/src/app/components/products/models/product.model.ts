import { CategoryModel } from "../../categories/models/category.model";

export class ProductModel{
    _id:string="";
    name:string="";
    price:number=0;
    categories:CategoryModel[]=[];
    stock:number=0;
    isActive:boolean=true;
    createdDate:string="";
    imageUrls:any[]=[];
}