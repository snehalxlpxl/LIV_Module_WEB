import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxDetailsService {
  private taxDetailsList = new BehaviorSubject<any[]>([]);
  currentTaxDetailsList = this.taxDetailsList.asObservable();

  constructor(private http: HttpClient) { }

  addTaxDetails(taxDetails: any) {
    const currentList = this.taxDetailsList.value;
    currentList.push(taxDetails);
    this.taxDetailsList.next(currentList);
  }

  getTaxDetailsList() {
    return this.taxDetailsList.value;
  }

  getGstRegistrationType(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/GetGstRegistrationType`);
  }
  updateCustGst(id: number, data: any): Observable<string> {
    return this.http.put<string>(
      `${environment.apiUrl}/Customer/update/Gst/${id}`,
      data,
      { responseType: "text" as "json" }
    );
  }
  insertGST(gstdata: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };  
    const body = JSON.stringify(gstdata);
    return this.http.post<any>(`${environment.apiUrl}/Customer/insert/Gst`, body, { headers });
  }

}
