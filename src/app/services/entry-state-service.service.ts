import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryStateServiceService {
  private apiServerURL=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public async getEntryStates():Promise<Observable<any>>{
    return this.http.get<any>(`${this.apiServerURL}/Entrystate/allEntrystate`)
  }
}
