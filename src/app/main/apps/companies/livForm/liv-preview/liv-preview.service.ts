import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

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
}
