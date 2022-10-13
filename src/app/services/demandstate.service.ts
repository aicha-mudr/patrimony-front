import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandstateService {
  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public getDemandstate():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/Demandstate/allDemandstate`)
  }
}
