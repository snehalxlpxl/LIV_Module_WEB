import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryAddressModalService {
  private EnquiryaddressList = new BehaviorSubject<any[]>([]);
  CurrentEnquiryAddressList = this.EnquiryaddressList.asObservable();

  constructor(private http:HttpClient) { }

  addEnquiryAddressDetails(addrDetails: any) {
    const currentList = this.EnquiryaddressList.value;
    currentList.push(addrDetails);
    this.EnquiryaddressList.next(currentList);
  }
  updateEnquiryAddress(id: number, data: any): Observable<string> {
    return this.http.put<string>(
      `${environment.apiUrl}/Enquiries/update/enquiryAdrress/${id}`,
      data,
      { responseType: "text" as "json" }
    );
  }
  getEnquiryAddDetailsList() {
    return this.EnquiryaddressList.value;
  }
}
