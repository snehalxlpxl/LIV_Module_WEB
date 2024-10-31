import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivPreviewService {

  private apiUrl = `${environment.apiUrl}/LIVRequests`;

  constructor(private http: HttpClient) { }
  getLIVRequest(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetLIVRequests/${id}`);
  }

  getBranchName(id): Observable<any>{
    return this.http.get(`${this.apiUrl}/Companies/${id}`);
  }
  cancelLivRequest(cancelReq: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Customer/cancelLivRequest`, cancelReq);
  }
  
    getLIVApprovalTasks(userId: number, LIVRequestId: number): Observable<any> {
     
      const params = new HttpParams()
        .set('userId', userId)
        .set('LIVRequestId', LIVRequestId);
  
      return this.http.get<any>(`${environment.apiUrl}/LIVRequests/LIVApprovalTask1`, { params });
    }

    getLIVApprovalTaskStatus(LIVRequestId: number, userId: number): Observable<string> {
      const params = new HttpParams()
        .set('LIVRequestId', LIVRequestId)
        .set('userId', userId);
    
      return this.http.get(`${environment.apiUrl}/LIVRequests/CheckLIVApprovalTaskStatus`, { params, responseType: 'text' });
    }
    
     // Call CheckUserSalesPersonOrCreatedBy API
  checkUserSalesPersonOrCreatedBy(userId: number, LIVRequestId: number): Observable<any> {
    const url = `${environment.apiUrl}/LIVRequests/CheckUserSalesPersonOrCreatedBy/${userId}/${LIVRequestId}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle error response
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  checkUserSalesPersonOrCreatedByApprover(userId: number, LIVRequestId: number): Observable<any> {
    const url = `${environment.apiUrl}/LIVRequests/CheckUserSalesPersonOrCreatedByApprover/${userId}/${LIVRequestId}`;
    return this.http.get<any>(url);
  }
  
}
