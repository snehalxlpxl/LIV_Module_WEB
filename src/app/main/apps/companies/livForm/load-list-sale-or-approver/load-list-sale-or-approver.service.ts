import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadListSaleOrApproverService {

  constructor(private http: HttpClient) { }
  
  // getLIVRequests(userid: number): Observable<any> {
  //   const url = `${environment.apiUrl}/LIVRequests/GetLIVRequestsProc`;
  //   const params = new HttpParams().set('userid', userid.toString());

  //   return this.http.get<any>(url, { params });
  // }
  // http://localhost:5269/api/LIVRequests/GetLIVRequestsProc?userid=113061
}
