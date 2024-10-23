import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApproveModalService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${environment.apiUrl}/Customer/uploadFile`, formData);
  }
  updateApprovalTaskForDelegate(updateTask: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Customer/updateApprovalTaskForDelegate`, updateTask);
  }
  getApproverByDelegateId(delegateId: number) {
    return this.http.get<{ approverId: number }>(`${environment.apiUrl}/Customer/GetApproverByDelegateId/${delegateId}`);
  }
}
