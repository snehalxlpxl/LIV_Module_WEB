import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  /**
   * Get all users
   */
  // getAll() {
  //   return this._http.get<User[]>(`${environment.apiUrl}/users`);
  // }

  /**
   * Get user by id
   */
  // getById(id: number) {
  //   return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
  // }

  getAllUsers(): Observable<any[]> {
    return this._http.get<any[]>(`${environment.apiUrl}/User/AllUsers`);
  }
}
