import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDetail } from './TaskDetail';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailService {
  private apiUrl = `${environment.apiUrl}/TaskDetails`;

  constructor(private http: HttpClient) { }

  addTaskDetail(taskDetail: TaskDetail): Observable<TaskDetail> {
    return this.http.post<TaskDetail>(this.apiUrl, taskDetail);
  }

  editTaskDetail(taskId: number, taskDetail: TaskDetail): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${taskId}`, taskDetail);
  }

  // Additional methods for getting task details...
}
