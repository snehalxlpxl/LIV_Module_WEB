import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LeadPreviewService {

  private componentSubject = new BehaviorSubject<string>('overview');
  component$ = this.componentSubject.asObservable();


  apiData: any;
  onleadPreviewChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onleadPreviewChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let currentId = Number(route.paramMap.get('id'));
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData(currentId)]).then(() => {
        resolve();
      }, reject);
    });
  }
  setComponent(component: string) {
    this.componentSubject.next(component);
  }
  /**
   * Get API Data
   */
  getApiData(id: number): Promise<any[]> {
    const url = `api/invoice-data/${id}`;

    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.apiData = response;
        this.onleadPreviewChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}
