import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly categoryurl = 'https://localhost:44339/api/Category/';

  constructor(private http: HttpClient) { }

  GetList = (): Observable<any[]> => {
    return this.http.get<any[]>(this.categoryurl + 'GetCategories');
  }

  Get = (id: number): Observable<Category> => {
    return this.http.get<Category>(this.categoryurl + 'GetCategory/id?id=' + id)
  }

  Delete = (id: number): Observable<boolean> => {
    return this.http.delete<boolean>(this.categoryurl + 'DeleteCategory?categoryId=' + id)
  }
  
  Save = (category: Category): Observable<Category> => {
    return this.http.post<Category>(this.categoryurl + 'Save', category);
  }

  View = (id: number): Observable<Category> => {
    return this.http.get<Category>(this.categoryurl + 'ViewCategory?id=' + id);
  }
}
