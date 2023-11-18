import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { CategoryModel } from '../models/category.model';
import { MessageResponseModel } from 'src/app/common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService:GenericHttpService) { }

  // getAll(callBack:(res:CategoryModel[])=>void){
  //   this.httpService.get<CategoryModel[]>('categories',res=>callBack(res));
  // }
  getAll(callBack: (res: CategoryModel[]) => void){
    this.httpService.get<{success: boolean, message: string, categories: CategoryModel[]}>('categories', res => callBack(res.categories));
}

  // get(id:string,callBack:(res:CategoryModel)=>void){
  //   this.httpService.get<CategoryModel>('categories/'+id,res=>callBack(res));
  // }
  add(name:string,callBack:(res:MessageResponseModel)=>void){
    let model={name:name};
    this.httpService.post<MessageResponseModel>('categories/add',model,res=>callBack(res));
  }
  update(model:CategoryModel,callBack:(res:MessageResponseModel)=>void){
    this.httpService.post<MessageResponseModel>('categories/update/',model,res=>callBack(res));
  }
  removeById(id:string,callBack:(res:MessageResponseModel)=>void){
    let model={_id: id};
    this.httpService.post<MessageResponseModel>('categories/removeById/',model,res=>callBack(res));
  }

}
