import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductViewComponent } from './view/product-view.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "add", component: ProductDetailComponent },
  { path: "edit/:id", component: ProductDetailComponent },
  { path: "view/:id", component: ProductViewComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  providers: [DatePipe]
})
export class ProductRoutingModule { }
