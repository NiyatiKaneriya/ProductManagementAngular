import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Products } from './product';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly producturl = 'https://localhost:44339/api/Products/';

  constructor(private http: HttpClient) { }

  getAllProducts = (): Observable<any[]> => {
    return this.http.get<any[]>(this.producturl + 'GetAllProducts');
  }

  getCities = (): Observable<any[]> => {
    return this.http.get<any[]>(this.producturl + 'GetCities');
  }

  getById = (id: number): Observable<Products> => {
    return this.http.get<Products>(this.producturl + 'GetProductById/id?id=' + id);
  }

  delete = (id: number): Observable<Boolean> => {
    return this.http.delete<Boolean>(this.producturl + 'DeleteProduct/id?id=' + id);
  }

  save = (productAddEdit: Products): Observable<Products> => {
    return this.http.post<Products>(this.producturl + 'Save', productAddEdit);
  }

  getImage = (id: number): Observable<any> => {
    return this.http.post<any>(this.producturl + 'GetImage?id=' + id, id);
  }
}
