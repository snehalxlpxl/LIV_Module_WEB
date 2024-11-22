import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryPreviewEnquiryService {

  constructor(private http:HttpClient) { }

  getEnqDetailById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/enquiryDetails/${id}`);
  }
  getContainerById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/Container/${id}`);
  }
  getPakageById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/Pakages/${id}`);
  }
}
