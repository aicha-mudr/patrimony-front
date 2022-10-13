import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Deliverynoinv } from '../models/deliverynoinv.model';

@Injectable({
  providedIn: 'root'
})
export class DeliverynoinvService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getDeliverynoinvs():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/Deliverynoinv/GetAllDeliverynoinv`,)
  }

  public addDeliverynoinv(deliverynoinv: Deliverynoinv): Observable<Deliverynoinv> {
    return this.http.post<Deliverynoinv>(`${this.apiServerURL}/Deliverynoinv/add`, deliverynoinv);
  }

  getById(deliverynoinvId: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/Deliverynoinv/find/${deliverynoinvId}`);
  }
}
