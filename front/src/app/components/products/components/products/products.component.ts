import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ProductModel } from '../../models/product.model';
import { RequestModel } from 'src/app/common/models/request.model';
import { ProductService } from '../../services/product.service';
import { SwalService } from 'src/app/common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<ProductModel[]>();
  request: RequestModel = new RequestModel();
  product: ProductModel = new ProductModel();
  pageNumbers: number[] = [];
  constructor(private _product: ProductService, private swal: SwalService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._product.getAll(this.request, res => {
      this.result = res;
      this.setPageNumbers();
    });
  }

  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  search() {
    if (this.request.searchText.length > 3) {
      this.getAll(1);
    }
  }

  removeById(id: string) {
    this.swal.callSwal("Are you sure you want to delete this product?", "warning", "Yes, delete it!", "No, keep it", () => {
      let model = { _id: id };
      this._product.removeById(model, res => {
        this.toastr.success("Product deleted successfully");
        this.getAll(this.request.pageNumber);
      })
    })
  }

  changeProductStatus(id: string) {
    let model = { _id: id };
    this._product.changeActiveStatus(model, res => {
      this.toastr.success("Product status changed successfully");
      

    })
  }
}
