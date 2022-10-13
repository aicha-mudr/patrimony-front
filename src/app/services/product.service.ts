import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import {CategoryManagement} from "../models/category-management.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getProduct():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/product/allProducts`)
  }
  getProductOfSelected(selectedProductId : number):Observable<any> {
    let par = new HttpParams().set('products',selectedProductId);
    return this.http.get<any>(`${this.apiServerURL}/product/allProducts`,{params:par})

  }
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerURL}/product/add`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerURL}/product/update`, product);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/product/delete/${productId}`);
  }
  public getCategories():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/category/allCategories`)
  }
  public getSubcategories():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/subcategory/allSubCategories`)
  }
  getSubcategoryOfSelected(selectedCategoryId : number):Observable<any> {
    let par = new HttpParams().set('categories',selectedCategoryId);
    return this.http.get<any>(`${this.apiServerURL}/subcategory/allSubCategories`,{params:par})

  }
  getById(productId: number) : Observable<void> {
    return this.http.get<void>(`${this.apiServerURL}/product/find/${productId}`);
  }
}
