import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/category';
import { CommonMessage } from 'src/app/common/common-messages';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  ProductForm: FormGroup = new FormGroup({
    productId: new FormControl(''),
    productName: new FormControl(''),
    categoryId: new FormControl(''),
    price: new FormControl(''),
    supplierName: new FormControl(''),
    supplierEmail: new FormControl(''),
    supplierPhoneNo: new FormControl(''),
    productDescription: new FormControl(''),
    availableFrom: new FormControl(''),
    productWebsite: new FormControl(''),
    isActive: new FormControl(''),
    productImage: new FormControl(File),
    filePath: new FormControl(''),
  });

  public AvailableAt: string = '';
  public submitted = false;
  public cities: any[] = [];
  public categories: Category[] = [];
  public productid: any;
  public commonMessage: any;
  public pageTitle: string = '';
  public selectedFile: File | null;

  constructor(private formBuilder: FormBuilder,
    private service: ProductService,
    private categoryService: CategoryService,
    public router: Router,
    public route: ActivatedRoute,
    public datePipe: DatePipe) {
    this.productid = this.route.snapshot.paramMap.get('id');
    this.commonMessage = CommonMessage;
    this.selectedFile = null;
  }

  ngOnInit(): void {

    this.ProductForm = this.formBuilder.group(
      {
        productId: [0],
        productName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        categoryId: ['', Validators.required],
        price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        supplierName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        supplierEmail: ['', [Validators.required, Validators.email]],
        supplierPhoneNo: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        productDescription: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        availableFrom: ['', Validators.required],
        productWebsite: ['', Validators.required],
        isActive: ['', Validators.required],
        productImage: [File],
        filePath: [],

      },
    );
    this.getCities();
    this.getCategory();

    if (this.productid != null) {
      this.pageTitle = this.commonMessage.editTitle;
      this.bindData(parseInt(this.productid, 10));
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      this.AvailableAt = Array.from(checkboxes).map((checkbox: Element) => {
        return (checkbox as HTMLInputElement).value;
      }).join(',');

    }
    else {
      this.pageTitle = this.commonMessage.addTitle;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.ProductForm.controls;
  }

  cityCheck = () => {
    this.AvailableAt = '';
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.AvailableAt = Array.from(checkboxes).map((checkbox: Element) => {
      return (checkbox as HTMLInputElement).value;
    }).join(',');
  }

  getCities = () => {
    this.service.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  getCategory = () => {
    this.categoryService.GetList().subscribe(data => {
      this.categories = data;
    })
  }

  onFileSelected = (event: any) => {
    this.selectedFile = event.target.files[0];
  }

  private bindData = (id: number): void => {
    this.service.getById(id).subscribe(res => {
      res.filePath = null;
      res.availableFrom = this.datePipe.transform(res.availableFrom, 'yyyy-MM-dd');
      const selectedIdsArray = res.availableAt.split(',').map((id: string | number) => +id);
      this.cities.forEach(city => {
        city.checked = selectedIdsArray.includes(city.cityId);
      });
      this.ProductForm.patchValue(res);
    });
  }

  onSubmit = (): void => {
    this.submitted = true;
    this.ProductForm.markAllAsTouched();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    this.AvailableAt = Array.from(checkboxes).map((checkbox: Element) => {
      return (checkbox as HTMLInputElement).value;
    }).join(',');

    if (this.ProductForm.invalid || this.AvailableAt == null) {
      return;
    }

    let prouductItem: any = new FormData();
    prouductItem.append("productId", this.ProductForm.get('productId')?.value);
    prouductItem.append("productName", this.ProductForm.get('productName')?.value);
    prouductItem.append("categoryId", this.ProductForm.get('categoryId')?.value);
    prouductItem.append("price", this.ProductForm.get('price')?.value);
    prouductItem.append("supplierName", this.ProductForm.get('supplierName')?.value);
    prouductItem.append("supplierEmail", this.ProductForm.get('supplierEmail')?.value);
    prouductItem.append("supplierPhoneNo", this.ProductForm.get('supplierPhoneNo')?.value);
    prouductItem.append("productDescription", this.ProductForm.get('productDescription')?.value);
    prouductItem.append("availableFrom", this.ProductForm.get('availableFrom')?.value);
    prouductItem.append("productWebsite", this.ProductForm.get('productWebsite')?.value);
    prouductItem.append("isActive", this.ProductForm.get('isActive')?.value);
    prouductItem.append("availableAt", this.AvailableAt);
    prouductItem.append("filePath", this.ProductForm.get('filePath')?.value);
    if (this.selectedFile != null) {
      prouductItem.append("productImage", this.selectedFile, this.selectedFile?.name);
    }

    this.service.save(prouductItem).subscribe(() => {
      this.router.navigate(['/product']);
    });
  }

  onReset = (): void => {
    this.submitted = false;
    this.ProductForm.reset();
  }

  back = () => {
    this.router.navigate(['/product']);
  }

}
