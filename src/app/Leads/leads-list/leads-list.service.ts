import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lead } from './lead';
import { environment } from 'environments/environment';

@Injectable()
export class LeadsListService implements Resolve<any> {
  rows: Lead[];
  onLeadsListChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onLeadsListChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<Lead[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/Leads/VwLead`).subscribe((response: any) => {
        this.rows = response;
        // this.onLeadsListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  deleteLead(leadId: any): Observable<any> {
    // http://localhost:5269/api/Leads/143039 

    return this._httpClient.delete<any>(`${environment.apiUrl}/Leads/${leadId}`);
}
getUserData(): { userName: string; userId: string } | null {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}
}
