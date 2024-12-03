import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerEnquiryListSectionService {

  constructor(private http:HttpClient) { }

  getEnquiryListByCompanyId(id:number,pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);  // Add the filter parameter 
  
    return this.http.get<any>(`${environment.apiUrl}/Customer/getEnquiryListByCompanyId/${id}`, { params });
  }
}
