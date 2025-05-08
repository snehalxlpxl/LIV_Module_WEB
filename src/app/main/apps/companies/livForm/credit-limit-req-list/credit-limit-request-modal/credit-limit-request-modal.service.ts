import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditLimitRequestModalService {

  constructor(private http: HttpClient) { }

  getBranch(): Observable<any[]> {
    // return this.http.get<any[]>(`${environment.apiUrl}/Customer/branch`);
    return this.http.get<any[]>(`http://108.181.191.121:5000/api/Company/branch`);
    
  }
  createCreditLimitRequest(data:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/Customer/liv`,data);
  }

  private readonly storageKey = 'companiesCache';
  getCompaniesliv(searchTerm?: string): Observable<any[]> {
    const cachedData = localStorage.getItem(this.storageKey);

    // If no search term and cached data is available, return cached data
    if (!searchTerm && cachedData) {
      return of(JSON.parse(cachedData));
    }

    // Define the API URL and add search term if provided
    let url = `http://108.181.191.121:5000/api/Company/cust`;
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
   // Function to update credit limit request
   updateCreditLimitRequest(id: number, requestData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Customer/liv/${id}`, requestData);
  }
  checkCustomerExists(customerName: string,branch:string): Observable<boolean> {
    // http://localhost:5269/api/LIVRequests/check-exists?name=MSOURCE%20SOLUTIONS

    return this.http.get<boolean>(`${environment.apiUrl}/LIVRequests/check-exists?name=${customerName}&branch=${branch}`);
  }
  CheckCustomerExistsApprove(status: string,LivrequestId:string): Observable<boolean> {

    return this.http.get<boolean>(`${environment.apiUrl}/LIVRequests/check-exists-Approve-status?status=${status}&LivrequestId=${LivrequestId}`);
  }
  CheckOldLivRequest(LivrequestId:string): Observable<boolean> {

    return this.http.get<boolean>(`${environment.apiUrl}/LIVRequests/check-exists-old-request?LivrequestId=${LivrequestId}`);
  }
  getNextDecemberDate(date: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Customer/GetNextDecemberDate?date=${date}`);
  }
  getSegmentByProfit(profit: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Customer/GetSegmentByProfit/${profit}`);
  }

  // http://localhost:5269/api/LIVRequests/check-exists-Approve-status?status=Approved&LivrequestId=181
}
