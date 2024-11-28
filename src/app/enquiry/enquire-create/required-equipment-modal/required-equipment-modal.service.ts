import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequiredEquipmentModalService {

  private equipmentList = new BehaviorSubject<any[]>([]);
  CurrentEquipmentList = this.equipmentList.asObservable();

  constructor(private http:HttpClient) { }

  addEquipment(equipmenttDetails: any) {
    const currentList = this.equipmentList.value;
    currentList.push(equipmenttDetails);
    this.equipmentList.next(currentList);
  }
  updateContainer(id: number, data: any): Observable<string> {
    return this.http.put<string>(
      `${environment.apiUrl}/Enquiries/update/enquiryContainer/${id}`,
      data,
      { responseType: "text" as "json" }
    );
  }
  insertEnqContainer(data: any): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/Enquiries/insert/EnquiryContainer`,
      data,
      { responseType: "text" as "json" }
    );
  }
  getEquipementList() {
    return this.equipmentList.value;
  }
}
