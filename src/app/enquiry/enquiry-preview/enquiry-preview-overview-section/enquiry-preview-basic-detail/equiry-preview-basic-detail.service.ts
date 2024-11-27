import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiryPreviewBasicDetailService {

  constructor(private http:HttpClient) { }

  getDetalByVIew(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/getDetalByVIew/${id}`);
  }
  getCompanyDataById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/getCustomerData/${id}`);
  }
  getLeadDataById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/getLeadData/${id}`);
  }
}
