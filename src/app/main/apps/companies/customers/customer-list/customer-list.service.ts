// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerListService {

//   constructor() { }
// }


import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from './company';
import { environment } from 'environments/environment';
import { LoaderService } from 'app/global-loader/loader.service';


@Injectable()
export class CustomerListService {
  rows: Company[];
  api:any;
  
  constructor(private http: HttpClient,private loaderService: LoaderService) {
 
  }

  deleteCompanyId(id:any): Observable<any[]> {
    return this.http.delete<any[]>(`${environment.apiUrl}/Customer/${id}`);
  }
  updateIsDeleted(id: number): Observable<any> {
    const data = { isDeleted: true }; // or whatever data you want to send
    return this.http.put<any>(`${environment.apiUrl}/Customer/update/${id}`, data);
  }
  // getCompanies(pageNumber: number, pageSize: number): Observable<any> {
  //   let params = new HttpParams()
  //     .set('pageNumber', pageNumber.toString())
  //     .set('pageSize', pageSize.toString());

  //   return this.http.get<any>(`${environment.apiUrl}/Customer/cust2`, { params });
  // }
  getCompanies(pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);  // Add the filter parameter
  
    return this.http.get<any>(`${environment.apiUrl}/Customer/cust2`, { params });
  }
}
