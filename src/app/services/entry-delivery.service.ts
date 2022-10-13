import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntryDeliveryReceipt } from '../models/entry-delivery-receipt.model';

@Injectable({
  providedIn: 'root'
})
export class EntryDeliveryService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }



  public addEntryDeliveryReceipt(entrydeliveryReceipt): Observable<EntryDeliveryReceipt> {
    return this.http.post<EntryDeliveryReceipt>(`${this.apiServerURL}/BonLivraison/add`, entrydeliveryReceipt);
  }

  public async getEntryDemands():Promise<Observable<any>>{
    return this.http.get<any>(`${this.apiServerURL}/BonEntree/allEntryrequests`)
  }

  public async getEntryDeliveryReceipts():Promise<Observable<any>>{
    return this.http.get<any>(`${this.apiServerURL}/BonLivraison/allreceipts`)
  }
}
