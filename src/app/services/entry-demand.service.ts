import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntryDemand } from '../models/entry-demand.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryDemandService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  //public getEntryDemandS():Observable<any>{
   // return this.http.get<any>(`${this.apiServerURL}/BonEntree/allSubCategories`,)
 // }
  
  public addEntryDemand(entryDemand: EntryDemand): Observable<EntryDemand> {
    return this.http.post<EntryDemand>(`${this.apiServerURL}/BonEntree/add`, entryDemand);
  }
  
}
