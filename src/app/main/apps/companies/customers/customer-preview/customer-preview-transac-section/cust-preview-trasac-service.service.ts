import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustPreviewTrasacServiceService {
  // rows: any[] = [];
  // api: any;
  // onCustomerListChanged: BehaviorSubject<any>;
  // private subscription: Subscription;

  constructor(private http: HttpClient) { 
    // Set the defaults
    // this.onCustomerListChanged = new BehaviorSubject({});
  }

  // getDataTableRows(id: number): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this.subscription = this.http.get(`${environment.apiUrl}/Customer/invoices/${id}`).subscribe((response: any) => {
  //       this.rows = response;
  //       console.log("invoices", this.rows);
  //       this.onCustomerListChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, (error) => {
  //       console.error(error);
  //       reject(error);
  //     });
  //   });
  // }
  getInvoices(id:number,pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);  // Add the filter parameter
  
    return this.http.get<any>(`${environment.apiUrl}/Customer/invoices2/${id}`, { params });
  }
  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  // getdatarow(id: any): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiUrl}/Customer/invoices?companyId=${id}`);
  // }
}