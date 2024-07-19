import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { CommonMessage } from 'src/app/common/common-messages';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  CategoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(''),
    categoryName: new FormControl(''),
    sequence: new FormControl('')
  });

  public submitted = false;
  public pageTitle = '';
  public commonMessage: any;

  private categoryid: string | null = '';

  constructor(private fromBuilder: FormBuilder,
    private service: CategoryService,
    public router: Router,
    private route: ActivatedRoute) {
    this.categoryid = this.route.snapshot.paramMap.get('id');
    this.commonMessage = CommonMessage;
  }

  ngOnInit(): void {
    this.CategoryForm = this.fromBuilder.group(
      {
        categoryId: [''],
        categoryName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        sequence: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
      }
    )

    if (this.categoryid != null) {
      this.pageTitle = this.commonMessage.editTitle;
      this.bindData(parseInt(this.categoryid, 10));
    }
    else {
      this.pageTitle = this.commonMessage.addTitle;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.CategoryForm.controls;
  }

  private bindData = (id: number): void => {
    this.service.Get(id).subscribe(res => {
      this.CategoryForm.patchValue(res);
    });
  }

  public save = (category: Category): void => {
    this.service.Save(category).subscribe(() => {
      this.router.navigate(['/category']);
    })
  }

  public cancel = (): void => {
    this.router.navigate(['/category']);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.CategoryForm.invalid) {
      return;
    }
    this.save(this.CategoryForm.value);
  }

}
