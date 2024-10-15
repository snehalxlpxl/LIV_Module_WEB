import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivTaskApproveListService {

  constructor(private http: HttpClient) { }

  // getCompanies(pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
  //   let params = new HttpParams()
  //     .set('pageNumber', pageNumber.toString())
  //     .set('pageSize', pageSize.toString())
  //     .set('filter', filter);  // Add the filter parameter
  
  //   return this.http.get<any>(`${environment.apiUrl}/Customer/livTaskApprover`, { params });
  // }
  getCompanies(
    pageNumber: number, 
    pageSize: number, 
    filter: string = '', 
    approverId: number | null = null
  ): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);
  
    if (approverId !== null) {
      params = params.set('approverId', approverId.toString());
    }
  
    return this.http.get<any>(`${environment.apiUrl}/Customer/livTaskApprover`, { params });
  }
}
