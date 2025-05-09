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
  
  //   return this.http.get<any>(`${environment.apiUrl}/Customer/liv/${this.userId}`, { params });
  // }

  getLIVRequests(userid: number, pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
    // Set up query parameters for pagination and filtering
    let params = new HttpParams()
      .set('userid', userid)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);  // Add the filter parameter
    // Add filter to query params if it exists
   

    // Send GET request with query parameters
    return this.http.get(`${environment.apiUrl}/LIVRequests/GetLIVRequestsProc`, { params });
  }

  isDelegate(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/LIVRequests/IsDelegate/${userId}`);
  }
  IsApproverDelegate(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/LIVRequests/IsApproverDelegate/${userId}`);
  }
  getDelegatesApprover(userId:number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/LIVRequests/getApproverByDelegate/${userId}`);
  }
  
  deleteLivTask(livRequestId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/LIVRequests/DeleteLIVRequestByLIVRequestId/${livRequestId}`);
  }

  UpdateApprove(token:any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/updateApprove?token=${token}`);
  }
  updateReject(token:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Customer/updateReject?token=${token}`);
  }
  updateRejectGetlivRequestId(token:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Customer/updateRejectGetlivRequestId?token=${token}`);
  }
}
