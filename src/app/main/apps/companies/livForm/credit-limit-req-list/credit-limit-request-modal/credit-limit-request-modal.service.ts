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
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/branch`);
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
}
