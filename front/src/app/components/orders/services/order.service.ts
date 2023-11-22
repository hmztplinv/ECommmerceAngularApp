import { Injectable } from '@angular/core';
import { MessageResponseModel } from 'src/app/common/models/message.response.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { BasketService } from '../../baskets/services/basket.service';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService:GenericHttpService,private basketService:BasketService) { }

  create(callBack:(res:MessageResponseModel)=>void){
    let userString=localStorage.getItem('user');
    let user=JSON.parse(userString);
    let model={userId:user._id};
    this.httpService.post<MessageResponseModel>("orders/create",model,res=>{
      this.basketService.getCount();
      callBack(res);
    });
  }

  getAll(callBack:(res:OrderModel[])=>void){
    let userString=localStorage.getItem('user');
    let user=JSON.parse(userString);
    let model={userId:user._id};
    this.httpService.post<OrderModel[]>("orders",model,res=>{
      callBack(res);
    });
  }
}
