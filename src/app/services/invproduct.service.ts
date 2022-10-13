import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invproduct } from '../models/invproduct.model';

@Injectable({
  providedIn: 'root'
})
export class InvproductService {
  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getInvproducts():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/InvProductReceipt/GetAllInvProductReceipt`,)
  }
  /*
  public getCategory(id : number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/category/find/${id}`)
  }*/
  public addInvproduct(invproduct: Invproduct): Observable<Invproduct> {
    return this.http.post<Invproduct>(`${this.apiServerURL}/InvProductReceipt/add`, invproduct);
  }

  public updateInvproduct(invproduct: Invproduct): Observable<Invproduct> {
    return this.http.post<Invproduct>(`${this.apiServerURL}/InvProductReceipt/update`, invproduct);
  }
  

  /*public updateInvproduct(subcategory: SubCategoryComponent): Observable<SubCategoryComponent> {
    return this.http.post<SubCategoryComponent>(`${this.apiServerURL}/subcategory/update`, subcategory);
  }*/


  /*public deleteSubcategory(subcategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/subcategory/delete/${subcategoryId}`);
  }*/

  getById(invproductId: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/ProductReceipt/find/${invproductId}`);
  }
}
