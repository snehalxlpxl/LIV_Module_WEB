import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivPreviewTimelineSectionService {

  constructor(private http: HttpClient) { }

  // Method to get timeline by task ID
  getLivTaskTimeLine(taskId: number): Observable<any> {
    const url = `${environment.apiUrl}/LIVTimeLine/GetLivTaskTimeLine/${taskId}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  private apiUrl = `${environment.apiUrl}/Customer/get-approver-levels`;
  getApproverLevels(creditLimit: any, branchName: any): Observable<any> {
    const params = new HttpParams()
      .set('creditLimit', creditLimit.toString())
      .set('branchName', branchName);

    return this.http.get(this.apiUrl, { params });
  }


}
