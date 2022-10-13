import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entitytable } from '../models/entitytable.model';

@Injectable({
  providedIn: 'root'
})
export class EntitytableService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getEntitytables():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/Entity/allEntitytables`)
  }
  
  public addEntitytable(entitytable: Entitytable): Observable<Entitytable> {
    return this.http.post<Entitytable>(`${this.apiServerURL}/Entity/add`, entitytable);
  }

  

  public deleteEntitytable(entitytableId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/Entity/delete/${entitytableId}`);
  }
  
  getById(entitytableId: number) : Observable<void> {
    return this.http.get<void>(`${this.apiServerURL}/Entity/find/${entitytableId}`);
  }
}
