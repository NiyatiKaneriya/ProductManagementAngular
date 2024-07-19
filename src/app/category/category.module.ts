import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailsComponent } from './details/category-details.component';
import { CategoryListComponent } from './list/category-list.component';
import { CategoryViewComponent } from './view/category-view.component';
import { CategoryRoutingModule } from './category-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    CategoryDetailsComponent,
    CategoryListComponent,
    CategoryViewComponent
  ],
  imports: [
BrowserAnimationsModule, BrowserModule,
    CommonModule,
    NgOptimizedImage, ReactiveFormsModule,CategoryRoutingModule,GridModule
  ],
  exports: [
    CategoryDetailsComponent,
    CategoryListComponent,
    CategoryViewComponent
  ]
})
export class CategoryModule { }
