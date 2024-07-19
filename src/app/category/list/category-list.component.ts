import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMessage } from 'src/app/common/common-messages';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import '@angular/localize/init';
// import "@progress/kendo-theme-default/scss/grid/_index.sass";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public category: Category = new Category();
  public categoryList: Category[] = [];
  
 
  private commonMessage: any = CommonMessage;

  constructor(private service: CategoryService,
    public router: Router) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  private getCategoryList = (): void => {
    this.service.GetList().subscribe(data => {
      this.categoryList = data;
    });
  }

  public add = (): void => {
    this.router.navigate(['/category/add']);
  };

  public edit = (id: number): void => {
    this.router.navigate(['/category/edit/' + id]);
  };

  public view = (id: number): void => {
    this.router.navigate(['/category/view/' + id]);
  };

  public delete = (id: number): void => {
    if (confirm(this.commonMessage.deleteMessageConfirmation)) {
      this.service.Delete(id).subscribe(response => {
        if (!response) {
          alert(this.commonMessage.recordExistAgainstEntity.replace('{0}', 'Category'));
        }
        else {
          alert(this.commonMessage.deleteSuccess.replace('{0}', 'Category'));
          this.getCategoryList();
        }
      });
    }
  };
}