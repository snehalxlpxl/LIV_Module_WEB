import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { Company } from '../customer-list/company';
// import { CompanyInfo } from './customer-create-model/CustomerInfo';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreateService {

  constructor(private http: HttpClient) { }

  getSalesPerson(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/alluser`);
  }
  createNewCustomer(company: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };  
    const body = JSON.stringify(company);
    return this.http.post<any>(`${environment.apiUrl}/Customer`, body, { headers });
}
  getCurrency(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/currency`);
  }
  getCreditDays(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/creditDays`);
  }
 
  // getCompanies(searchTerm?: string): Observable<any[]> {
  //   let url = `${environment.apiUrl}/Customer/cust`;
  //   // if (searchTerm) {
  //   //   url += `?search=${searchTerm}`;
  //   // }
  //   return this.http.get<any[]>(url);
  // }
  private readonly storageKey = 'companiesCache';
  getCompanies(searchTerm?: string): Observable<any[]> {
    const cachedData = localStorage.getItem(this.storageKey);

    // If no search term and cached data is available, return cached data
    if (!searchTerm && cachedData) {
      return of(JSON.parse(cachedData));
    }

    // Define the API URL and add search term if provided
    let url = `${environment.apiUrl}/Customer/cust`;
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }

    // Fetch data from API and cache it if there's no search term
    return this.http.get<any[]>(url).pipe(
      tap(data => {
        if (!searchTerm) {
          localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
      })
    );
  }
  updateCustomerById(id:number,customerData:any){
    return this.http.put(`${environment.apiUrl}/Customer/${id}`, customerData);
  }
 
  getCustomerById(id:number): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Customer/${id}`);
  }
  // 
  getCustAddressById(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/address/${id}`);
  }
  getCustContactById(id:number){
    return this.http.get(`${environment.apiUrl}/Customer/contact/${id}`);
  }
  getCustTaxDetailById(id:number){
    return this.http.get(`${environment.apiUrl}/Customer/taxdetails/${id}`);
  }

  checkUniqueCustomerName(name: string): Observable<UniqueCheckResponse> {
    // console.log('Checking unique name for:', name);
    return this.http.get<UniqueCheckResponse>(`${environment.apiUrl}/Customer/check-unique?name=${name}`).pipe(
      catchError((error) => {
        console.error('Error in checkUniqueCustomerName:', error);
        return of({ isExsist: false });
      })
    );
  }
  
}
export interface UniqueCheckResponse {
  isExsist: boolean;
}