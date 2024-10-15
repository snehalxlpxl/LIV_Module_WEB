import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Company } from './company';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CustomerPreviewShipmentService {
  rows: any[];
  api:any;
  // onCustomerListChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient) { 
      // Set the defaults
      // this.onCustomerListChanged = new BehaviorSubject({});
  }
// /**
//    * Resolver
//    *
//    * @param {ActivatedRouteSnapshot} route
//    * @param {RouterStateSnapshot} state
//    * @returns {Observable<any> | Promise<any> | any}
  //  
// resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
//   return new Promise<void>((resolve, reject) => {
//     Promise.all([this.getDataTableRows()]).then(() => {
//       resolve();
//     }, reject);
//   });
// }
    /**
   * Get rows
   */
    // getDataTableRows(): Promise<any[]> {
    //   return new Promise((resolve, reject) => {
    //     this.http.get(`${environment.apiUrl}/Customer/shipment`).subscribe((response: any) => {
    //       this.rows = response;
    //       // console.log(this.rows);
    //       this.onCustomerListChanged.next(this.rows);
    //       resolve(this.rows);
    //     }, reject);
    //   });
    // }

    // fetchShipment(id: any): Observable<any[]> {
    //   return this.http.get<any[]>(`${environment.apiUrl}/Customer/shipment?companyId=${id}`);
    // }
   
    getShipments(id:number,pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
      let params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('filter', filter);  // Add the filter parameter
    
      return this.http.get<any>(`${environment.apiUrl}/Customer/shipment2/${id}`, { params });
    }
}
