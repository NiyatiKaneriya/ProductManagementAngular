import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './list/category-list.component';
import { CategoryDetailsComponent } from './details/category-details.component';
import { CategoryViewComponent } from './view/category-view.component';

const routes: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "add", component: CategoryDetailsComponent },
  { path: "edit/:id", component: CategoryDetailsComponent },
  { path: "view/:id", component: CategoryViewComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class CategoryRoutingModule { }
