import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquireCreateService {
  private apiUrl = `${environment.apiUrl}/Enquiry`;
  
  constructor(private http:HttpClient) { }

  getIncoTerm(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getIncoTerm`);
  }
  getServiceType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/serviceType`);
  }
}
