import { ProductModel } from "../../products/models/product.model";

export class BasketModel{
    _id:string='';
    userId:string='';
    productId:string='';
    products:ProductModel[]=[];
    quantity:number=1;
    price:number=0;
}