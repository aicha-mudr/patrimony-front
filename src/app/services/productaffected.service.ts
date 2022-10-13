import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productaffected } from '../models/productaffected.model';

@Injectable({
  providedIn: 'root'
})
export class ProductaffectedService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public async getProductsaffected():Promise<Observable<any>>{
    return this.http.get<any>(`${this.apiServerURL}/Productaffected/allProductaffecteds`,)
  }

  public addProductaffected(productaffected: Productaffected): Observable<Productaffected> {
    return this.http.post<Productaffected>(`${this.apiServerURL}/Productaffected/add`, productaffected);
  }

  getById(productaffectedId: string) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/Productaffected/find/${productaffectedId}`);
  }
}
