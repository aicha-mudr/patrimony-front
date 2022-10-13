import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryManagement } from '../models/category-management.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getCategory():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/category/allCategories`)
  }
  public addCategory(category: CategoryManagement): Observable<CategoryManagement> {
    return this.http.post<CategoryManagement>(`${this.apiServerURL}/category/add`, category);
  }

  public updateCategory(category: CategoryManagement): Observable<CategoryManagement> {
    return this.http.put<CategoryManagement>(`${this.apiServerURL}/category/update`, category);
  }

  public deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/category/delete/${categoryId}`);
  }
}
