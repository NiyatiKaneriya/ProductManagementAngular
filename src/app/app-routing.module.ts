import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'category', loadChildren: () => import('../app/category/category-routing.module').then(x => x.CategoryRoutingModule) },
  { path: 'product', loadChildren: () => import('../app/product/product-routing.module').then(x => x.ProductRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
