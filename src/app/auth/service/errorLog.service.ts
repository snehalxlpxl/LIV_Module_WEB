import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {
    // http://localhost:5269/api/ErrorLog/LogError

  private apiUrl = `${environment.apiUrl}/ErrorLog/LogError`;

  constructor(private http: HttpClient) { }

}
