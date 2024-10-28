import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivDocumentUploadService {

  constructor(private http: HttpClient) { }

  livUploadFile(file: File, livRequestId: number, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('livRequestId', livRequestId.toString());
    formData.append('userId', userId.toString());
  
    return this.http.post<any>(`${environment.apiUrl}/Customer/LivDocUploadFile2`, formData);
  }
  getDocuments(livRequestId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/GetDocuments?livRequestId=${livRequestId}`);
  }
  
  
}
