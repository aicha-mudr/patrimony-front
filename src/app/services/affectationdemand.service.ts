import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Affectationdemand } from '../models/affectationdemand.model';

@Injectable({
  providedIn: 'root'
})
export class AffectationdemandService {

  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getAffectationdemands():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/Affectationdemand/allDemands`,)
  }
  
  public addAffectationdemand(affectationdemand: Affectationdemand): Observable<Affectationdemand> {
    return this.http.post<Affectationdemand>(`${this.apiServerURL}/Affectationdemand/add`, affectationdemand);
  }
}
