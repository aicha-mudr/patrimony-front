import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noinvproduct } from '../models/noinvproduct.model';

@Injectable({
  providedIn: 'root'
})
export class NoinvproductService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getNoInvproducts():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/NoinvProductReceipt/GetAllNoInvProductReceipt`,)
  }

  public addNoInvproduct(noinvproduct: Noinvproduct): Observable<Noinvproduct> {
    return this.http.post<Noinvproduct>(`${this.apiServerURL}/NoinvProductReceipt/add`, noinvproduct);
  }

  getById(noinvproductId: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/NoinvProductReceipt/find/${noinvproductId}`);
  }

  public updateNoInvproduct(noinvproduct: Noinvproduct): Observable<Noinvproduct> {
    return this.http.post<Noinvproduct>(`${this.apiServerURL}/NoinvProductReceipt/update`, noinvproduct);
  }
}
