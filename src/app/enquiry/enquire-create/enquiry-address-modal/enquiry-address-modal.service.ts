import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryAddressModalService {
  private EnquiryaddressList = new BehaviorSubject<any[]>([]);
  CurrentEnquiryAddressList = this.EnquiryaddressList.asObservable();

  constructor() { }

  addEnquiryAddressDetails(addrDetails: any) {
    const currentList = this.EnquiryaddressList.value;
    currentList.push(addrDetails);
    this.EnquiryaddressList.next(currentList);
  }
  getEnquiryAddDetailsList() {
    return this.EnquiryaddressList.value;
  }
}
