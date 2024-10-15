import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddContactDetailService {
  private contactList = new BehaviorSubject<any[]>([]);
  CurrentcontactList = this.contactList.asObservable();

  constructor(public http:HttpClient) { }

  addContactDetails(contactDetails: any) {
    const currentList = this.contactList.value;
    currentList.push(contactDetails);
    this.contactList.next(currentList);
  }

  getContactDetailsList() {
    return this.contactList.value;
  }

  getGstContactType(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/Customer/GetGstContactType`);
  }

  updateCustContact(id: number, data: any): Observable<string> {
    return this.http.put<string>(
      `${environment.apiUrl}/Customer/update/contact/${id}`,
      data,
      { responseType: "text" as "json" }
    );
  }
  insertAddress(gstdata: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };  
    const body = JSON.stringify(gstdata);
    return this.http.post<any>(`${environment.apiUrl}/Customer/insert/Address`, body, { headers });
  }
}
