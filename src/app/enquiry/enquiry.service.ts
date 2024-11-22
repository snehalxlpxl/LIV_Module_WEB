import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = `${environment.apiUrl}/Enquiries`;

  constructor(private http: HttpClient) { }
  // Method to fetch company types
  getCompanyType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetCompanyType`); 
  }
  getCompaniesEmail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetCompaniesEmail/${id}`); // Append the ID to the URL
  }
}
