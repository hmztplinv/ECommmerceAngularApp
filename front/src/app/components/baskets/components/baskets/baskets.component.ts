import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BasketModel } from '../../models/basket.model';
import { BasketService } from '../../services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/common/services/swal.service';
import { OrderService } from 'src/app/components/orders/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit{

  baskets: BasketModel[] = [];
  sum: number = 0;

  constructor(private _basket: BasketService,
  private _toastr: ToastrService,
  private _swal: SwalService,private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._basket.getAll(res=> {
      const response = { baskets: res as BasketModel[] };
      this.baskets = response.baskets;
      this.calculate();
    });
  }
  
  calculate(){
    this.sum = 0;
    this.baskets.forEach(element=> {
      this.sum += (element.price * element.quantity)
    });
  }

  removeById(_id: string){
    this._swal.callSwal("Are you sure delete this?","Delete Product", null, "Delete",()=>{
      let model = {_id: _id};
      this._basket.removeById(model, res=> {
        this._toastr.info(res.message);
        this.getAll();
      });
    })
  }

  createOrder(){
    this.orderService.create(res=>{
      this._toastr.info(res.message);
      this.getAll();
      this.router.navigateByUrl("/orders");

    });
  }

}
