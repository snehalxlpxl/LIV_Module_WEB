import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryPriviewAddressService {

  constructor(private http:HttpClient) { }
  getEnqAddressById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Enquiries/enquiryAddress/${id}`);
  }
}
