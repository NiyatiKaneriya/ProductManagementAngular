import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

  public category: Category = new Category();

  private categoryid: string | null = '';

  constructor(private service: CategoryService,
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryid = this.route.snapshot.paramMap.get('id');
    if (this.categoryid != null) {
      this.service.View(parseInt(this.categoryid, 10)).subscribe(res => {
        this.category = res;
      });
    }
  }

  public back = (): void => {
    this.router.navigate(['/category']);
  }
}
