import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategoryComponent } from '../components/sub-category/sub-category.component';
import { Subcategory } from '../models/subcategory.model';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getSubcategories():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/subcategory/allSubCategories`,)
  }
  public getCategories():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/category/allCategories`)
  }
  public getCategory(id : number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/category/find/${id}`)
  }
  public addSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${this.apiServerURL}/subcategory/add`, subcategory);
  }

  public updateSubcategory(subcategory: SubCategoryComponent): Observable<SubCategoryComponent> {
    return this.http.post<SubCategoryComponent>(`${this.apiServerURL}/subcategory/update`, subcategory);
  }


  public deleteSubcategory(subcategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/subcategory/delete/${subcategoryId}`);
  }

  getById(subcategoryId: number) : Observable<Subcategory> {
    return this.http.get<Subcategory>(`${this.apiServerURL}/subcategory/find/${subcategoryId}`);
  }
}
