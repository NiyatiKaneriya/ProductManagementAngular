import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CommonMessage } from 'src/app/common/common-messages';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productList: any[] = [];

  private commonMessage: any = CommonMessage;

  constructor(private service: ProductService,
    public router: Router) { }

  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList = () => {
    this.service.getAllProducts().subscribe(data => {
      this.productList = data;
    });
  }

  add = () => {
    this.router.navigate(['/product/add']);
  }

  edit = (id: number) => {
    this.router.navigate(['/product/edit/' + id]);
  }

  view = (id: number) => {
    this.router.navigate(['/product/view/' + id]);
  }

  public delete = (id: number): void => {
    if (confirm(this.commonMessage.deleteMessageConfirmation)) {
      this.service.delete(id).subscribe(response => {
        if (!response) {
          alert(this.commonMessage.recordExistAgainstEntity.replace('{0}', 'Product'));
        } else {
          alert(this.commonMessage.deleteSuccess.replace('{0}', 'Product'));
          this.refreshProductList();
        }
      });
    }
  };
}
