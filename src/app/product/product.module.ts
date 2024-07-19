import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductListComponent } from './list/product-list.component';
import { ProductViewComponent } from './view/product-view.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule, NgOptimizedImage, ReactiveFormsModule, ProductRoutingModule
  ],
  exports: [
    ProductDetailComponent,
    ProductListComponent,
    ProductViewComponent
  ]
})
export class ProductModule { }
