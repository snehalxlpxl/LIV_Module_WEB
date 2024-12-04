import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PakageDetailModalService {
  private pakagesList = new BehaviorSubject<any[]>([]);
  CurrentPakagesList = this.pakagesList.asObservable();

  constructor(private http:HttpClient) { }

  addPakages(pakageDetails: any) {
    const currentList = this.pakagesList.value;
    currentList.push(pakageDetails);
    this.pakagesList.next(currentList);
  }
  updatePakages(id: number, data: any): Observable<string> {
    return this.http.put<string>(
      `${environment.apiUrl}/Enquiries/update/enquiryPakages/${id}`,
      data,
      { responseType: "text" as "json" }
    );
  }
  insertEnqPakage(data: any): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/Enquiries/insert/EnquiryPakages`,
      data,
      { responseType: "text" as "json" }
    );
  }
  getPakagesList() {
    return this.pakagesList.value;
  }
  resetPakagesList() {
    this.pakagesList.next([]); // Clear the equipment list
  }
}
