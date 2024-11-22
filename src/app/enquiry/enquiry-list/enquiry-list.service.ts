import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnquiryListService {

  constructor(private http:HttpClient) { }

  getEnquiryList(pageNumber: number, pageSize: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', filter);  // Add the filter parameter
  
    return this.http.get<any>(`${environment.apiUrl}/Enquiries/EnquiryList`, { params });
  }
 
  deleteEnquiry(enquiryId: number): Observable<any> {
    const url = `${environment.apiUrl}/Enquiries/DeleteEnquiry/${enquiryId}`;
    return this.http.put(url, null).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting enquiry:', error);
        return throwError(error);
      })
    );
  }
}
