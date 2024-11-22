import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquireCreateService {
  private apiUrl = `${environment.apiUrl}/Enquiries`;
  
  constructor(private http:HttpClient) { }

  getIncoTerm(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getIncoTerm`);
  }
  getServiceType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/serviceType`);
  }
  createNewEnquiry(enquirydata: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };  
    const body = JSON.stringify(enquirydata);
    return this.http.post<any>(`${this.apiUrl}/insertdata`, body, { headers });
    // return null;
  }
  updateEnquiryById(enquId:any,enquirydata:any){
    return this.http.put(`${this.apiUrl}/${enquId}`, enquirydata);
  }
  getEnquiryById(enquiryId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/enquiryById/${enquiryId}`);
  }
  getEnquiryAddressById(id:number){
    return this.http.get(`${this.apiUrl}/enquiryAddressDetail/${id}`);
  }
  getEnquiryContainertById(id:number){
    return this.http.get(`${this.apiUrl}/enquiryContainerByEnqId/${id}`);
  }
  getEnquiryPakagesById(id:number){
    return this.http.get(`${this.apiUrl}/enquiryPakagesDetail/${id}`);
  }
  getEnquiryCompanyNameId(id:number){
    return this.http.get(`${this.apiUrl}/getEnquiryCompanyNameId/${id}`);
  }
  getEnquiryLeadNameId(id:number){
    return this.http.get(`${this.apiUrl}/getEnquiryLeadNameId/${id}`);
  }
}
