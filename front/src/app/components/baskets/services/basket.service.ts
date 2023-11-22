import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { BasketModel } from '../models/basket.model';
import { MessageResponseModel } from 'src/app/common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
count:number=0;
  constructor(private htppService:GenericHttpService) { }


  getAll(callback:(res:BasketModel[])=>void){
    let userString=localStorage.getItem('user');
    let user=JSON.parse(userString);
    let model={userId:user._id};
    this.htppService.post<BasketModel[]>("baskets",model,res=>callback(res));
  }

  getCount(){
    let userString=localStorage.getItem('user');
    let user=JSON.parse(userString);
    let model={userId:user._id};
    this.htppService.post<any>("baskets/getBasketCount",model,res=>this.count=res.basketCount);
  }

  add(model:BasketModel,callback:(res:MessageResponseModel)=>void){
    let userString=localStorage.getItem('user');
    let user=JSON.parse(userString);
    model.userId=user._id;
    this.htppService.post<MessageResponseModel>("baskets/add",model,res=>{callback(res);this.getCount();});
  }

  removeById(model:any,callback:(res:MessageResponseModel)=>void){
    this.htppService.post<MessageResponseModel>("baskets/removeById",model,res=>{this.getCount();callback(res);});
  }

}
