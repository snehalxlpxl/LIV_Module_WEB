import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivApproveService {

  constructor(private http: HttpClient){
    
  }
  livApproveById(id:any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/livApprovebyId/${id}`);
  }
  updateApprovalTask(livrequestId: any, status: any, rejectReason: string,approverId: number ): Observable<any> {
    const url = `${environment.apiUrl}/Customer/updateApprovalTask`;
    const params = { livrequestId, Status: status,  RejectReason: rejectReason ,   approverId: approverId }; // Assuming Status is case-sensitive
    return this.http.post(url, params); // Switched to POST, adjust according to API docs
  }
}
