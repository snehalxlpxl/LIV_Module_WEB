import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LoaderService } from 'app/global-loader/loader.service';
import { Company } from '../../customers/customer-list/company';

@Injectable({
  providedIn: 'root'
})
export class CreditLimitReqListService {

  rows: Company[];
  api:any;
  userId: any;
  userName: any;
  
  constructor(private http: HttpClient,private loaderService: LoaderService) {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      this.userName = userData.userName;
      this.userId = userData.userId;
      console.log('User Name:', this.userName);
      console.log('User ID:', this.userId);
  } else {
      console.log('No user data found in sessionStorage');
  }
  }
 
  deleteCompanyId(id:any): Observable<any[]> {
    return this.http.delete<any[]>(`${environment.apiUrl}/Customer/${id}`);
  }
  updateIsDeleted(id: number): Observable<any> {
    const data = { isDeleted: true }; // or whatever data you want to send
    return this.http.put<any>(`${environment.apiUrl}/Customer/update/${id}`, data);
  }
  
  // getCompanies(pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
  //   let params = new HttpParams()
  //     .set('pageNumber', pageNumber.toString())
  //     .set('pageSize', pageSize.toString())
  //     .set('filter', filter);  // Add the filter parameter
  
  //   return this.http.get<any>(`${environment.apiUrl}/Customer/liv`, { params });
  // }
  getCompanies(pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);  // Add the filter parameter
  
    return this.http.get<any>(`${environment.apiUrl}/Customer/liv/${this.userId}`, { params });
  }
}
