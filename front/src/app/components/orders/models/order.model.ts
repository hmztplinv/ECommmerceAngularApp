import { ProductModel } from "../../products/models/product.model";

export class OrderModel{
    _id:string='';
    userId:string='';
    productId:string='';
    product:ProductModel[]=[];
    quantity:number=0;
    price:number=0;
    createdDate:string='';
}