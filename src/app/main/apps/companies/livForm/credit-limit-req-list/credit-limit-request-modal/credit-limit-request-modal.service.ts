import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditLimitRequestModalService {

  constructor(private http: HttpClient) { }

  getBranch(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/branch`);
  }
  createCreditLimitRequest(data:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/Customer/liv`,data);
  }
}
