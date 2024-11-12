import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface VwLivrequest {
  companyId: any;
  livrequestId: number;
  salesPersonId: number;
  isNewCustomer: boolean;
  customerId?: number;
  customerName?: string;
  branchId: number;
  creditLimit?: number;
  creditTerms?: string;
  status?: string;
  requestedDate?: Date;
  modifiedDate?: Date;
  notes?: string;
  createdBy?: number;
  modifiedBy?: number;
  branchName?: string;
  salesPersonName?: string;
  isDeleted: number;
  branch: string;
}
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
  // private baseUrl =  'http://localhost:5116/api/CountProfitReport';
  private baseUrl = 'http://108.181.191.121:5053/api/CountProfitReport';
// Method to get Count by Company
getCountByCompany(companyId: any): Observable<any> {
  const url = `${this.baseUrl}/CountByCompany/${companyId}`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Add any other headers Swagger might use
  });
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

// Method to get Sum of Realized Revenue
getSumRealizedRevenue(companyId: any): Observable<any> {
  const url = `${this.baseUrl}/SumRealizedRevenue/${companyId}`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Add any other headers Swagger might use
  });
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

// Method to get Sum of Realized Revenue for the Last 60 Days
getSumOfRealizedRevenueLast60Days(companyId: any): Observable<any> {
  const url = `${this.baseUrl}/SumOfRealizedRevenueLast60Days/${companyId}`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Add any other headers Swagger might use
  });
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

// Method to get Sum of Realized Revenue for the Last N Days
getSumOfRealizedRevenueLastNDays(companyId: number, days: number): Observable<any> {
  const url = `${this.baseUrl}/SumOfRealizedRevenueLastNDays/${companyId}/${days}`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', // Add any other headers Swagger might use
  });
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

getLivrequestById(livRequestId: number): Observable<VwLivrequest> {
  return this.http.get<VwLivrequest>(`${this.apiUrl}/GetLiv/${livRequestId}`);
}

}
