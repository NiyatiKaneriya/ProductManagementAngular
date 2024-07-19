import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Products } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})

export class ProductViewComponent implements OnInit {

  public products: Products = new Products();
  public imageSrc: string = '';

  private productid: string | null = '';

  constructor(public service: ProductService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.productid = this.route.snapshot.paramMap.get('id');
    if (this.productid != null) {
      this.service.getById(parseInt(this.productid, 10)).subscribe(res => {
        this.products = res;
        this.fetchImage(res.productId);
      });
    }
  }

  back = () => {
    this.router.navigate(['/product']);
  }

  fetchImage = (id: number): void => {
    this.service.getImage(id).subscribe((response: any) => {
      this.imageSrc = "data:image/png;base64," + response.replace('"', '').replace('="', '=');
    });
  }

}